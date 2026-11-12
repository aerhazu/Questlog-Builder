/* Optional local mod item/block textures, configured in mod-id-packs-manifest.json.
   No network requests are made for unconfigured namespaces. */
(function () {
  'use strict';
  const settings = Array.isArray(window.QUESTLOG_MOD_TEXTURE_CONFIG)
    ? window.QUESTLOG_MOD_TEXTURE_CONFIG : [];
  const namespaces = new Map();
  const idPattern = /^[a-z0-9_.-]+:[a-z0-9_./-]+$/;
  const namespacePattern = /^[a-z0-9_.-]+$/;
  const relativePathPattern = /^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[a-zA-Z0-9_./-]+$/;
  const cache = new Map();
  // Resolve all paths from the website root instead of the current page URL.
  const scriptNode = document.currentScript;
  const siteRoot = new URL('./', scriptNode?.src || document.baseURI);
  function assetUrl(path, revision) {
    const url = new URL(path, siteRoot);
    if (revision) url.searchParams.set('v', revision);
    return url.origin === siteRoot.origin && url.pathname.startsWith(siteRoot.pathname)
      ? url.href : '';
  }

  for (const entry of settings) {
    if (!entry || typeof entry !== 'object' || !namespacePattern.test(entry.namespace || '')) continue;
    const base = typeof entry.folder === 'string'
      ? entry.folder.replace(/\/$/, '')
      : 'questlog-assets/' + entry.namespace;
    if (!relativePathPattern.test(base)) {
      console.warn('[Questlog textures] Unsafe texture directory ignored:', base);
      continue;
    }
    namespaces.set(entry.namespace, { base, overrides: entry.overrides || {}, cacheRevision: entry.cacheRevision || '' });
  }

  function candidates(id, kind) {
    const colon = id.indexOf(':');
    const namespace = id.slice(0, colon);
    const value = id.slice(colon + 1);
    const config = namespaces.get(namespace);
    if (!config || !idPattern.test(id) || value.split('/').includes('..')) return [];
    const override = Object.prototype.hasOwnProperty.call(config.overrides, id)
      ? config.overrides[id] : null;
    // Override paths are relative to the mod namespace folder.
    if (typeof override === 'string') {
      return relativePathPattern.test(override) ? [config.base + '/' + override] : [];
    }
    // Inventory icons commonly live in textures/item/, even for placeable blocks.
    // Then fall back to textures/block/ for blocks with no item texture.
    const suffix = value.replace(/\.png$/i, '') + '.png';
    return [config.base + '/textures/item/' + suffix, config.base + '/textures/block/' + suffix];
  }

  // Retain the Image object while it is loading. Time out stalled requests so a
  // lookup cannot stay in "loading" forever (e.g. a local server stops replying).
  const IMAGE_TIMEOUT_MS = 10000;
  function probe(id, kind, urls, index, state) {
    if (index >= urls.length) {
      state.status = 'missing';
      state.url = '';
      state.image = null;
      state.reason = state.failedUrls.length ? 'All candidate images failed to load; see failures for each URL' : 'No safe candidate paths';
      return;
    }
    const image = new Image();
    const src = urls[index];
    state.image = image;
    state.currentUrl = src;
    let settled = false;
    let timeout;
    function settle(ok, reason) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      state.currentUrl = '';
      state.cancel = null;
      if (ok) {
        state.image = null;
        state.status = 'found';
        state.url = src;
        state.reason = '';
        window.dispatchEvent(new CustomEvent('questlog-mod-texture-loaded', {
          detail: { id, kind, url: state.url }
        }));
      } else {
        state.failedUrls.push(src);
        state.failures.push({ url: src, reason });
        state.reason = reason;
        state.image = null;
        probe(id, kind, urls, index + 1, state);
      }
    }
    image.onload = function () { settle(true, ''); };
    image.onerror = function () { settle(false, 'Image load failed (check Network for 404, 403 or invalid PNG)'); };
    timeout = setTimeout(function () { settle(false, 'Image request timed out after 10 seconds'); }, IMAGE_TIMEOUT_MS);
    state.cancel = function () {
      settled = true;
      clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      image.removeAttribute('src');
      state.image = null;
    };
    image.src = src;
  }

  window.QUESTLOG_MOD_TEXTURES = {
    supports(id) {
      return typeof id === 'string' && idPattern.test(id) &&
        namespaces.has(id.split(':')[0]);
    },
    get(id, kind) {
      if (!this.supports(id)) return '';
      const cacheKey = id + '|' + (kind === 'block' ? 'block' : 'item');
      let state = cache.get(cacheKey);
      if (!state) {
        const revision = namespaces.get(id.split(':')[0]).cacheRevision;
        const urls = candidates(id, kind).map(path => assetUrl(path, revision)).filter(Boolean);
        state = { status: 'loading', url: '', candidates: urls, failedUrls: [], failures: [], currentUrl: '', image: null, reason: '' };
        cache.set(cacheKey, state);
        if (urls.length) probe(id, kind, urls, 0, state);
        else { state.status = 'missing'; state.reason = 'No safe candidate paths'; }
      }
      return state.status === 'found' ? state.url : '';
    },
    // Console diagnostic: inspect('tide:alpha_fish') shows loading/found/missing
    // and the exact URLs requested. Call it again after a moment for final status.
    inspect(id, kind) {
      if (!this.supports(id)) return { id, status: 'unconfigured', candidates: [] };
      const normalizedKind = kind === 'block' ? 'block' : 'item';
      this.get(id, normalizedKind);
      const state = cache.get(id + '|' + normalizedKind);
      return { id, kind: normalizedKind, status: state.status, url: state.url,
        candidates: [...state.candidates], failedUrls: [...state.failedUrls],
        failures: state.failures.map(failure => ({ ...failure })), currentUrl: state.currentUrl, reason: state.reason };
    },
    retry(id, kind) {
      if (!this.supports(id)) return '';
      const normalizedKind = kind === 'block' ? 'block' : 'item';
      cache.get(id + '|' + normalizedKind)?.cancel?.();
      cache.delete(id + '|' + normalizedKind);
      return this.get(id, normalizedKind);
    }
  };
}());
