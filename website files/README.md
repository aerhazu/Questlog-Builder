# Questlog mod ID pack loader

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
   { "src": "mod-id-packs/my_mod.js", "version": "1" }
   ```

3. If the file defines a new mod, make sure it calls `window.MOD_ID_PACKS.register(...)` with its metadata and data; otherwise, it needs an appropriate metadata registration in your root registry.
4. Upload the updated manifest and data file. You no longer need to edit `index.html` or `app.js` for each new mod.

**Static hosting limitation:** A web page cannot reliably discover all files in a server directory by itself. This implementation uses a centralized manifest rather than automatic folder scanning. If you want zero manual manifest edits, generate the manifest during your GitHub build/deployment or in your JAR converter.

## Loading behavior

- Reads the manifest, then loads the root registry, individual packs in their original order, texture indexes, and finally `app.js`.
- Optional mod pack JS files that fail to load are skipped with console warnings. Required files cause a visible error.
- The HTML version check runs after the app is loaded, avoiding a false warning during asynchronous loading.
- Existing cache-busting versions and script ordering are preserved in the manifest.

Use a web server (such as GitHub Pages) to preview. Loading JSON with `fetch()` often fails if `index.html` is opened directly via `file://`.
