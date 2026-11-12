"""Hermetic JAR fixtures; no Minecraft install, downloaded mods or packages needed."""
import importlib.util
import io
import json
from pathlib import Path
import shutil
import struct
import subprocess
import tempfile
import unittest
import zipfile
import zlib
from contextlib import redirect_stderr, redirect_stdout

SCRIPT = Path(__file__).resolve().parents[1] / 'mod_jar_generator.py'
spec = importlib.util.spec_from_file_location('mod_jar_generator', SCRIPT)
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)


def png():
    def chunk(kind, data):
        return (struct.pack('>I', len(data)) + kind + data
                + struct.pack('>I', zlib.crc32(kind + data)))
    return (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', struct.pack('>IIBBBBB', 1, 1, 8, 6, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(b'\x00\xff\x00\x00\xff'))
            + chunk(b'IEND', b''))


class GeneratorTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='questlog-generator-')
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)

    def jar(self, entries=None, metadata=None, filename='example mod.jar'):
        jar = self.root / filename
        if metadata is None:
            metadata = {'id': 'example', 'name': 'Example', 'version': '2.1.1',
                        'depends': {'minecraft': '1.21.1'}}
        with zipfile.ZipFile(jar, 'w') as archive:
            archive.writestr('fabric.mod.json', json.dumps(metadata))
            for name, content in (entries or {}).items():
                archive.writestr(name, content)
        return jar

    def run_cli(self, *args):
        with redirect_stdout(io.StringIO()), redirect_stderr(io.StringIO()):
            return generator.main(list(map(str, args)))

    def test_rejects_unsafe_metadata_before_writing(self):
        for namespace in ('../outside', '..', 'bad/name', 'C:\\escape'):
            jar = self.jar(metadata={'id': namespace})
            self.assertEqual(self.run_cli(jar, '-o', self.root / 'output'), 1)
        self.assertFalse((self.root / 'outside.js').exists())

    def test_range_is_not_a_list_of_supported_releases(self):
        jar = self.jar(metadata={'id': 'example', 'depends': {'minecraft': '>=1.20.1 <1.22'}})
        with zipfile.ZipFile(jar) as archive:
            metadata = generator.get_metadata(archive)
        self.assertEqual(metadata[5], '>=1.20.1 <1.22')
        self.assertEqual(metadata[6], [])
        out = self.root / 'result.js'
        generator.generate(jar, out, 'Other', ['1.21.1', '1.21.1'])
        self.assertIn('supportedVersions: ["1.21.1"]', out.read_text(encoding='utf-8'))

    def test_translation_helpers_are_not_registry_ids(self):
        rows = generator.extract_rows({'item.example.fish': 'Fish',
            'item.example.fish.desc': 'A fish description',
            'item.example.fish.tooltip.1': 'Help', 'item.example.Bad ID': 'Bad',
            'item.other.fish': 'Other fish', 'item.example.nested/fish': 'Nested'}, 'example', 'item')
        self.assertEqual(rows, [['fish', 'Fish'], ['nested/fish', 'Nested']])

    def test_blocks_fall_back_to_blockstates_not_model_surfaces(self):
        jar = self.jar({'assets/example/blockstates/crate.json': '{}',
                        'assets/example/models/block/crate_side.json': '{}'})
        out = self.root / 'result.js'
        result = generator.generate(jar, out, 'Other')
        self.assertEqual(result[-1]['blocks'], 1)
        self.assertIn('["crate", "Crate"]', out.read_text())
        self.assertNotIn('crate_side', out.read_text())

    def test_malformed_json_does_not_replace_previous_output(self):
        jar = self.jar({'assets/example/lang/en_us.json': '{invalid'})
        out = self.root / 'example.js'
        out.write_text('previous output')
        self.assertEqual(self.run_cli(jar), 1)
        self.assertEqual(out.read_text(), 'previous output')
        jar = self.jar({'assets/example/lang/en_us.json': '[]'})
        self.assertEqual(self.run_cli(jar), 1)

    def test_extracts_only_primary_namespace_item_and_block_pngs(self):
        jar = self.jar({'assets/example/textures/item/nested/fish.png': png(),
                        'assets/example/textures/block/crate.png': png(),
                        'assets/example/textures/entity/fish.png': png(),
                        'assets/other/textures/item/fish.png': png()})
        count, folder = generator.extract_textures(jar, self.root / 'assets', 'example')
        self.assertEqual(count, 2)
        self.assertEqual((folder / 'item/nested/fish.png').read_bytes(), png())
        self.assertFalse((folder / 'entity').exists())

    def test_unsafe_texture_paths_and_invalid_png_are_rejected(self):
        for name, content in [('item/../../outside.png', png()),
                              ('item/..\\outside.png', png()), ('item/fish.png', b'not PNG')]:
            jar = self.jar({'assets/example/textures/' + name: content})
            with self.assertRaises(ValueError):
                generator.extract_textures(jar, self.root / 'assets', 'example')
        self.assertFalse((self.root / 'outside.png').exists())

    def test_no_overwrite_preserves_js_and_textures(self):
        jar = self.jar({'assets/example/textures/item/fish.png': png()})
        self.assertEqual(self.run_cli(jar, '--textures'), 0)
        self.assertEqual(self.run_cli(jar, '--textures', '--no-overwrite'), 1)
        destination = self.root / 'questlog-assets/example/textures/item/fish.png'
        destination.write_bytes(b'previous file')
        with self.assertRaises(FileExistsError):
            generator.extract_textures(jar, self.root / 'questlog-assets', 'example', False)
        self.assertEqual(destination.read_bytes(), b'previous file')

    def test_batch_continues_after_failure_and_returns_nonzero(self):
        jar = self.jar()
        self.assertEqual(self.run_cli(self.root / 'missing.jar', jar), 1)
        self.assertTrue((self.root / 'example.js').is_file())

    def test_forge_metadata_and_exact_version(self):
        jar = self.root / 'forge.jar'
        with zipfile.ZipFile(jar, 'w') as archive:
            archive.writestr('META-INF/mods.toml', '''[[mods]]
modId="example"
displayName="Example Forge"
version="1.0"
[[dependencies.example]]
modId="minecraft"
versionRange="[1.20.1,1.21)"
''')
        with zipfile.ZipFile(jar) as archive:
            metadata = generator.get_metadata(archive)
        self.assertEqual(metadata[4], 'Forge')
        self.assertEqual(metadata[6], [])

    def test_neoforge_metadata_and_malformed_toml(self):
        jar = self.root / 'neo.jar'
        with zipfile.ZipFile(jar, 'w') as archive:
            archive.writestr('META-INF/neoforge.mods.toml', '''[[mods]]
modId="example"
version="1.0"
[[dependencies.example]]
modId="minecraft"
versionRange="1.21.1"
''')
        with zipfile.ZipFile(jar) as archive:
            metadata = generator.get_metadata(archive)
        self.assertEqual(metadata[4], 'NeoForge')
        self.assertEqual(metadata[6], ['1.21.1'])
        with zipfile.ZipFile(jar, 'w') as archive:
            archive.writestr('META-INF/neoforge.mods.toml', '[[invalid')
        self.assertEqual(self.run_cli(jar), 1)

    def test_unrelated_languages_are_not_used_and_sounds_have_safe_labels(self):
        jar = self.jar({'assets/other/lang/en_us.json': '{invalid',
            'assets/example/sounds.json': json.dumps({'fish.splash': {'subtitle': ['invalid']}})})
        with zipfile.ZipFile(jar) as archive:
            self.assertEqual(generator.find_lang(archive, 'example'), (None, {}))
            self.assertEqual(generator.extract_sounds(archive, 'example', {}),
                             [['fish.splash', 'Fish.splash']])

    def test_cli_rejects_ignored_assets_dir_and_nonexact_target(self):
        for args in [('missing.jar', '--assets-dir', 'assets'),
                     ('missing.jar', '--minecraft-version', '>=1.21')]:
            with self.assertRaises(SystemExit) as result, redirect_stderr(io.StringIO()):
                generator.main(args)
            self.assertEqual(result.exception.code, 2)

    @unittest.skipUnless(shutil.which('node'), 'Node.js is only needed to verify generated JavaScript')
    def test_generated_javascript_registers_with_editor(self):
        jar = self.jar({'assets/example/lang/en_us.json': json.dumps({
            'item.example.fish': 'Fish "special"\nLine 2',
            'block.example.crate': 'Crate'})})
        output = self.root / 'result.js'
        generator.generate(jar, output, 'Food', ['1.21.1'])
        code = "const fs=require('fs'),vm=require('vm');vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),{window:{MOD_ID_PACKS:{register:p=>console.log(JSON.stringify(p))}}});"
        result = subprocess.run(['node', '-e', code, str(output)], capture_output=True, text=True, check=True)
        pack = json.loads(result.stdout)
        self.assertEqual(pack['items'][0]['id'], 'example:fish')
        self.assertEqual(pack['supportedVersions'], ['1.21.1'])
        self.assertFalse(pack['verified'])


if __name__ == '__main__':
    unittest.main()
