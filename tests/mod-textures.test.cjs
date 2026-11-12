// Run with: node --test tests/mod-textures.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '../website files');

function setup(cacheRevision = '') {
  const images = [], events = [], timers = new Map();
  let timerId = 0;
  const window = {
    QUESTLOG_MOD_TEXTURE_CONFIG: [{ namespace: 'test', cacheRevision, overrides: {
      'test:custom': 'textures/block/custom_top.png', 'test:unsafe': '../outside.png'
    } }],
    dispatchEvent(event) { events.push(event); }
  };
  const context = vm.createContext({ window, URL, console,
    document: { currentScript: { src: 'http://localhost/website%20files/mod-textures.js?v=1' } },
    Image: class {
      constructor() { images.push(this); }
      removeAttribute() { this.src = ''; }
    },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    setTimeout(fn) { timers.set(++timerId, fn); return timerId; },
    clearTimeout(id) { timers.delete(id); }
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'mod-textures.js'), 'utf8'), context);
  return { api: window.QUESTLOG_MOD_TEXTURES, images, events, timers, context };
}

test('lazy loading, cache, encoded site root and successful event', () => {
  const { api, images, events, timers } = setup();
  assert.equal(api.get('other:fish'), '');
  assert.equal(images.length, 0);
  assert.equal(api.get('test:fish'), '');
  assert.equal(api.inspect('test:fish').status, 'loading');
  assert.equal(images.length, 1);
  assert.equal(images[0].src, 'http://localhost/website%20files/questlog-assets/test/textures/item/fish.png');
  images[0].onload();
  assert.equal(api.get('test:fish'), images[0].src);
  assert.equal(api.inspect('test:fish').status, 'found');
  assert.equal(events.length, 1);
  assert.equal(timers.size, 0);
});

test('generated mod texture revision applies to default and override PNG URLs', () => {
  const { api, images } = setup('abc123');
  api.get('test:fish');
  assert.equal(new URL(images[0].src).searchParams.get('v'), 'abc123');
  images[0].onerror();
  assert.equal(new URL(images[1].src).searchParams.get('v'), 'abc123');
  api.get('test:custom');
  assert.equal(new URL(images[2].src).searchParams.get('v'), 'abc123');
});

test('block fallback, missing textures, override and unsafe path diagnostics', () => {
  const { api, images } = setup();
  api.get('test:crate', 'block');
  images[0].onerror();
  assert.match(images[1].src, /textures\/block\/crate.png$/);
  images[1].onload();
  assert.equal(api.inspect('test:crate', 'block').failures.length, 1);
  api.get('test:missing');
  images[2].onerror(); images[3].onerror();
  assert.equal(api.inspect('test:missing').status, 'missing');
  assert.equal(api.inspect('test:missing').failures.length, 2);
  api.get('test:custom');
  assert.match(images[4].src, /textures\/block\/custom_top.png$/);
  assert.equal(api.inspect('test:unsafe').status, 'missing');
  assert.equal(api.inspect('test:unsafe').reason, 'No safe candidate paths');
});

test('timeout advances candidates; retry cancels obsolete requests and events', () => {
  const { api, images, timers, events } = setup();
  api.get('test:fish');
  const oldLoad = images[0].onload;
  api.retry('test:fish');
  oldLoad();
  assert.equal(events.length, 0);
  assert.equal(images[0].src, '');
  [...timers.values()][0]();
  assert.match(api.inspect('test:fish').failures[0].reason, /timed out/);
  images[2].onload();
  assert.equal(events.length, 1);
  assert.match(api.get('test:fish'), /textures\/block/);
});

test('configured mod item names bypass entity guesses; explicit entities and vanilla keep their behavior', () => {
  const { context } = setup();
  context.renderableLabel = v => typeof v === 'string' ? v : Object.values(v)[0];
  context.minecraftIconId = context.renderableLabel;
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  vm.runInContext(app.slice(app.indexOf('function previewIconKind('), app.indexOf('function hasPreviewIcon(')), context);
  assert.equal(context.previewIconKind({ item: 'test:zombie_fish' }), 'item');
  assert.equal(context.previewIconKind('test:pig_food'), 'item');
  assert.equal(context.previewIconKind({ block: 'test:crate' }), 'block');
  assert.equal(context.previewIconKind({ entity: 'test:zombie' }), 'entity');
  assert.equal(context.previewIconKind({ item: 'minecraft:stone' }), 'block');
  assert.equal(context.previewIconKind({ entity: 'minecraft:zombie' }), 'entity');
});
