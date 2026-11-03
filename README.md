> [!IMPORTANT]
> **AI Generated Content Disclosure**
>
> This project was developed predominantly, if not entirely, through the use of artificial intelligence, specifically Claude AI.

# Questlog Builder

https://questlog-builder.aerhazu.workers.dev

This is a fork of [ChristyTrusty's](https://github.com/christytrusty) [Questlog Builder](https://github.com/christytrusty/Questlog-Builder), a static browser editor for creating and exporting Minecraft Questlog quest/chapter JSON and the companion GUI resource-pack assets used by Questlog Builder v3.0.

## Status

v3.03-copy-paste-sync-1

## What It Does

- Create and edit Questlog quest and chapter JSON.
- Preview Questlog quest and quest-list screens in Classic, Focused Inspector, Workbench, and Canvas layouts.
- Edit QuestDetails and global QuestList GUI textures in the browser.
- Export selected quest/chapter JSON or a project ZIP with Questlog data and generated resource-pack assets.
- Validate common Questlog setup issues before export, with an override toggle for advanced users.
- Keep work in browser storage so local drafts survive reloads.

## Running Locally

This project has no npm install step and no build pipeline. The live app files are in `website files/`.

Use any static file server from the project root, for example:

```powershell
python -m http.server 8023
```

Then open:

```text
http://localhost:8023/website%20files/index.html
```

If you serve from inside `website files/`, open:

```text
http://localhost:8023/index.html
```

## Deploying

For GitHub Pages or Cloudflare Pages, deploy the static contents of `website files/`. No build command is required.

Recommended deployment settings:

- Build command: none
- Output directory: `website files`
- Entry file: `index.html`

## Project Layout

- `website files/index.html` - main app markup and live script/style keys.
- `website files/style.css` - main styling and embedded font data.
- `website files/app.js` - main editor behavior, storage, validation, previews, GUI Studio, and export logic.
- `website files/minecraft-ids.js` - Minecraft ID helper data.
- `website files/minecraft-sounds.js` - Minecraft sound helper data.
- `website files/mod-id-packs.js` and `website files/mod-id-packs/` - optional mod autocomplete data.
- `docs/` - current context, changelog, release notes, and implementation notes.

## Release Notes

The public changelog is in:

```text
CHANGELOG.md
```

## Development Notes

- Keep the app static unless a future phase explicitly adds a build step.
- Run this after JavaScript edits:

```powershell
node --check "website files/app.js"
```

- Make backups before meaningful edits because this folder may not be a git repo.
- Preserve browser-saved user data and valid Questlog output.
