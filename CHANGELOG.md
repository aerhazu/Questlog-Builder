# Changelog

## v4.4.0 — Editor improvements and QuestLog 3.5.4 support

### Added

- JSON live preview syntax highlighting with theme-aware colors, unchanged copy/export output, and a plain-text fallback during direct editing or for large documents.
- Sidebar multi-selection with Shift ranges, Ctrl/Cmd toggles, keyboard selection, and group quest/chapter movement with updated ordering.
- Compact, card, and dense Mod Support views with saved view preferences, categories, and Minecraft versions.
- Source-confirmed QuestLog 3.5.4 support for AND and Origins objectives, choice/random reward containers, and repeatable/global quest flags.
- Hover tips for repeatable/global flags and project undo/redo keyboard shortcuts outside text fields, preserving existing Canvas and GUI Studio handling.
- Editor integration checks and regression tests; source evidence and limitations in `EDITOR-UPDATE-NOTES.md`.

### Fixed

- Prevented the legacy static layout from flashing before the saved layout initializes.
- Renaming activates the selected file and retains inline input focus; duplication activates the new copy.
- Modifier selection and inline rename keep the sidebar available on narrow screens.
- Corrected experience rewards to export `levels`, while accepting legacy `level` data.
- Preserved additional same-type objective fields when synchronizing form edits.
- Fixed stale/inverted JSON highlight colors after light/dark switching and removed staggered color transitions during theme changes.
- Moved the Mod Support view selector into its toolbar to prevent overlap with the scrolling list.

### Compatibility and verification

- Inspected the supplied Fabric 1.21.1 QuestLog 3.5.4 source JAR; in-game behavior has not been runtime-tested.
- Nested choice/random rewards use JSON array editors. Structured matcher editing still requires raw JSON.
- Ten Node regression tests pass. Browser integration, autocomplete, and vanilla-preview checks passed; the final theme-transition and toolbar-overlap follow-ups still need visual browser verification.
- Existing fonts, assets, sounds, deployment structure, and historical release labels are retained.

## v4.3.1

- Centralized the website release in the manifest's `websiteVersion` field.
- Replaced manual script/style cache labels with generated content hashes.
- Added mod texture folder revisions and a check command for stale markers.
- Fixed cold-load mod icon placeholders for item names containing entity words.
- Added the version inventory and release workflow in `VERSIONS.md`.

## v2.8

- Cleaned up the Advanced editor into clearer texture, overlay, panel, label, color, and badge groups.
- Added drag-and-drop import for `.json` and `.zip` files using the same safe import path as the Import/export menu.
- Polished templates with custom-template counts, custom highlighting, clearer Use template actions, and source-file metadata for templates made from quests.
- Upgraded Export ZIP into a clearer export readiness screen with ready/review/not-ready status, upload path reminders, clickable warning rows, and missing-chapter export blockers.
- Optional UI sounds now load replaceable `.wav` files from `website files/ui-sounds/`, with typing sounds, a top-right mute button, Settings toggles, and volume up to 200%.
- Added Website personalization for premade light/dark themes, selected theme pairing, curated fonts, editor toggles, and sound feel settings.
- Refreshed vanilla Minecraft Java 1.21.1 sound, item, block, and biome suggestions.
- Added verified mod ID suggestion packs generated from selected mod jars, while keeping internal counts and source notes out of the UI.
- Simplified the mod support selector so each row shows the mod name, mod ID, and a short creator-friendly description.

## v3.0

Questlog Builder v3.0 is the big GUI editor and release-workflow update. The editor is still a static website, but it now covers much more of the real Questlog creation workflow: quest/chapter JSON, previews, GUI texture editing, resource-pack export, layout presets, themes, sounds, and modded ID suggestions.

### Added

- Added GUI Studio for QuestDetails and the global QuestList, with Create, Layout & Position, and Final screens based on real Questlog texture pieces.
- Added per-quest QuestDetails GUI drafts and global QuestList GUI drafts, matching how Questlog actually handles those screens.
- Added project ZIP export with quest/chapter JSON, Builder manifest data, generated resource-pack textures, per-quest QuestDetails assets, global QuestList atlas output, and QuestList client config files.
- Added Workbench and Canvas layouts with movable panels, Questlog previews, GUI Editor launch buttons, resources, drawing/hand tools, and recoverable saved panel layouts.
- Added source-verified Mod Support autocomplete packs with Minecraft 1.21.1/1.20.1 availability checks and verified ID counts.
- Added bundled Minecraft texture previews for items, blocks, quest/chapter badges, objective/reward rows, and supported entity face previews.
- Added Minecraft-inspired and regular website themes, font choices, grouped UI sound controls, surface gradient, motion effects, and the hidden Press It preference.
- Added practical quest templates for gates, landmarks, station unlocks, boss trophy turn-ins, and delivery hand-ins.
- Added an updated guided tutorial covering the current chapter, quest, preview, GUI editor, Mod Support, settings, resources, and export workflow.

### Reworked

- Rebuilt QuestDetails and QuestList previews around verified Questlog source boundaries so export claims stay honest.
- Reworked Export preview with left-side metadata, readiness checks, ZIP actions, a fixed-height scrollable project tree, themed surfaces, and clearer blocked/ready states.
- Reworked Settings into Preferences, Project, Help & Support, Mod Support, and Danger Zone.
- Reworked Settings so preference changes autosave without a bottom Apply/Cancel bar.
- Reworked Advanced Layout into Textures & Overlay, while moving visual panel placement into GUI Studio.
- Reworked Progress editing with clearer section cards, live add/remove counts, boxed File/Notify toggles, and lucide-style section icons.
- Improved Minecraft ID entry with live space-to-underscore cleanup, recent per-field suggestions, and existing quest-ID suggestions for reference fields.

### Polished

- Replaced old glyph/letter controls with Lucide SVG icons across app chrome, Settings, Focused/Workbench/Canvas controls, context menus, Export readiness, side-panel tabs, Progress actions, and GUI Studio.
- Added subtle motion effects, theme/sound button animations, modal entry effects, and reactive ambient lighting without affecting Canvas or Workbench backgrounds.
- Kept Canvas and Workbench toolbars visually stable and excluded from ambient/gradient lighting.
- Improved QuestList Layout and Final previews with real search tab, chapter tab, scrollbar, row divider, hover, and progress-color behavior.
- Cleaned up the global QuestList Apply action into one compact path, with export access kept separate.
- Cleaned up Mod Support search and compact sort/select/clear actions.
- Improved GUI Studio and export preview responsiveness with coalesced refreshes, targeted preview-cache warming, and closed-preview rerender culling.
- Tightened Export preview download controls, title icon spacing, project tree scrolling, and ZIP readiness messaging for dense projects.
- Updated GUI Studio scene dropdowns to match the current screenshot files.

### Fixed

- Fixed non-editor QuestDetails previews showing a Back button where Questlog should not show one.
- Fixed Progress add/remove counts staying stale after deleting requirements, objectives, failures, or rewards.
- Fixed Canvas panel zoom/pan behavior forcing panels back into frame or stacking them together.
- Fixed Workbench/Canvas preview panels becoming clipped, too small, or unrecoverable after aggressive resizing and dragging.
- Fixed QuestList chapter connector lines, minimized-search placement, row text sizing, icon spacing, and duplicate Final apply paths.
- Fixed GUI Studio texture zones so edit bounds stay locked to real texture dimensions while Questlog child layers remain fixed.
- Fixed Export preview stretching vertically when many files were listed by making the project ZIP tree scroll internally.
- Fixed Mod Support data/status issues including Macaw's Paintings handling and the Alex's Mobs 1.21.1 CurseForge port availability.
- Fixed multiple old fallback icons across Progress, file badges, Settings preview, GUI Studio thumbnails, and toolbars.

## v2.5

- Added an export preview flow focused on warning counts, missing data, and the Questlog install folders.
- Added a sample project ZIP fixture for import/export regression checks.
- Added right-click Make template for saving selected quests as custom reusable templates.
- Added custom-template filtering and per-template deletion.
- Added a left-sidebar Bulk delete flow with an in-app confirmation modal.
- Replaced browser delete popups with in-app delete confirmations.
- Added compact project status in Settings.
- Added a right-panel Save now button when autosave is turned off.
- Removed confusing Activity and Project tools panels from the visible UI.
- Cleaned the Settings support/status area.

## v2.3

- Added a changelog window with version selection.
- Improved the left quest/chapter sidebar and made it resizable.
- Added quest/chapter search and list sorting.
- Added validation navigation that jumps to likely problem fields.
- Added a guided first-visit tutorial.
- Improved tooltips and release checklist coverage.
- Fixed project ZIP exports to use the Questlog folder layout.

## v2.2

- Added safer browser autosave and recovery behavior.
- Added undo/redo history that survives reloads.
- Improved rename behavior and empty-name warnings.
- Reworked Add and Import/export menus.
- Added Settings controls for namespace, autosave, raw JSON, minified export, validation, reset, and tooltips.
- Added cache-busting and mixed-version warnings for safer Neocities updates.
- Fixed `questlog:quest_complete` so it does not export `required_amount`.

## v2.0

- Added the main static website version.
- Added quest templates.
- Added browser local-storage autosave and reset.
- Added missing/error detection.
- Added project ZIP import.
- Added Minecraft ID and sound suggestions.
- Improved quest-to-chapter linking.
