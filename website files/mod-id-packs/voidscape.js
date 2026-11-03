// Generated from Voidscape 1.0 NeoForge jar assets.
// Minecraft 1.21.1 NeoForge, mod version 1.0.
(() => {
    const rows = entries => entries.map(([id, name]) => ({ id: 'voidscape:' + id, name }));
    window.MOD_ID_PACKS.register({
        id: "voidscape",
        name: "Voidscape",
        category: "Adventure and dimensions",
        modIds: ["voidscape"],
        supportedVersions: ["1.21.1"],
        source: "Generated from Modrinth version yu3HKa7W jar voidscape-1.0.jar, assets/voidscape/lang/en_us.json, assets/voidscape/blockstates, assets/voidscape/item models, entity lang keys for voidscape, data/voidscape/worldgen/biome, META-INF/neoforge.mods.toml",
        modVersion: "1.0",
        minecraftVersion: '1.21.1',
        loader: 'NeoForge',
        verified: true,
        generatedAt: "2026-05-28",
        blocks: rows([
          [
                    "moon_dust_block",
                    "Moon Dust Block"
          ]
]),
        items: rows([
          [
                    "cyborg_wolf_armor",
                    "Cyborg Wolf Armor"
          ],
          [
                    "moon_dust_block",
                    "Moon Dust Block"
          ],
          [
                    "moon_rocket_item",
                    "Moon Rocket"
          ]
]),
        entities: rows([
          [
                    "moon_rocket",
                    "Moon Rocket"
          ]
]),
        biomes: rows([
          [
                    "moon_caves",
                    "Moon Caves"
          ],
          [
                    "moon_plains",
                    "Moon Plains"
          ]
]),
        sounds: rows([])
    });
})();
