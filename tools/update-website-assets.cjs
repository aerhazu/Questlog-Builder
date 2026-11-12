#!/usr/bin/env node
// No packages required. Run after editing website files and before deployment.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../website files');
const check = process.argv.includes('--check');
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 16);
const changed = [];
function localPath(src) {
  const result = path.resolve(root, src);
  if (!result.startsWith(root + path.sep)) throw new Error('Path must stay inside website files: ' + src);
  return result;
}
function write(file, content) {
  if (fs.readFileSync(file, 'utf8') === content) return;
  changed.push(path.relative(path.resolve(__dirname, '..'), file));
  if (!check) fs.writeFileSync(file, content);
}
function folderRevision(folder) {
  const base = localPath(folder);
  // Texture folders are optional: a deployment can add them later and rerun.
  if (!fs.existsSync(base)) return '';
  const files = fs.readdirSync(base, { recursive: true }).filter(name =>
    fs.statSync(path.join(base, name)).isFile()).sort();
  const hash = crypto.createHash('sha256');
  for (const file of files) {
    hash.update(file.replaceAll('\\', '/')).update('\0');
    hash.update(digest(fs.readFileSync(path.join(base, file)))).update('\0');
  }
  return hash.digest('hex').slice(0, 16);
}
const manifestFile = path.join(root, 'mod-id-packs-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
if (!/^\d+\.\d+\.\d+$/.test(manifest.websiteVersion || '')) {
  throw new Error('Set websiteVersion in mod-id-packs-manifest.json to MAJOR.MINOR.PATCH, e.g. 4.3.1');
}
for (const entry of [manifest.registry, ...manifest.packs, ...(manifest.afterPacks || []), manifest.app]) {
  entry.cacheRevision = digest(fs.readFileSync(localPath(entry.src)));
  delete entry.version; // Old cache labels were never mod compatibility versions.
  if (entry.textures) {
    const revision = folderRevision(entry.textures.folder || 'questlog-assets/' + entry.textures.namespace);
    if (revision) entry.textures.cacheRevision = revision;
    else delete entry.textures.cacheRevision;
  }
}
write(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
const htmlFile = path.join(root, 'index.html');
let html = fs.readFileSync(htmlFile, 'utf8');
// These are the bootstrap scripts and stylesheet already present in the HTML.
html = html.replace(/((?:src|href)=")([^"?#]+\.(?:js|css))(?:\?[^"#]*)?/g, (match, prefix, src) => {
  return prefix + src + '?v=' + digest(fs.readFileSync(localPath(src)));
});
html = html.replace(/window\.QUESTLOG_HTML_VERSION='[^']*'/,
  "window.QUESTLOG_HTML_VERSION='" + manifest.websiteVersion + "'");
write(htmlFile, html);
console.log((check ? 'Checked' : 'Updated') + ' website ' + manifest.websiteVersion + '.');
if (changed.length) console.log((check ? 'Out of date: ' : 'Changed: ') + changed.join(', '));
else console.log('All cache revisions are current.');
if (check && changed.length) process.exitCode = 1;
