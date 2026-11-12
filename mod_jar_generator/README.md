# Mod IDs and textures generator

Generate a Questlog autocomplete pack and optional item/block textures from a
Minecraft mod JAR. The tool reads ZIP assets and metadata; it never runs mod code
or starts Minecraft. Python **3.11 or newer** is required; no pip packages are needed.

## What is in this folder?

| File | Purpose |
| --- | --- |
| `mod_jar_generator.py` | Cross-platform command-line generator. |
| `Generate-Mod-Data.bat` | Windows drag-and-drop/command-line launcher. Finds a compatible Python interpreter and preserves the generator's exit code. |
| `README-Mod-JAR-Generator.txt` | Plain-text quick start for Windows users. |
| `tests/test_generator.py` | Tests using synthetic JARs; no actual mods or downloads required. |

## Quick start

Run these commands from the **repository root**. Replace the example JAR path
with your actual file. On macOS/Linux, replace `py -3` with `python3`.

Generate IDs beside the original JAR:

```powershell
py -3 mod_jar_generator/mod_jar_generator.py "C:\Mods\example.jar"
```

Generate IDs and textures into a separate review folder:

```powershell
py -3 mod_jar_generator/mod_jar_generator.py "C:\Mods\example.jar" --output-dir "generated-mod-data" --textures --minecraft-version 1.21.1
```

For a JAR whose primary namespace is `example`, this creates:

```text
generated-mod-data/
  example.js
  questlog-assets/
    example/
      textures/
        item/...
        block/...
```

**Existing generated JS and matching PNG files are replaced by default.** Use
`--no-overwrite` to fail when an output file already exists. For review or a
different mod release, a new output folder avoids mixing old and new assets.

## Install the reviewed output into the website

1. Review the candidate IDs and metadata in `example.js`. Check against a runtime
   registry dump or authoritative mod source before changing `verified: false`.
2. Copy `example.js` into `website files/mod-id-packs/`.
3. If textures were extracted, merge `questlog-assets/example/` into
   `website files/questlog-assets/example/`.
4. Find the existing pack entry in `website files/mod-id-packs-manifest.json`.
   Update it, or add an entry if the mod is new. Do not duplicate an existing pack:

   ```json
   {
     "src": "mod-id-packs/example.js",
     "textures": { "namespace": "example" }
   }
   ```

   Omit `textures` for an IDs-only pack. Preserve any existing texture `folder`
   and `overrides` configuration. If your existing pack filename differs from the
   namespace, retain its manifest path and copy the reviewed output to that name.
5. Run `node tools/update-website-assets.cjs` from the repository root. This
   generates cache revisions; the generator does not edit the website manifest.
6. Test through a local HTTP server, then commit/deploy the intended changes.
   Enable the mod in Settings to show its autocomplete suggestions. Texture
   previews work independently of that checkbox.

To write straight into the website after reviewing your inputs:

```powershell
py -3 mod_jar_generator/mod_jar_generator.py "C:\Mods\example.jar" --output-dir "website files/mod-id-packs" --assets-dir "website files/questlog-assets" --textures --minecraft-version 1.21.1
```

Both output options matter here: otherwise textures default to
`<output-dir>/questlog-assets/`, which would be inside `mod-id-packs/`.

See [the website version guide](../VERSIONS.md) for cache/deployment details.

## Options

| Option | Meaning |
| --- | --- |
| `jars` | One or more JAR paths, separated by spaces. Quote paths containing spaces. |
| `-o`, `--output-dir` | Destination for `<namespace>.js`. Default: each input JAR's own folder. Missing directories are created. |
| `-c`, `--category` | Editor category label. Default: `Other`. |
| `--textures` | Opt into extraction of primary-namespace item and block PNGs. Default: no texture extraction. |
| `--assets-dir` | Root containing namespace folders. Default: `<output-dir>/questlog-assets`. Requires `--textures`. |
| `--minecraft-version` | Exact, tested Minecraft target, for example `1.21.1`. Repeat the option for multiple tested targets. Overrides inferred `supportedVersions`; preserves the original metadata constraint in `minecraftVersion`. |
| `--no-overwrite` | Refuse to replace an existing generated JS or PNG file. |
| `-h`, `--help` | Print usage without processing JARs. |

For multiple JARs:

```powershell
py -3 mod_jar_generator/mod_jar_generator.py "C:\Mods\first.jar" "C:\Mods\second.jar" --output-dir "generated-mod-data" --textures --minecraft-version 1.21.1
```

All receive the supplied category/target options. Run separate commands if they
need different targets. Two JARs with the same namespace produce the same output
filename; use separate folders for different mod releases.

## Windows launcher

Dragging one or more JARs onto `Generate-Mod-Data.bat` generates **IDs only** beside
each JAR. To request textures, use the command line with `--textures`, as above,
or pass the same options to the batch file. The launcher tries `py -3`, then
`python`, and checks for Python 3.11+. It prints an installation hint if neither
works. To bypass interpreter discovery, run the Python script with your chosen
interpreter directly.

The batch file changes the working directory to its own folder. Relative input
or output paths passed to it are interpreted there; absolute paths avoid ambiguity.
It pauses so drag-and-drop users can read the results. For automation, set the
environment variable `QUESTLOG_NO_PAUSE=1` before calling it.

## How IDs and versions are determined

- Metadata: Fabric `fabric.mod.json`, NeoForge `META-INF/neoforge.mods.toml`, or
  Forge `META-INF/mods.toml`. Fabric takes precedence for multi-loader metadata.
  If metadata has no mod ID, a deterministic best-effort asset namespace is used.
- Translations: the primary namespace's `lang/en_us.json` or `lang/en-US.json`.
  Another bundled mod's language file is not substituted. Common `.desc`,
  `.description`, `.tooltip`, `.tip`, `.name`, and `.subtitle` helper segments are
  excluded; this is still a heuristic, so review the result.
- Blocks: matching block translations, falling back to `blockstates/*.json` if
  none exist. Block model surfaces/variants are not used as block IDs.
- Items: matching item translations, falling back to `models/item/*.json` if none
  exist. Model variants can still create extra candidates. Each category uses
  its fallback only when that category has no matching translations.
- Entities/biomes: matching translations. No guesses from entity model names.
- Sounds: primary-namespace `sounds.json`; translated subtitles provide labels.
- Exact Minecraft declarations can populate `supportedVersions`. Ranges such as
  `>=1.20.1 <1.22`, wildcards, and unknown declarations leave it empty and print a
  warning. Supply `--minecraft-version` only for a target you have checked. An
  empty list means the website cannot offer this pack for its target selection.
- `modVersion` comes from the JAR. It is independent of the website release and
  generated cache hashes. Unresolved build placeholders can remain in metadata;
  review these before installing the pack.

## Texture behavior and limitations

Only `assets/<primary-namespace>/textures/item/**/*.png` and `block/**/*.png` are
copied. Nested paths are preserved. Entity skins, bundled dependency namespaces,
models, sounds, and `.mcmeta` animation files are not extracted. Unsafe paths and
invalid PNG headers fail with a named error; header checks are not a full image
decoder. Each output file is written atomically to avoid truncated replacements.

The tool does not render Minecraft models, combine layers, or flatten animated
sprite sheets. Some blocks have only `_top`, `_side`, or other texture filenames
that do not match their registry ID. Configure a manifest override, for example:

```json
"textures": {
  "namespace": "example",
  "overrides": { "example:crate": "textures/block/crate_top.png" }
}
```

No existing assets are deleted. Removed/renamed textures from a newer JAR can
remain in an old output folder. Generate into a fresh review folder when updating.

## Errors and testing

Exit code `0` means all JARs completed; `1` means at least one JAR failed; `2`
means invalid command-line arguments. Failed JARs print their path and reason,
and the remaining JARs are still processed. A batch is **not transactional**:
completed files remain if a later file/JAR fails. Inspect output before deploying.
Malformed JSON/TOML is reported instead of silently creating an incomplete pack.

Run the regression suite from the repository root:

```powershell
py -3 -B -m unittest discover -s mod_jar_generator/tests -v
```

The tests create and clean temporary JARs. They cover metadata, target ranges,
helper filtering, extraction paths, PNG headers, overwrites, and batch failures.
When Node.js is available, they also load generated JS against a stub of the
editor's registration API. Tests do not overwrite actual website packs or assets.
