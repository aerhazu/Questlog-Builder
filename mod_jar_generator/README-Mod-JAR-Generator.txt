MOD JAR TO QUESTLOG GENERATOR - QUICK START
=========================================

Requires Python 3.11 or newer. No pip packages required.
Read README.md in this folder for the full option list and troubleshooting.

DRAG AND DROP (WINDOWS)
  Drag one or more JARs onto Generate-Mod-Data.bat.
  This generates IDs ONLY beside each JAR. The window pauses to show results.

COMMAND LINE
  From THIS generator folder:
    py -3 mod_jar_generator.py "C:\Mods\example.jar"
    py -3 mod_jar_generator.py "C:\Mods\example.jar" --textures --output-dir "C:\Generated" --minecraft-version 1.21.1

  On macOS/Linux use python3 instead of py -3.

OUTPUT
  <output-dir>/<namespace>.js
  <output-dir>/questlog-assets/<namespace>/textures/item/...
  <output-dir>/questlog-assets/<namespace>/textures/block/...

  The default output-dir is each original JAR's folder.
  --assets-dir changes the questlog-assets root and requires --textures.
  Existing matching JS and PNG files are overwritten by default.
  Add --no-overwrite to refuse replacements. Old unmatched files are not deleted.
  Prefer a fresh output folder when reviewing an updated mod version.

INSTALL INTO THE WEBSITE
  1. Review the generated IDs: these are asset-derived candidates, not a registry dump.
  2. Copy the JS file to website files/mod-id-packs/.
  3. Merge the namespace textures into website files/questlog-assets/.
  4. Update the existing manifest pack entry, or add it if this is a new mod:
       { "src": "mod-id-packs/example.js", "textures": { "namespace": "example" } }
     Omit textures for an IDs-only pack. Never duplicate a manifest entry.
  5. From the repository root, run: node tools/update-website-assets.cjs
  6. Test via HTTP, then commit/deploy the website changes.

IMPORTANT
  - --minecraft-version sets an exact target you have tested, such as 1.21.1.
    Ranges in JAR metadata no longer become guessed supported versions.
    Repeat the option for multiple tested targets. Unknown/range-only targets
    leave supportedVersions empty, so the editor cannot offer that pack yet.
  - The generator does not edit your website manifest or mark packs verified.
  - Only the primary mod namespace's item/block PNGs are copied.
  - No model rendering, layered sprite composition, or animation handling.
  - Nonmatching texture filenames need manifest overrides; see README.md.
  - Each file is written atomically, but a whole batch is not transactional.
    Earlier outputs remain if later processing fails.
  - Exit codes: 0 success, 1 processing failure, 2 invalid arguments.
    Set QUESTLOG_NO_PAUSE=1 to suppress the batch launcher's pause in automation.

TESTS (FROM REPOSITORY ROOT)
  py -3 -B -m unittest discover -s mod_jar_generator/tests -v
