# Questlog mod ID pack loader

Website releases and cache revisions are managed centrally. See
[VERSIONS.md](../VERSIONS.md) for the version inventory and deployment steps.
After editing assets, run `node tools/update-website-assets.cjs` from the
repository root. Do not manually maintain per-script cache versions.

## Installation

Place these three files in the **website root**, beside `app.js` and `mod-id-packs.js`:

- `index.html` (replace your existing copy)
- `mod-id-packs-loader.js` (new)
- `mod-id-packs-manifest.json` (new)

**Do not move or overwrite `mod-id-packs.js`.** It remains in the root and is loaded before the individual packs.

Your existing `mod-id-packs/` folder and the other website scripts stay where they are. No changes to `app.js` or the mod registry are needed.

## Adding a mod ID data file

1. Put the new JavaScript data file in `mod-id-packs/`, for example `mod-id-packs/my_mod.js`.
2. Add an entry under `packs` in `mod-id-packs-manifest.json`:

   ```json
   { "src": "mod-id-packs/my_mod.js" }
   ```

3. If the file defines a new mod, make sure it calls `window.MOD_ID_PACKS.register(...)` with its metadata and data; otherwise, it needs an appropriate metadata registration in your root registry.
4. Run `node tools/update-website-assets.cjs`, then upload the updated website folder. You no longer need to manually edit `index.html` or `app.js` for each new mod.

**Static hosting limitation:** A web page cannot reliably discover all files in a server directory by itself. This implementation uses a centralized manifest rather than automatic folder scanning. If you want zero manual manifest edits, generate the manifest during your GitHub build/deployment or in your JAR converter.

## Loading behavior

- Reads the manifest, then loads the root registry, individual packs in their original order, texture indexes, and finally `app.js`.
- Optional mod pack JS files that fail to load are skipped with console warnings. Required files cause a visible error.
- The HTML version check runs after the app is loaded, avoiding a false warning during asynchronous loading.
- Script ordering is preserved. Content hashes replace old per-script cache version labels automatically.

Use a web server (such as GitHub Pages) to preview. Loading JSON with `fetch()` often fails if `index.html` is opened directly via `file://`.

---

# Optional mod textures for Questlog

This update builds on the **manifest-based mod ID pack loader**. It does not modify `mod-id-packs.js`, `style.css`, or your Python mod JAR extractor.

## Installation

Upload these files to the **website root** (beside your existing `mod-id-packs.js`):

- `index.html` (replace)
- `app.js` (replace; based on the provided `app(3).js`)
- `mod-id-packs-loader.js` (replace)
- `mod-id-packs-manifest.json` (replace, **merge** any mod entries you've added since the previous loader version)
- `mod-textures.js` (new)

Do **not** move `mod-id-packs.js`. Your existing `mod-id-packs/` folder stays as it is. Do not replace your newer `app.js` with this version if you have made subsequent changes; merge the focused functions instead.

## Enabling textures for a mod

This is **optional per mod**. In `mod-id-packs-manifest.json`, find that mod's existing entry under `packs` and add a `textures` property:

```json
{
  "src": "mod-id-packs/tide.js",
  "textures": { "namespace": "tide" }
}
```

The example is illustrative; **do not create a duplicate pack entry**. A namespace must match the prefix of your item IDs, such as `tide:some_fish`.

Place PNG textures under the matching folder:

```text
website-root/
  questlog-assets/
    minecraft/                       # existing vanilla assets, unchanged
    tide/
      textures/
        item/
          some_fish.png              # for tide:some_fish
        block/
          fishing_table.png          # for tide:fishing_table
```

For `tide:some_fish`, the editor checks `questlog-assets/tide/textures/item/some_fish.png` first, then `.../textures/block/some_fish.png`. This also works with IDs with nested paths. Images are loaded **only when the editor needs to display that icon**; the browser caches successful and unsuccessful checks during the session. If none exists, the current placeholder stays visible. Unconfigured mods make no texture requests. Texture probing does not change the actual Questlog JSON or resource pack exports.

### Nonstandard filenames or locations

If a texture filename differs from its ID, add an `overrides` entry:

```json
"textures": {
  "namespace": "tide",
  "overrides": {
    "tide:some_fish": "textures/item/special_fish.png",
    "tide:fishing_table": "textures/block/fishing_table_top.png"
  }
}
```

Or specify `"folder": "questlog-assets/custom_folder"` inside `textures` to use a different folder under your website root. Override paths are relative to that folder. Do not use absolute URLs, parent-directory traversal, or remote domains.

### Troubleshooting texture previews

`QUESTLOG_MOD_TEXTURES.get(id)` starts a lazy image request and returns an empty
string until it finishes. Namespace registration alone does not mean an image
has loaded. In the console, run
`QUESTLOG_MOD_TEXTURES.inspect('tide:alpha_fish')`, then inspect again after the
request completes. `currentUrl` identifies the active request; `failures` lists
each failed URL and its error or timeout reason. Missing textures retain the
placeholder. After uploading a missing file, use
`QUESTLOG_MOD_TEXTURES.retry('tide:alpha_fish')` (or pass `'block'` as the second
argument for an explicit block preview). Retry cancels any previous probe.

The retained-image and timeout patch displays `tide:alpha_fish` in browser
testing. A separate cold-load rendering bug affected mod item names containing
vanilla entity words (for example `tide:zombie_fish`): the name heuristic created
an entity placeholder without the marker needed for asynchronous replacement.
Configured mod item icons now bypass those guesses; explicit entity and block
values retain their type. Run the asset update command and deploy the generated
HTML and manifest with changed scripts so browsers request the updated code.

### Supported previews

- Supports PNG item and block textures in the **quest preview** and **icon form preview**. Other places that reuse `previewIconTile` (including quest lists and GUI Studio) also gain the icons.
- Does **not** render Minecraft item/block JSON models, 3D rotations, multi-layer textures, atlases, entity skins, or animated `mcmeta` textures. A PNG is shown as a flat icon.
- For item IDs where the actual icon is defined by a model or composed of multiple sprites, provide a pre-rendered inventory PNG or an override pointing to an appropriate PNG.
- Texture folder configuration is kept in the existing mod-pack manifest. There is no need to edit `index.html` or `app.js` when adding subsequent packs/textures.
- Upload texture files to your web host alongside the website. Local `file://` previews may not behave like a deployed web server.
- This release does **not** modify the Python extractor. Adding automated JAR extraction can be done later.
