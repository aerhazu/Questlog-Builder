# Questlog GUI Reference Assets

These GUI texture files are copied from the official Infernal Studios Questlog `1.21.1` branch for the v3.0 preview prototype.

Source: https://github.com/infernalstudios/Questlog/tree/1.21.1

The live preview reads the original PNGs in `gui/`. `gui-atlas.js` derives
QuestlogGuiSet regions in memory and uses nine-slice resizing for panels.
The old `gui/generated/` crops are no longer required. Keep the original atlases.

Import global replacements in **Settings → Project → Global GUI textures**.
Imports are stored with project metadata; they never overwrite these bundled
files. See [GUI-RENDERING.md](../../GUI-RENDERING.md) for dimensions and limitations.

Questlog is licensed under Apache License 2.0. Keep this folder as a reference-asset folder for the static preview and future resource-pack preview/export work.
