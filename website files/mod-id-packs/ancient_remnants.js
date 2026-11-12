// Generated from JAR assets; review candidates before marking verified.
(() => {
    const rows = entries => entries.map(([id, name]) => ({ id: "ancient_remnants:" + id, name }));
    window.MOD_ID_PACKS.register({
        id: "ancient_remnants",
        name: "Ancient Remnants",
        category: "Other",
        modIds: ["ancient_remnants"],
        supportedVersions: ["1.21.1"],
        source: "Generated from ancient_remnants-1.5.2+1.21.1-fabric.jar: fabric.mod.json, assets/ancient_remnants/lang/en_us.json, assets/ancient_remnants/models/item/, assets/ancient_remnants/sounds.json",
        modVersion: "1.5.2",
        minecraftVersion: "1.21.1",
        loader: "Fabric",
        verified: false,
        generatedAt: "2026-11-12",
        blocks: rows([]),
        items: rows([
            ["monolith_codex", "Monolith Codex"],
            ["research_scrap", "Research Scrap"],
        ]),
        entities: rows([
            ["elderheart", "Elderheart"],
        ]),
        biomes: rows([]),
        sounds: rows([
            ["ambient.monolith", "Ambient.monolith"],
            ["effect.blessing", "Effect.blessing"],
            ["effect.wind_loop", "Effect.wind Loop"],
        ]),
    });
})();
