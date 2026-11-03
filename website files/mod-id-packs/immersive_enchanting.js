// Generated from Immersive Enchanting 5.0.1 NeoForge jar assets.
// Minecraft 1.21.1 NeoForge, mod version 5.0.1.
(() => {
    const rows = entries => entries.map(([id, name]) => ({ id: 'immersiveenchanting:' + id, name }));
    window.MOD_ID_PACKS.register({
        id: "immersive_enchanting",
        name: "Immersive Enchanting",
        category: "Magic and progression",
        modIds: ["immersiveenchanting"],
        supportedVersions: ['1.21.1', '1.20.1'],
        source: "Generated from Modrinth version K1pctBBF jar assets/immersiveenchanting/lang/en_us.json, blockstates, item models, assets/immersiveenchanting/sounds.json, and META-INF/neoforge.mods.toml",
        modVersion: "5.0.1",
        minecraftVersion: '1.21.1',
        loader: 'NeoForge',
        verified: true,
        generatedAt: '2026-05-28',
        blocks: rows(            [
                      [
                                "creative_bookshelf",
                                "Creative Bookshelf"
                      ]
            ]),
        items: rows(            [
                      [
                                "ancient_book",
                                "Ancient Book"
                      ],
                      [
                                "creative_bookshelf",
                                "Creative Bookshelf"
                      ],
                      [
                                "music_disc_arcane_memories",
                                "Music Disc"
                      ],
                      [
                                "music_disc_biblioclasm",
                                "Music Disc"
                      ]
            ]),
        entities: rows(            []),
        biomes: rows(            []),
        sounds: rows(            [
                      [
                                "arcane_memories",
                                "Arcane Memories"
                      ],
                      [
                                "biblioclasm",
                                "Biblioclasm"
                      ]
            ])
    });
})();
