# Website versions and release guide

The current website release is **4.5.0**. The authoritative value is
`websiteVersion` in `website files/mod-id-packs-manifest.json`. Release 4.3.1
normalized the previous `4.03-*` build labels. Website releases do not change
Minecraft or mod versions.

## This push: 4.5.0

This release combines the focused UI refinement with global GUI atlas importing
and original-atlas rendering. Imports live in Settings → Project, apply across
all quests and the quest list, and do not require a quest to be selected.
Preview/GUI Studio actions are available in the file header. Quest flags stay in
Display in one compact four-column options container. Icon/sound fields follow,
then description and preview. Centered tabs and aligned history controls share
the toolbar; chapters use the same general structure. Grids adapt to available
panel width. Small-screen Settings navigation remains visible.

This pending push remains 4.5.0, including the details-toggle JSON highlight
refresh fix and the final layout refinements; no additional version bump is
needed for these edits before the release is published.

No saved-data schema, Minecraft target, or resource-pack format bump is included.
Custom atlases are embedded in export metadata; full builder project ZIPs carry
them and resource-pack exports contain the proper QuestLog resource paths.
See [GUI-RENDERING.md](GUI-RENDERING.md), [UI-REFINEMENT.md](UI-REFINEMENT.md),
and [CHANGELOG.md](CHANGELOG.md) for details and compatibility limits.

## Previous release: 4.4.0

This is a feature release covering startup layout stability, JSON highlighting,
sidebar multi-selection/group movement, active rename/duplicate selection,
responsive Mod Support views, and source-confirmed QuestLog 3.5.4 features.
It also includes quest flag tooltips, project undo/redo shortcuts, theme-switch
color fixes, and the Mod Support view-selector overlap fix.

The compatibility target inspected is **QuestLog 3.5.4, Fabric, Minecraft 1.21.1**.
The Mod Support target remains independent, and existing Minecraft 1.20.1
suggestion packs remain available. Older Minecraft/QuestLog versions are not
guaranteed to understand newly added objective/reward types or quest flags.
See [CHANGELOG.md](CHANGELOG.md) for release notes and
[EDITOR-UPDATE-NOTES.md](EDITOR-UPDATE-NOTES.md) for source evidence, test results,
and known limits. No saved-data schema or resource-pack format bump is included.

## Normal update workflow

1. Edit the website, mod ID packs, or texture files.
2. For a published release, set `websiteVersion` in the manifest. Use
   `MAJOR.MINOR.PATCH`: `4.5.1` for fixes, `4.6.0` for features, `5.0.0` for
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
| `websiteVersion`, manifest | `4.5.0` | Publishing a website release | Supplies the app version, Settings version, export layout's app version, and current changelog selection. |
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

## Cloudflare Workers deployment

For Workers Builds connected to Git, use the repository root as the build root
(clear `website files` from that setting). Set the build command to
`node tools/update-website-assets.cjs` and the deploy command to
`npx wrangler deploy`. The existing `wrangler.jsonc` selects `website files` as
the published assets directory. Push the source, tools, and new assets together;
Cloudflare generates cache revisions before deployment. Its generated files are
not committed back to Git. Run the same update command locally before previews.

The build root and assets directory serve different purposes: running from
`website files` makes Node search for the nonexistent `website files/tools/`.

## Mod pack maintenance

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
