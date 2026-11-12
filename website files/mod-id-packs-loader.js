/* Questlog mod ID pack manifest loader. Keep this file in the website root. */
(function () {
  'use strict';
  var loaderScript = document.currentScript;
  var root = new URL('./', loaderScript && loaderScript.src ? loaderScript.src : document.baseURI);

  function resolvedUrl(entry) {
    if (!entry || typeof entry.src !== 'string' || !entry.src) {
      throw new Error('Invalid asset entry in mod-id-packs-manifest.json');
    }
    // Disallow URLs that would load code from another host or climb out of the website root.
    var url = new URL(entry.src, root);
    if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) {
      throw new Error('Asset path must stay inside the website root: ' + entry.src);
    }
    // cacheRevision is generated from file contents; version is legacy support.
    var revision = entry.cacheRevision || entry.version;
    if (revision) url.searchParams.set('v', revision);
    return url.href;
  }

  function loadScript(entry) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = resolvedUrl(entry);
      script.async = false;
      script.onload = function () { resolve(); };
      script.onerror = function () { script.remove(); reject(new Error('Unable to load ' + entry.src)); };
      document.head.appendChild(script);
    });
  }

  function showError(error) {
    document.documentElement.classList.remove('questlog-booting');
    console.error('[Questlog loader]', error);
    var panel = document.createElement('div');
    panel.setAttribute('role', 'alert');
    panel.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:100000;padding:16px;background:#291b1b;color:#ffdfdf;border:1px solid #d87f7f;border-radius:8px;font:14px system-ui,sans-serif';
    panel.textContent = 'Questlog failed to start: ' + error.message + '. Check that the manifest and script files are uploaded correctly, then refresh.';
    document.body.appendChild(panel);
  }

  async function loadAll() {
    var manifestUrl = new URL('mod-id-packs-manifest.json', root);
    // Revalidate the manifest so changes are picked up without editing index.html.
    var response = await fetch(manifestUrl.href, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Unable to load mod-id-packs-manifest.json (HTTP ' + response.status + ')');
    var manifest = await response.json();
    if (!manifest || manifest.schema !== 1 || !Array.isArray(manifest.packs) || !manifest.registry || !manifest.app) {
      throw new Error('Invalid mod-id-packs-manifest.json schema');
    }
    window.QUESTLOG_WEBSITE_VERSION = manifest.websiteVersion || window.QUESTLOG_HTML_VERSION || 'development';
    await loadScript(manifest.registry);
    if (!window.MOD_ID_PACKS || typeof window.MOD_ID_PACKS.register !== 'function') {
      throw new Error('Root mod-id-packs.js registry did not initialize');
    }
    for (var i = 0; i < manifest.packs.length; i++) {
      try {
        await loadScript(manifest.packs[i]);
      } catch (error) {
        console.warn('[Questlog loader] Optional mod ID pack skipped:', error);
      }
    }
    // Texture folders are opt-in per pack; no file probing for packs without textures.
    window.QUESTLOG_MOD_TEXTURE_CONFIG = manifest.packs.filter(function (pack) {
      return pack && pack.textures;
    }).map(function (pack) {
      return pack.textures;
    });
    var after = Array.isArray(manifest.afterPacks) ? manifest.afterPacks : [];
    for (var j = 0; j < after.length; j++) await loadScript(after[j]);
    if(window.QUESTLOG_GUI_ATLAS_READY)await window.QUESTLOG_GUI_ATLAS_READY;
    await loadScript(manifest.app);
    document.documentElement.classList.remove('questlog-booting');
    window.QUESTLOG_ASSETS_LOADED = true;
    window.dispatchEvent(new Event('questlog-assets-loaded'));
  }

  window.QUESTLOG_ASSETS_READY = loadAll().catch(function (error) {
    showError(error);
    throw error;
  });
}());
