// Generated from Create Aeroworks 1.2.9+mc1.21.1 NeoForge jar assets.
// Minecraft 1.21.1 NeoForge, mod version 1.2.9+mc1.21.1.
(() => {
    const rows = entries => entries.map(([id, name]) => ({ id: 'aeroworks:' + id, name }));
    window.MOD_ID_PACKS.register({
        id: "create_aeroworks",
        name: "Create Aeroworks",
        category: "Tech and automation",
        modIds: ["aeroworks"],
        supportedVersions: ['1.21.1'],
        source: "Generated from Modrinth version LKsY0cFi jar assets/aeroworks/lang/en_us.json, assets/aeroworks/blockstates, assets/aeroworks/item models and META-INF/neoforge.mods.toml",
        modVersion: "1.2.9+mc1.21.1",
        minecraftVersion: '1.21.1',
        loader: 'NeoForge',
        verified: true,
        generatedAt: "2026-05-28",
        blocks: rows([
          [
                    "gyroscope",
                    "Gyroscope"
          ],
          [
                    "joystick",
                    "Joystick"
          ]
]),
        items: rows([
          [
                    "gyroscope",
                    "Gyroscope"
          ],
          [
                    "joystick",
                    "Joystick"
          ]
]),
        entities: rows([]),
        biomes: rows([]),
        sounds: rows([])
    });
})();
