# Website versions and release guide

The current website release is **4.3.1**. The authoritative value is
`websiteVersion` in `website files/mod-id-packs-manifest.json`. This normalizes
the previous `4.03-*` build labels; it does not change Minecraft or mod versions.

## Normal update workflow

1. Edit the website, mod ID packs, or texture files.
2. For a published release, set `websiteVersion` in the manifest. Use
   `MAJOR.MINOR.PATCH`: `4.3.2` for fixes, `4.4.0` for features, `5.0.0` for
   breaking website behavior. Local edits can keep the same release number.
3. Run from the repository root (Node.js required, no packages to install):

   ```powershell
   node tools/update-website-assets.cjs
   node tools/update-website-assets.cjs --check
   node --test tests/*.test.cjs
   ```

4. Upload/deploy the complete `website files/` folder, including the regenerated
   HTML and manifest and any added texture folders. Serve it over HTTP(S).

The update command computes cache revisions automatically. Do not type or
increment hashes yourself. `--check` does not write files; it exits with code 1
if generated markers are stale. Run the update command again after later edits.
Editing the release number alone does not refresh asset bytes: rerun the command.

## Which value controls what?

| Value / location | Current value or example | When to change it | Effect |
| --- | --- | --- | --- |
| `websiteVersion`, manifest | `4.3.1` | Publishing a website release | Supplies the app version, Settings version, export layout's app version, and current changelog selection. |
| `cacheRevision`, manifest script entries | Generated 16-character hash | Automatically, when that JS file changes | Adds `?v=<hash>` to that script URL so the browser requests changed content. |
| `?v=...`, bootstrap JS and CSS in `index.html` | Generated hash | Automatically, when those files change | Refreshes the stylesheet, loader, error guard, vanilla ID/sound scripts, and bundled JSZip independently. |
| `textures.cacheRevision`, enabled mod entries | Generated folder hash | Automatically, when files are added, changed, or removed in that configured mod folder | Adds `?v=<hash>` to mod PNG requests. Does not change filenames or IDs. |
| `QUESTLOG_HTML_VERSION`, HTML | Generated from `websiteVersion` | Automatically | Detects HTML/app release mismatches. Never edit separately. |
| `QUESTLOG_WEBSITE_VERSION` / `QUESTLOG_APP_VERSION` | Runtime values | Never manually | Loader and app expose the release for diagnostics. |
| Manifest `schema` | `1` | Only when changing manifest structure incompatibly and updating its loader | A format contract, not a release number. |
| Mod registry `schema` | `1` | Only when changing the registry format and readers | Independent of website release/cache. |
| Minecraft target in Settings / registry `defaultTarget` | `1.21.1`; alternative `1.20.1` | Choosing the Minecraft version for mod suggestions | Filters available autocomplete packs. Does not switch textures or export pack format. |
| Pack `supportedVersions` / `minecraftVersion` | Actual Minecraft versions | Importing or verifying data for another Minecraft version | Describes data compatibility. Do not replace with website versions. |
| Pack `modVersion`, `loader`, `source`, `generatedAt` | Tide: `2.1.1`, Fabric, JAR source and extraction date | Regenerating/importing verified mod data | Records where the IDs came from. Does not control browser caching. |
| `EXPORT_RESOURCE_PACK_FORMAT`, `app.js` | `34` | Deliberately changing export compatibility and validating output | Written as `pack_format` in resource packs. Minecraft target selection does not change it. |
| Export metadata `schema_version` | `1` | Changing the exported metadata format with reader support | Keeps exported project metadata interpretable. |
| Autosave payload `version` / autosave storage key | `2` / `ql.project.autosave.v2` | A saved-data format change requiring migration | Changing casually can hide saved work or break restore. Leave for normal releases. |
| GUI Studio canvas schema | `GUI_STUDIO_CANVAS_VERSION=2` | Changing canvas data structure with migration/restore support | Independent of release numbering. |
| GUI Studio history / draft-scope versions | `1` | Changing those stored structures and readers | Internal persistence contracts. |
| GUI Studio layout versions | QuestDetails `21`, QuestList `22`, other layout defaults `4` and `1` | Deliberate layout schema/default migration | Keep these distinct; they describe different layouts. |
| Storage key suffixes such as `.v1`, tutorial `.v23` | Existing keys in `app.js` | Deliberate storage migration or tutorial reset | Not browser asset cache markers; renaming can reset preferences. |
| Historical changelog entries | `3.01`, `3.0`, `2.8`, etc. | Correcting or adding release notes | Historical labels remain historical. Add notes for releases; don't renumber old entries. |
| `wrangler.jsonc` `compatibility_date` | `2026-05-18` | Deliberately updating hosting runtime behavior | A hosting compatibility date, not the website's release date. |

## Adding or updating a mod

Add its script under `packs` in the manifest using only its path:

```json
{ "src": "mod-id-packs/my_mod.js" }
```

To opt into textures:

```json
{
  "src": "mod-id-packs/my_mod.js",
  "textures": {
    "namespace": "my_mod"
  }
}
```

Then run the update command. It fills in `cacheRevision`. Existing `folder` and
`overrides` settings still work; PNGs stay under
`questlog-assets/<namespace>/textures/item/` or `textures/block/` by default.
Missing texture folders remain optional. Mods without `textures` make no texture
requests. The Settings checkbox controls autocomplete, not texture loading.

Legacy script-entry `version` is still accepted by the loader for compatibility,
but the update command replaces it with `cacheRevision`. That old field was a
cache marker, never the mod's actual version. Keep actual versions in mod metadata.

## Important limits and diagnostics

- This remains a static website. Node.js is only used by the maintenance command;
  visitors and the deployed host do not need Node.js or a build server.
- The command versions all currently loaded JS/CSS cache markers and configured
  mod texture folders. It does not rename or rewrite fonts, sounds, vanilla PNGs,
  the Python generator, saved data, or Minecraft compatibility metadata. Assets
  without a query marker still rely on normal hosting/browser cache policy.
- The manifest is fetched with `cache: 'no-cache'`. Deploy HTML and the manifest
  together; cached old HTML or a partially uploaded deployment can still cause a
  mismatch. Hard refresh after correcting a mixed deployment.
- Use `QUESTLOG_APP_VERSION` in the console to see the running release. Use
  `QUESTLOG_MOD_TEXTURES.inspect('tide:alpha_fish')` for exact requested texture
  URLs and failure reasons. Retry or reload after uploading previously missing
  assets; the texture resolver caches misses within the current page session.
- A release mismatch check is a useful guard, not an integrity guarantee. The
  content hashes select fresh URLs; they do not verify uploaded file bytes or
  prevent a server from serving incorrect content at a URL.
- When making a release, update its notes in `CHANGELOG.md` and the current
  changelog entry in `app.js`. This content is separate from the release number.
