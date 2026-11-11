> [!IMPORTANT]
> **AI Generated Content Disclosure**
>
> This project was developed predominantly, if not entirely, through the use of artificial intelligence, specifically Claude AI.

# Questlog Builder

**Build your Questlog quests in the browser. Import what you have, edit it, check it, export it.**

Live site: https://questlog-builder.aerhazu.workers.dev

Current build: `4.03-brand-import-1`

## Where this came from

This is a fork of [ChristyTrusty's Questlog Builder](https://github.com/christytrusty/Questlog-Builder). The editor, the GUI Studio, the live previews and the export pipeline all start from that project. Full credit to them for the foundation.

I forked it to build quests for my own modpack, Lavendre, and kept pushing it until it fit how I actually work. The big pieces are below.

It is made for the [Questlog mod](https://modrinth.com/mod/questlog). It is not affiliated with the mod or its author.

## What it does

- Edit Questlog quests and chapters with live JSON and a live in-game style preview.
- Import your own files. Single JSON files, a whole folder, a ZIP, or pasted JSON.
- Export in the shape you need: one file, quests and chapters only, or the full project ZIP with the resource pack.
- Run a checklist before you export, so broken chains and missing fields show up early.
- Design the QuestDetails and QuestList GUI textures in GUI Studio.
- Keep your drafts in browser storage. Reloading does not lose your work.

<details>
<summary>**What this fork changes**</summary>

**Importing**
- A real Import dialog, with its own button at the top of the chapter list.
- Choose files, choose a folder, drop a folder anywhere on the page, or paste JSON.
- Quests and chapters are told apart by folder name or by their contents.
- Pick what happens when a name already exists: keep both, replace, or skip.
- One undo step reverts a whole import.
- Quests that use `prerequisites` are kept under that key when exported. Nothing gets renamed behind your back.

**Exporting**
- Export quests and chapters only. You get a ZIP with `config/questlog/quests` and `config/questlog/chapters` and nothing else.
- The full project ZIP still shows its readiness checks first.

**Editing**
- Chapter ID is simply the file name. `main.json` is `main`. Older `namespace:name` references still match.
- Drag quests and chapters in the left panel to reorder them. Order values are written for you and start at 0.
- New quests, duplicates and templates get the next order value automatically.
- Copy and paste requirements, objectives, failures and rewards between quests.
- Sync requirements to objectives with one toggle.
- Support for `hide_when_completed`.

**Interface**
- A full redesign of the Classic layout, with a flat, calm look and the same biome themes.
- Three panes on desktop, a slide-in output drawer on tablets, and a bottom bar on phones.
- Focused, Workbench and Canvas layouts are still there and share the new components.

**Speed**
- Typing no longer rebuilds the whole sidebar or re-reads every entry on every keystroke.
- Editing an objective refreshes that card only.
- The pointer glow no longer forces a page-wide style recalculation.
- All CSS now lives in `style.css`. The 11,000 line inline block is gone from `index.html`.

</details>

## Run it locally

No install. No build step. The app is plain static files in `website files/`.

Serve the project root with anything:

```powershell
python -m http.server 8023
```
_or_
```powershell
py -m http.server 8023
```

Then open:

```text
http://localhost:8023/website%20files/index.html
```

Or serve from inside `website files/` and open `http://localhost:8023/index.html`.

You need a current Chrome, Edge, Firefox or Safari. The styles use CSS nesting, `:has()` and `color-mix()`.

## Deploy it

Any static host works, including GitHub Pages and Cloudflare Pages.

- Build command: none
- Output directory: `website files`
- Entry file: `index.html`

## Custom logo

Drop a square `logo.svg` or `logo.png` next to `index.html`. It shows at 40 by 40 in the top left. The site tries `logo.svg` first, then `logo.png`. If neither exists, it falls back to the original CSS mark.

## Release notes

The changelog is in [`CHANGELOG.md`](CHANGELOG.md).

## Working on it

- Keep it static. No build step unless a future phase really needs one.
- After editing JavaScript, run:

```powershell
node --check "website files/app.js"
```

- Every rule in the design layer at the end of `style.css` starts with `html:not(#ds)`. That is on purpose. It makes the layer beat the older rules without piling on more `!important`.
- Make a backup before big edits. This folder may not be a git repo.
- Do not break saved browser data or valid Questlog output.

## Credits

- [ChristyTrusty](https://github.com/christytrusty) for the original Questlog Builder.
- The [Questlog mod](https://modrinth.com/mod/questlog) this tool is built for.
- Claude AI, which wrote nearly all of the code in this fork.