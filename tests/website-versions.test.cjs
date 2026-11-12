const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');

test('update command detects edits, is repeatable, and handles optional texture folders', t => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'questlog-versions-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const site = path.join(base, 'website files');
  fs.mkdirSync(site);
  fs.mkdirSync(path.join(base, 'tools'));
  const script = path.join(base, 'tools/update-website-assets.cjs');
  fs.copyFileSync(path.join(__dirname, '../tools/update-website-assets.cjs'), script);
  for (const name of ['registry.js', 'mod.js', 'app.js', 'loader.js', 'style.css']) {
    fs.writeFileSync(path.join(site, name), '/* original */');
  }
  fs.writeFileSync(path.join(site, 'index.html'), '<link href="style.css?v=old"><script src="loader.js?v=old"></script><script>window.QUESTLOG_HTML_VERSION=\'old\';</script>');
  fs.writeFileSync(path.join(site, 'mod-id-packs-manifest.json'), JSON.stringify({
    schema: 1, websiteVersion: '4.3.1', registry: { src: 'registry.js', version: 'old' },
    packs: [{ src: 'mod.js', textures: { namespace: 'test' } }], app: { src: 'app.js' }
  }));
  const run = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  const read = () => JSON.parse(fs.readFileSync(path.join(site, 'mod-id-packs-manifest.json')));
  assert.equal(run('--check').status, 1);
  assert.equal(run().status, 0);
  assert.equal(run('--check').status, 0);
  assert.equal(read().registry.version, undefined);
  assert.match(read().app.cacheRevision, /^[a-f0-9]{16}$/);
  const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
  assert.match(html, /style.css\?v=[a-f0-9]{16}">/);
  assert.match(html, /loader.js\?v=[a-f0-9]{16}"><\/script>/);
  assert.match(html, /QUESTLOG_HTML_VERSION='4.3.1'/);
  const previous = read().app.cacheRevision;
  fs.writeFileSync(path.join(site, 'app.js'), '/* edited */');
  assert.equal(run('--check').status, 1);
  assert.equal(run().status, 0);
  assert.notEqual(read().app.cacheRevision, previous);
  const textures = path.join(site, 'questlog-assets/test/textures/item');
  fs.mkdirSync(textures, { recursive: true });
  fs.writeFileSync(path.join(textures, 'fish.png'), 'test texture bytes');
  assert.equal(run().status, 0);
  const first = read().packs[0].textures.cacheRevision;
  assert.match(first, /^[a-f0-9]{16}$/);
  fs.writeFileSync(path.join(textures, 'fish.png'), 'updated texture bytes');
  assert.equal(run('--check').status, 1);
  assert.equal(run().status, 0);
  assert.notEqual(read().packs[0].textures.cacheRevision, first);
  assert.equal(run('--check').status, 0);
});

test('loader keeps ordering and supports both generated and legacy cache markers', async () => {
  const loaded = [];
  const window = { dispatchEvent() {} };
  const manifest = { schema: 1, websiteVersion: '4.3.1',
    registry: { src: 'registry.js', cacheRevision: 'new' },
    packs: [{ src: 'mod.js', version: 'legacy', textures: { namespace: 'test', cacheRevision: 'png' } }],
    afterPacks: [{ src: 'textures.js', cacheRevision: 'index' }],
    app: { src: 'app.js', cacheRevision: 'app' }
  };
  const context = vm.createContext({ window, URL, console, Event: class {},
    fetch: async () => ({ ok: true, json: async () => manifest }),
    document: {
      currentScript: { src: 'http://localhost/website%20files/mod-id-packs-loader.js' },
      createElement: () => ({}),
      head: { appendChild(script) {
        loaded.push(script.src);
        if (loaded.length === 1) window.MOD_ID_PACKS = { register() {} };
        script.onload();
      } }
    }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../website files/mod-id-packs-loader.js'), 'utf8'), context);
  await window.QUESTLOG_ASSETS_READY;
  assert.deepEqual(loaded.map(src => new URL(src).search), ['?v=new', '?v=legacy', '?v=index', '?v=app']);
  assert.equal(window.QUESTLOG_WEBSITE_VERSION, '4.3.1');
  assert.equal(window.QUESTLOG_MOD_TEXTURE_CONFIG[0].cacheRevision, 'png');
  assert.equal(window.QUESTLOG_ASSETS_LOADED, true);
});
