#!/usr/bin/env python3
"""Generate reviewable Questlog mod ID candidates and optional item/block PNGs.

Uses Python 3.11+ and the standard library. Reads JAR assets without executing
mod code. Generated IDs are best-effort candidates, not runtime registrations.
"""
from __future__ import annotations
import argparse
import json
import os
import re
import sys
import tempfile
import zipfile
from collections import Counter
from pathlib import Path
from datetime import date

NAMESPACE_RE = re.compile(r'[a-z0-9_.-]+')
RESOURCE_PATH_RE = re.compile(r'[a-z0-9_./-]+')
TRANSLATION_HELPERS = {'desc', 'description', 'tooltip', 'tip', 'name', 'subtitle'}


def safe_namespace(value):
    if not isinstance(value, str) or not NAMESPACE_RE.fullmatch(value) or value in ('.', '..'):
        raise ValueError(f'Unsafe or invalid mod namespace: {value!r}')
    return value


def valid_resource_path(value):
    return isinstance(value, str) and bool(RESOURCE_PATH_RE.fullmatch(value)) and not any(
        part in ('', '.', '..') for part in value.split('/'))


def atomic_write(destination, content, overwrite=True):
    """Replace each complete file atomically; never leave a truncated output."""
    destination = Path(destination)
    if not overwrite and destination.exists():
        raise FileExistsError(f'Output already exists: {destination}')
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=destination.parent, delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(content)
        if overwrite:
            os.replace(temporary, destination)
        else:
            # Exclusive creation also protects against a file appearing after the check.
            os.link(temporary, destination)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def read_json(zf, name):
    try:
        result = json.loads(zf.read(name).decode('utf-8-sig'))
    except (UnicodeError, json.JSONDecodeError) as exc:
        raise ValueError(f'Invalid JSON in {name}: {exc}') from exc
    if not isinstance(result, dict):
        raise ValueError(f'Expected a JSON object in {name}')
    return result


def parse_toml(zf, name):
    try:
        import tomllib
        return tomllib.loads(zf.read(name).decode('utf-8'))
    except (UnicodeError, ValueError) as exc:
        raise ValueError(f'Invalid TOML in {name}: {exc}') from exc


def title_from_id(value):
    return ' '.join(part.capitalize() for part in value.replace('-', '_').split('_'))


def get_metadata(zf):
    """Read the primary mod; preserve Minecraft constraints without guessing releases."""
    names = set(zf.namelist())
    fabric = read_json(zf, 'fabric.mod.json') if 'fabric.mod.json' in names else {}
    neo = parse_toml(zf, 'META-INF/neoforge.mods.toml') if 'META-INF/neoforge.mods.toml' in names else {}
    forge = parse_toml(zf, 'META-INF/mods.toml') if 'META-INF/mods.toml' in names else {}
    toml = neo or forge
    mods = toml.get('mods', []) if isinstance(toml, dict) else []
    if not isinstance(mods, list):
        raise ValueError('Expected a list of [[mods]] entries in mod TOML metadata')
    tm = mods[0] if mods and isinstance(mods[0], dict) else {}
    mod_id = fabric.get('id') or tm.get('modId')
    if not mod_id:
        # Best-effort namespace detection from assets.
        candidates = Counter(n.split('/')[1] for n in names
                             if n.startswith('assets/') and n.count('/') >= 2
                             and n.split('/')[1] not in ('minecraft', 'forge', 'neoforge', 'fabric'))
        mod_id = sorted(candidates, key=lambda n: (-candidates[n], n))[0] if candidates else None
    if not mod_id:
        raise ValueError('Could not determine the mod ID. The JAR has no supported metadata.')
    safe_namespace(mod_id)
    name = fabric.get('name') or tm.get('displayName') or title_from_id(mod_id)
    version = str(fabric.get('version') or tm.get('version') or 'unknown')
    description = fabric.get('description') or tm.get('description') or ''
    # A JAR with fabric.mod.json is treated as Fabric even if it bundles compatibility metadata.
    loader = 'Fabric' if fabric else ('NeoForge' if neo else ('Forge' if forge else 'Unknown'))
    minecraft = 'unknown'
    deps = fabric.get('depends', {}) if fabric else {}
    if isinstance(deps, dict) and deps.get('minecraft'):
        minecraft = str(deps['minecraft'])
    if minecraft == 'unknown' and isinstance(toml, dict):
        dependencies = toml.get('dependencies', {})
        if not isinstance(dependencies, dict):
            raise ValueError('Expected dependency tables in mod TOML metadata')
        for section in dependencies.values():
            if isinstance(section, list):
                for dep in section:
                    if isinstance(dep, dict) and dep.get('modId') == 'minecraft':
                        minecraft = str(dep.get('versionRange') or 'unknown')
                        break
    # Range endpoints are not an exact list of supported releases. Preserve the
    # constraint and require an explicit tested target for non-exact declarations.
    exact = re.fullmatch(r'=?\s*(\d+\.\d+(?:\.\d+)?)', minecraft)
    supported = [exact.group(1)] if exact else []
    mc_primary = exact.group(1) if exact else minecraft
    return mod_id, name, version, description, loader, mc_primary, supported, bool(fabric)


def find_lang(zf, mod_id):
    names = zf.namelist()
    preferred = [f'assets/{mod_id}/lang/en_us.json', f'assets/{mod_id}/lang/en-US.json']
    for p in preferred:
        if p in names:
            return p, read_json(zf, p)
    # Another bundled namespace's language file is not evidence for this mod.
    return None, {}


def extract_rows(lang, mod_id, kind):
    """Collect valid translation candidates, excluding common description keys."""
    prefix = f'{kind}.{mod_id}.'
    rows = []
    for key, value in lang.items():
        if key.startswith(prefix) and isinstance(value, str):
            ident = key[len(prefix):]
            if valid_resource_path(ident) and not any(
                    part in TRANSLATION_HELPERS for part in re.split(r'[./]', ident)[1:]):
                rows.append([ident, value])
    return sorted(rows, key=lambda x: x[0].casefold())


def model_ids(zf, mod_id, kind):
    # Used only when no matching language entries exist. Block models can be
    # surfaces/variants; blockstates are better candidates for block IDs.
    prefix = (f'assets/{mod_id}/blockstates/' if kind == 'block'
              else f'assets/{mod_id}/models/{kind}/')
    ids = []
    for name in zf.namelist():
        if name.startswith(prefix) and name.endswith('.json'):
            ident = name[len(prefix):-5]
            if valid_resource_path(ident):
                ids.append(ident)
    return [[ident, title_from_id(ident.split('/')[-1])] for ident in sorted(set(ids))]


def extract_sounds(zf, mod_id, lang):
    path = f'assets/{mod_id}/sounds.json'
    if path not in zf.namelist():
        return []
    sounds = read_json(zf, path)
    result = []
    for ident, data in sounds.items():
        subtitle = data.get('subtitle', '') if isinstance(data, dict) else ''
        # Prefer subtitle translation, otherwise make a readable name from the sound ID.
        label = lang.get(subtitle, title_from_id(ident)) if isinstance(subtitle, str) and subtitle else title_from_id(ident)
        if valid_resource_path(ident):
            result.append([ident, label if isinstance(label, str) else title_from_id(ident)])
    return sorted(result, key=lambda x: x[0].casefold())


def js_string(value):
    return json.dumps(value, ensure_ascii=False)


def js_rows(rows, indent='            '):
    if not rows:
        return '[]'
    lines = ['[']
    for ident, label in rows:
        lines.append(f'{indent}[{js_string(ident)}, {js_string(label)}],')
    lines.append('        ]')
    return '\n'.join(lines)


def generate(jar_path: Path, output: Path, category: str, minecraft_versions=None, overwrite=True):
    with zipfile.ZipFile(jar_path) as zf:
        mod_id, name, version, description, loader, mc, supported, is_fabric = get_metadata(zf)
        if minecraft_versions:
            supported = list(dict.fromkeys(minecraft_versions))
        lang_path, lang = find_lang(zf, mod_id)
        blocks = extract_rows(lang, mod_id, 'block') or model_ids(zf, mod_id, 'block')
        items = extract_rows(lang, mod_id, 'item') or model_ids(zf, mod_id, 'item')
        entities = extract_rows(lang, mod_id, 'entity')
        biomes = extract_rows(lang, mod_id, 'biome')
        sounds = extract_sounds(zf, mod_id, lang)
        # Some mods expose biome/entity models without translation keys; do not guess registrations.
        metadata_files = [x for x in ('fabric.mod.json', 'META-INF/neoforge.mods.toml', 'META-INF/mods.toml') if x in zf.namelist()]
        source_parts = metadata_files[:]
        if lang_path:
            source_parts.append(lang_path)
        for folder in ('models/item/', 'blockstates/'):
            prefix = f'assets/{mod_id}/{folder}'
            if any(path.startswith(prefix) for path in zf.namelist()):
                source_parts.append(prefix)
        if f'assets/{mod_id}/sounds.json' in zf.namelist():
            source_parts.append(f'assets/{mod_id}/sounds.json')
        source = f'Generated from {jar_path.name}: ' + ', '.join(source_parts)
        generated = date.today().isoformat()
        rows_fn = f"    const rows = entries => entries.map(([id, name]) => ({{ id: {js_string(mod_id + ':')} + id, name }}));"
        supported_js = '[' + ', '.join(js_string(v) for v in supported) + ']'
        parts = [
            '// Generated from JAR assets; review candidates before marking verified.',
            '(() => {', rows_fn,
            '    window.MOD_ID_PACKS.register({',
            f'        id: {js_string(mod_id)},',
            f'        name: {js_string(name)},',
            f'        category: {js_string(category)},',
            f'        modIds: [{js_string(mod_id)}],',
            f'        supportedVersions: {supported_js},',
            f'        source: {js_string(source)},',
            f'        modVersion: {js_string(version)},',
            f'        minecraftVersion: {js_string(mc)},',
            f'        loader: {js_string(loader)},',
            '        verified: false,',
            f'        generatedAt: {js_string(generated)},',
        ]
        for key, rows in [('blocks', blocks), ('items', items), ('entities', entities), ('biomes', biomes), ('sounds', sounds)]:
            parts.append(f'        {key}: rows({js_rows(rows)}),')
        parts.extend(['    });', '})();', ''])
        atomic_write(output, '\n'.join(parts).encode('utf-8'), overwrite)
        counts = {'blocks': len(blocks), 'items': len(items), 'entities': len(entities), 'biomes': len(biomes), 'sounds': len(sounds)}
        return mod_id, name, version, loader, mc, counts



def extract_textures(jar_path: Path, assets_root: Path, namespace: str, overwrite=True):
    """Copy PNGs from a JAR into questlog-assets/<namespace>/textures/."""
    safe_namespace(namespace)
    target = assets_root / namespace / 'textures'
    if not target.resolve().is_relative_to(assets_root.resolve()):
        raise ValueError(f'Texture folder escapes assets root: {target}')
    count = 0
    with zipfile.ZipFile(jar_path) as zf:
        prefix = f'assets/{namespace}/textures/'
        for member in zf.infolist():
            name = member.filename
            if member.is_dir() or not name.startswith(prefix) or not name.lower().endswith('.png'):
                continue
            relative = name[len(prefix):]
            parts = relative.split('/')
            # Only copy textures the editor can use; do not extract unrelated files.
            if len(parts) < 2 or parts[0] not in ('item', 'block'):
                continue
            if not valid_resource_path(relative):
                raise ValueError(f'Unsafe texture path in JAR: {name}')
            destination = target.joinpath(*parts)
            if not destination.resolve().is_relative_to(target.resolve()):
                raise ValueError(f'Texture destination escapes output folder: {destination}')
            content = zf.read(member)
            if (len(content) < 33 or content[:8] != b'\x89PNG\r\n\x1a\n'
                    or content[12:16] != b'IHDR'
                    or int.from_bytes(content[16:20], 'big') == 0
                    or int.from_bytes(content[20:24], 'big') == 0):
                raise ValueError(f'Invalid PNG header: {name}')
            atomic_write(destination, content, overwrite)
            count += 1
    return count, target

def main(argv=None):
    parser = argparse.ArgumentParser(description='Convert Minecraft mod JAR files into MOD_ID_PACKS JavaScript data.')
    if sys.version_info < (3, 11):
        parser.error('Python 3.11 or newer is required')
    parser.add_argument('jars', nargs='+', help='One or more mod .jar files (drag and drop is supported via the Windows .bat launcher).')
    parser.add_argument('-o', '--output-dir', help='Output folder. Defaults to the same folder as each JAR.')
    parser.add_argument('-c', '--category', default='Other', help='Website category label (default: Other).')
    parser.add_argument('--textures', action='store_true',
                        help='Also extract item/block PNGs into questlog-assets/<modid>/textures/.')
    parser.add_argument('--assets-dir', help='Questlog assets root folder (default: <output-dir>/questlog-assets).')
    parser.add_argument('--minecraft-version', action='append', metavar='VERSION',
                        help='Tested Minecraft target, e.g. 1.21.1; repeat for multiple targets. Required to enable suggestions when metadata only declares a range.')
    parser.add_argument('--no-overwrite', action='store_true', help='Fail rather than replace existing generated JS or PNG files.')
    args = parser.parse_args(argv)
    if args.assets_dir and not args.textures:
        parser.error('--assets-dir requires --textures')
    if any(not re.fullmatch(r'\d+\.\d+(?:\.\d+)?', v) for v in (args.minecraft_version or [])):
        parser.error('--minecraft-version must be an exact release such as 1.21.1')
    failed = False
    for raw in args.jars:
        jar = Path(raw.strip('"')).expanduser()
        try:
            if not jar.is_file():
                raise FileNotFoundError(f'File not found: {jar}')
            out_dir = Path(args.output_dir).expanduser() if args.output_dir else jar.parent
            out_dir.mkdir(parents=True, exist_ok=True)
            with zipfile.ZipFile(jar) as zf:
                # Read ID first so the output filename is stable and matches the namespace.
                metadata = get_metadata(zf)
                mod_id = metadata[0]
            out = out_dir / f'{mod_id}.js'
            result = generate(jar, out, args.category, args.minecraft_version, not args.no_overwrite)
            _, name, version, loader, mc, counts = result
            print(f'\nCreated: {out}\n{name} {version} | {loader} | Minecraft {mc}')
            print(' | '.join(f'{k}: {v}' for k, v in counts.items()))
            print('Review required: asset-derived IDs are candidates, not a runtime registry dump.')
            if not args.minecraft_version and not metadata[6]:
                print('WARNING: no exact Minecraft target. Use --minecraft-version after testing; supportedVersions is empty.')
            if not any(counts.values()):
                print('WARNING: no ID candidates found. This JAR may need a runtime registry dump.')
            if args.textures:
                assets_root = Path(args.assets_dir).expanduser() if args.assets_dir else out_dir / 'questlog-assets'
                texture_count, texture_dir = extract_textures(jar, assets_root, mod_id, not args.no_overwrite)
                print(f'Textures: {texture_count} PNGs -> {texture_dir}')
                print('Enable in mod-id-packs-manifest.json:')
                print(json.dumps({'src': f'mod-id-packs/{mod_id}.js',
                                  'textures': {'namespace': mod_id}}, indent=2))
        except Exception as exc:
            failed = True
            print(f'\nERROR processing {jar}: {exc}', file=sys.stderr)
    return 1 if failed else 0

if __name__ == '__main__':
    sys.exit(main())
