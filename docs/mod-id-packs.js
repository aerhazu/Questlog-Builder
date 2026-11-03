// Optional verified mod ID packs for Questlog autocomplete.
//
// Keep this file source-first: add a pack only when IDs were generated from a
// specific mod version's source or jar registry dump. Do not copy partial wiki
// lists into production suggestions.
window.MOD_ID_PACKS = {
  schema: 1,
  defaultTarget: '1.21.1',
  supportedTargets: ['1.21.1', '1.20.1'],
  notes: 'Rows are intentionally empty until each mod/version has verified generated registry data.',
  packs: [
    {
      id: 'create',
      name: 'Create',
      description: 'Automation, contraptions, machines, trains, and kinetic building.',
      category: 'Tech and automation',
      modIds: ['create'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'High-priority 1.21.1 pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'farmersdelight',
      name: "Farmer's Delight",
      description: 'Cooking, farming, meals, tools, and kitchen blocks.',
      category: 'Food and farming',
      modIds: ['farmersdelight'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'High-priority food/cooking pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'supplementaries',
      name: 'Supplementaries',
      description: 'Vanilla-style decoration, utility blocks, tools, and small interactions.',
      category: 'Utility and decoration',
      modIds: ['supplementaries'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'High-priority decoration/utility pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'quark',
      name: 'Quark',
      description: 'Vanilla-plus blocks, items, mobs, building pieces, and quality-of-life content.',
      category: 'Utility and vanilla-plus',
      modIds: ['quark'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Marked 1.21.1 compatible per Christopher. Current generated IDs are from the 1.20.1 jar until a direct 1.21.1 registry dump replaces them.'
    },
    {
      id: 'cataclysm',
      name: "L_Ender's Cataclysm",
      description: 'Bosses, dungeons, weapons, armor, and late-game adventure content.',
      category: 'Bosses and adventure',
      modIds: ['cataclysm'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Boss/adventure pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'deeperdarker',
      name: 'Deeper and Darker',
      description: 'Ancient-city expansion with the Otherside dimension, sculk gear, mobs, and biomes.',
      category: 'Adventure and dimensions',
      modIds: ['deeperdarker'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Deep Dark expansion pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'alexscaves',
      name: "Alex's Caves",
      description: 'Large cave biomes with mobs, blocks, gear, fossils, and exploration content.',
      category: 'Caves and adventure',
      modIds: ['alexscaves'],
      supportedVersions: ['1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/alexs-caves',
      note: 'Canonical Modrinth project rechecked on 2026-05-28: current project versions show 1.20.1 Forge/NeoForge availability and no 1.21.1 canonical project version. 1.21.1 unofficial ports should be handled separately if intentionally added later.'
    },
    {
      id: 'alexsmobs',
      name: "Alex's Mobs",
      description: 'Real and fictional animals with drops, items, and wildlife encounters.',
      category: 'Mobs and wildlife',
      modIds: ['alexsmobs'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://www.curseforge.com/minecraft/mc-mods/alexs-mobs-1-21-1-port',
      note: '1.21.1 support is from the CurseForge Alex\'s Mobs unofficial NeoForge port, verified 2026-05-29. The original canonical Modrinth project remains 1.20.1-only in this data.'
    },
    {
      id: 'starcatcher',
      name: 'Starcatcher',
      description: 'Fishing-focused content with new catches, rods, bait, and aquatic progression.',
      category: 'Fishing and collection',
      modIds: ['starcatcher'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Fishing mod target confirmed. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'regions_unexplored',
      name: 'Regions Unexplored',
      description: 'Large biome expansion with plants, trees, blocks, and worldgen variety.',
      category: 'Worldgen and biomes',
      modIds: ['regions_unexplored'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Biome pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'biomeswevegone',
      name: "Oh The Biomes We've Gone / BYG",
      description: 'Biome expansion with new woods, plants, blocks, and exploration content.',
      category: 'Worldgen and biomes',
      modIds: ['biomeswevegone', 'byg'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/oh-the-biomes-weve-gone',
      note: 'Current Modrinth project versions rechecked on 2026-05-28 show 1.21.1 and 1.20.1 availability across supported loaders. Generated autocomplete IDs remain from the verified 1.21.1 NeoForge jar until a separate 1.20.1 extraction is needed.'
    },
    {
      id: 'biomesoplenty',
      name: "Biomes O' Plenty",
      description: 'Classic biome expansion with plants, trees, terrain, and building blocks.',
      category: 'Worldgen and biomes',
      modIds: ['biomesoplenty'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Biome pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'netherexp',
      name: "Jaden's Nether Expansion",
      description: 'Nether biomes, mobs, blocks, gear, and dimension progression.',
      category: 'Nether',
      modIds: ['netherexp'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Nether pack. Needs exact mod version and generated registry dump.'
    },
    {
      id: 'betternether',
      name: 'BetterNether',
      description: 'Nether biomes, structures, plants, mobs, and building blocks.',
      category: 'Nether',
      modIds: ['betternether'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Nether/worldgen pack. Needs loader/version-specific registry dump.'
    },
    {
      id: 'betterend',
      name: 'BetterEnd',
      description: 'End biomes, structures, plants, mobs, tools, and building blocks.',
      category: 'End',
      modIds: ['betterend'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'End/worldgen pack. Needs loader/version-specific registry dump.'
    },
    {
      id: 'endrem',
      name: 'End Remastered',
      description: 'End progression overhaul built around finding unique eyes.',
      category: 'End',
      modIds: ['endrem'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'End progression pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'darkerdepths',
      name: 'Darker Depths',
      description: 'Underground biomes, cave blocks, mobs, and exploration content.',
      category: 'Caves and worldgen',
      modIds: ['darkerdepths'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Cave/worldgen candidate. Needs exact project source and generated registry dump.'
    },
    {
      id: 'galosphere',
      name: 'Galosphere',
      description: 'Crystal cave content with mobs, blocks, tools, and underground exploration.',
      category: 'Caves and worldgen',
      modIds: ['galosphere'],
      supportedVersions: ['1.21.1', '1.20.1'],
      note: 'Cave/content pack. Needs generated registry dump before suggestions are enabled.'
    },
    {
      id: 'create_aeronautics',
      name: 'Create Aeronautics',
      description: 'Source-verified Create expansion with airships, contraption flight, envelopes, propulsion, and aviation utilities.',
      category: 'Tech and automation',
      modIds: ['aeronautics'],
      supportedVersions: ['1.21.1'],
      sourceUrl: 'https://modrinth.com/mod/create-aeronautics/version/YhZLrAFC',
      verificationNote: '1.21.1 NeoForge availability checked from Modrinth version YhZLrAFC. The bundled jar contains a nested aeronautics NeoForge jar; canonical mod ID aeronautics was checked from the nested jar META-INF/neoforge.mods.toml. Block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against lang entity keys, and sound IDs against jar assets/aeronautics/sounds.json on 2026-05-28.'
    },
    {
      id: 'additional_additions',
      name: 'Additional Additions',
      description: 'Vanilla-plus additions for sniffers, music discs, enchanting, farming, food, redstone, and tools.',
      category: 'Utility and vanilla-plus',
      modIds: ['additionaladditions'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/addadd/version/10.0.4%2B1.21.1-neoforge',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version qpSDYH22 and jar META-INF/neoforge.mods.toml; block/item/entity IDs and names checked from jar assets/additionaladditions/lang/en_us.json on 2026-05-28.'
    },
    {
      id: 'better_archeology',
      name: 'Better Archeology',
      description: 'Archaeology expansion with fossils, suspicious blocks, brushes, artifacts, vases, and totems.',
      category: 'Adventure and exploration',
      modIds: ['betterarcheology'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/better-archeology/version/rp4lPDKI',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version rp4lPDKI and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/betterarcheology/sounds.json on 2026-05-28.'
    },
    {
      id: 'natures_spirit',
      name: "Nature's Spirit",
      description: 'Biome and nature expansion with many woods, plants, biomes, blocks, boats, and music.',
      category: 'Worldgen and biomes',
      modIds: ['natures_spirit'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/natures-spirit/version/MGjl80vc',
      verificationNote: "1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version MGjl80vc and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, biome IDs against jar data/natures_spirit/worldgen/biome plus lang names, and sound IDs against jar assets/natures_spirit/sounds.json on 2026-05-28."
    },
    {
      id: 'create_aeroworks',
      name: 'Create Aeroworks',
      description: 'Source-verified Create expansion with compact flight-control utility blocks.',
      category: 'Tech and automation',
      modIds: ['aeroworks'],
      supportedVersions: ['1.21.1'],
      sourceUrl: 'https://modrinth.com/mod/create-aeroworks/version/LKsY0cFi',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version LKsY0cFi and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'ecologics',
      name: 'Ecologics',
      description: 'Biome and ecology content with wood sets, plants, foods, mobs, and ambient sounds.',
      category: 'Worldgen and biomes',
      modIds: ['ecologics'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/ecologics/version/2.3.6-NeoForge',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version ml3dpcRE and jar META-INF/neoforge.mods.toml; block/item/entity IDs and names checked from jar assets/ecologics/lang/en_us.json, and sound IDs checked from jar assets/ecologics/sounds.json on 2026-05-28.'
    },
    {
      id: 'exposure',
      name: 'Exposure',
      description: 'Camera and photography content with film, albums, frames, projector tools, and camera sounds.',
      category: 'Utility and decoration',
      modIds: ['exposure'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/exposure/version/OJ3DFzQc',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version OJ3DFzQc and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/exposure/sounds.json on 2026-05-28.'
    },
    {
      id: 'incision',
      name: 'Incision',
      description: 'Source-verified content pack with twisted biome, block, item, and entity suggestions.',
      category: 'Utility and vanilla-plus',
      modIds: ['twisted'],
      supportedVersions: ['1.21.1'],
      sourceUrl: 'https://modrinth.com/mod/incision/version/u67ZVRZM',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version u67ZVRZM and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and biome IDs against jar data/twisted/worldgen/biome on 2026-05-28.'
    },
    {
      id: 'immersive_enchanting',
      name: 'Immersive Enchanting',
      description: 'Enchanting rework content with bookshelf, ancient book, and music-disc IDs.',
      category: 'Magic and progression',
      modIds: ['immersiveenchanting'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/immersive-enchanting/version/K1pctBBF',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version K1pctBBF and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/immersiveenchanting/sounds.json on 2026-05-28.'
    },
    {
      id: 'selfexpression',
      name: 'Selfexpression',
      description: 'Cosmetic armor and self-expression equipment pack with source-backed item suggestions.',
      category: 'Cosmetic and utility',
      modIds: ['selfexpression'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/selfexpression/version/rkbv62gk',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version rkbv62gk and jar META-INF/neoforge.mods.toml; item IDs were checked against jar item models plus lang names on 2026-05-28.'
    },
    {
      id: 'sleep_tight',
      name: 'Sleep Tight',
      description: 'Sleep overhaul with hammocks, night bags, bedbugs, and dream content.',
      category: 'Utility and decoration',
      modIds: ['sleep_tight'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/sleep-tight',
      verificationNote: '1.21.1 NeoForge availability checked from Modrinth metadata; block/item/entity IDs and names checked from upstream assets/sleep_tight/lang/en_us.json on 2026-05-28.'
    },
    {
      id: 'spelunkers_charm',
      name: "Spelunker's Charm II",
      description: 'Cave and mining expansion with stone sets, cave hazards, entities, a spider cave biome, and ambience.',
      category: 'Caves and adventure',
      modIds: ['spelunkers_charm'],
      supportedVersions: ['1.21.1'],
      sourceUrl: 'https://modrinth.com/mod/spelunkers-charm-ii/version/rsUHNeoF',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version rsUHNeoF and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar worldgen biome files, and sound IDs against jar assets/spelunkers_charm/sounds.json on 2026-05-28.'
    },
    {
      id: 'tide',
      name: 'Tide 2',
      description: 'Fishing and aquatic collection pack with fish, buckets, blocks, entities, and sound suggestions.',
      category: 'Fishing and collection',
      modIds: ['tide'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/tide/version/VDKQwJUs',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version VDKQwJUs and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/tide/sounds.json on 2026-05-28.'
    },
    {
      id: 'whaleborne',
      name: 'Whaleborne',
      description: 'Ocean adventure content with hullback mob, ship-control items, barnacle blocks, and hullback sounds.',
      category: 'Mobs and wildlife',
      modIds: ['whaleborne'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/whaleborne/version/n54AXckx',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version n54AXckx and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/whaleborne/sounds.json on 2026-05-28.'
    },
    {
      id: 'wayfinder',
      name: 'Wayfinder',
      description: 'Exploration companion content with the Wayfinder entity, heart block/item, spawn egg, and sounds.',
      category: 'Utility and exploration',
      modIds: ['wayfinder'],
      supportedVersions: ['1.21.1'],
      sourceUrl: 'https://modrinth.com/mod/wayfinder/version/Sd9eTjQB',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version Sd9eTjQB and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/wayfinder/sounds.json on 2026-05-28.'
    },
    {
      id: 'sophisticated_backpacks',
      name: 'Sophisticated Backpacks',
      description: 'Storage and backpack utility pack with source-backed backpack and upgrade suggestions.',
      category: 'Storage and utility',
      modIds: ['sophisticatedbackpacks'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/sophisticated-backpacks/version/CMFqQKmh',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version CMFqQKmh and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'natures_compass',
      name: "Nature's Compass",
      description: 'Biome-finding utility compass.',
      category: 'Utility and navigation',
      modIds: ['naturescompass'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/natures-compass',
      verificationNote: '1.21.1 NeoForge availability checked from Modrinth/CurseForge metadata; item ID and name checked from upstream assets/naturescompass/lang/en_us.json on 2026-05-28.'
    },
    {
      id: 'comforts',
      name: 'Comforts',
      description: 'Sleeping bags, hammock cloth, and rope-and-nail utility items.',
      category: 'Utility and decoration',
      modIds: ['comforts'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/comforts',
      verificationNote: '1.21.1 NeoForge availability checked from Modrinth metadata; item IDs and names checked from upstream assets/comforts/lang/en_us.json on 2026-05-28.'
    },
    {
      id: 'create_crafts_and_additions',
      name: 'Create Crafts & Additions',
      description: 'Source-verified Create power and utility expansion with alternators, accumulators, motors, tools, and electrical sounds.',
      category: 'Tech and automation',
      modIds: ['createaddition'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/createaddition/version/3ptU8Nq9',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version 3ptU8Nq9 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/createaddition/sounds.json on 2026-05-28.'
    },
    {
      id: 'aquaculture_2',
      name: 'Aquaculture 2',
      description: 'Fishing and aquatic collection pack with fish, tackle, loot, entities, and sound suggestions.',
      category: 'Fishing and collection',
      modIds: ['aquaculture'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/aquaculture/version/5pbz0ETj',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version 5pbz0ETj and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/aquaculture/sounds.json on 2026-05-28.'
    },
    {
      id: 'twilight_forest',
      name: 'The Twilight Forest',
      description: 'Forest dimension adventure pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['twilightforest'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest/files/7797302',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from CurseForge file 7797302 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/twilightforest/worldgen/biome, and sound IDs against jar assets/twilightforest/sounds.json on 2026-05-28. CurseForge listing also shows 1.20.1 availability.'
    },
    {
      id: 'irons_spells',
      name: "Iron's Spells 'n Spellbooks",
      description: 'Spellcasting pack with source-backed spellbook, scroll, block, entity, and sound suggestions.',
      category: 'Magic and progression',
      modIds: ['irons_spellbooks'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/irons-spells-n-spellbooks/version/GpAw0Y4D',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version GpAw0Y4D and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/irons_spellbooks/sounds.json on 2026-05-28.'
    },
    {
      id: 'securitycraft',
      name: 'SecurityCraft',
      description: 'Security and base-protection pack with blocks, tools, entities, and sound suggestions.',
      category: 'Utility and automation',
      modIds: ['securitycraft'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/security-craft/version/5yIP4ezg',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version 5yIP4ezg and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/securitycraft/sounds.json on 2026-05-28.'
    },
    {
      id: 'mekanism',
      name: 'Mekanism',
      description: 'High-tech machines, factories, tools, armor, energy systems, and utility items.',
      category: 'Tech and automation',
      modIds: ['mekanism'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/mekanism/version/5KzzycBT',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version 5KzzycBT and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/mekanism/sounds.json on 2026-05-28.'
    },
    {
      id: 'macaws_furniture',
      name: "Macaw's Furniture",
      description: 'Source-verified Macaw decoration pack with block, item, and sound suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwfurnitures'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-furniture/version/Z5V3Ps7S',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version Z5V3Ps7S and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/mcwfurnitures/sounds.json on 2026-05-28.'
    },
    {
      id: 'macaws_holidays',
      name: "Macaw's Holidays",
      description: 'Source-verified Macaw decoration pack with block and item suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwholidays'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-holidays/version/2mO9Xhpt',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version 2mO9Xhpt and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'macaws_windows',
      name: "Macaw's Windows",
      description: 'Source-verified Macaw decoration pack with block, item, and sound suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwwindows'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-windows/version/rQUE4LCz',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version rQUE4LCz and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/mcwwindows/sounds.json on 2026-05-28.'
    },
    {
      id: 'macaws_roofs',
      name: "Macaw's Roofs",
      description: 'Source-verified Macaw decoration pack with block and item suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwroofs'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-roofs/version/jiXRXiSt',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version jiXRXiSt and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'macaws_doors',
      name: "Macaw's Doors",
      description: 'Source-verified Macaw decoration pack with block, item, and sound suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwdoors'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-doors/version/u7BRX44F',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version u7BRX44F and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/mcwdoors/sounds.json on 2026-05-28.'
    },
    {
      id: 'macaws_fences',
      name: "Macaw's Fences and Walls",
      description: 'Source-verified Macaw decoration pack with block and item suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwfences'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-fences-and-walls/version/jVdb0r4W',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version jVdb0r4W and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'macaws_paths',
      name: "Macaw's Paths and Pavings",
      description: 'Source-verified Macaw decoration pack with block and item suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwpaths'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-paths-and-pavings/version/tlymsxUG',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version tlymsxUG and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'macaws_lights',
      name: "Macaw's Lights and Lamps",
      description: 'Source-verified Macaw decoration pack with block, item, and sound suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwlights'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-lights-and-lamps/version/5U2kQZIL',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version 5U2kQZIL and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/mcwlights/sounds.json on 2026-05-28.'
    },
    {
      id: 'macaws_stairs',
      name: "Macaw's Stairs",
      description: 'Source-verified Macaw decoration pack with block and item suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwstairs'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-stairs/version/4t8L0dGP',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version 4t8L0dGP and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'macaws_trapdoors',
      name: "Macaw's Trapdoors",
      description: 'Source-verified Macaw decoration pack with block and item suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwtrpdoors'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-trapdoors/version/StnP0RNi',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version StnP0RNi and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'macaws_bridges',
      name: "Macaw's Bridges",
      description: 'Source-verified Macaw decoration pack with block and item suggestions.',
      category: 'Macaw decoration',
      modIds: ['mcwbridges'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/macaws-bridges/version/aQ7rY7ng',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version aQ7rY7ng and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'mowzies_mobs',
      name: "Mowzie's Mobs",
      description: 'Boss and mob pack with source-backed mob, weapon, block, and sound suggestions.',
      category: 'Mobs and bosses',
      modIds: ['mowziesmobs'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/mowzies-mobs/version/xgAXTl17',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version xgAXTl17 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/mowziesmobs/sounds.json on 2026-05-28.'
    },
    {
      id: 'immersive_engineering',
      name: 'Immersive Engineering',
      description: 'Industrial machines, wires, multiblocks, tools, materials, and engineering decor.',
      category: 'Tech and automation',
      modIds: ['immersiveengineering'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/immersiveengineering/version/uNRARSH2',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version uNRARSH2 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys while filtering legacy .name translation leftovers, and sound IDs against jar assets/immersiveengineering/sounds.json on 2026-05-28.'
    },
    {
      id: 'apotheosis',
      name: 'Apotheosis',
      description: 'Adventure/progression module with source-backed block, item, and sound suggestions.',
      category: 'Magic and progression',
      modIds: ['apotheosis'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://www.curseforge.com/minecraft/mc-mods/apotheosis/files/7703848',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from CurseForge file 7703848 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, and sound IDs against jar assets/apotheosis/sounds.json on 2026-05-28. CurseForge listing also shows 1.20.1 availability; this row covers the Apotheosis adventure module only, not separate Apothic dependency modules.'
    },
    {
      id: 'ars_nouveau',
      name: 'Ars Nouveau',
      description: 'Magic and automation pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Magic and progression',
      modIds: ['ars_nouveau'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/ars-nouveau/version/ZjQKuuy5',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version ZjQKuuy5 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/ars_nouveau/worldgen/biome, and sound IDs against jar assets/ars_nouveau/sounds.json on 2026-05-28.'
    },
    {
      id: 'aether',
      name: 'The Aether',
      description: 'Sky dimension adventure pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['aether'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/aether/version/K5X5qMwG',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version K5X5qMwG and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/aether/worldgen/biome, and sound IDs against jar assets/aether/sounds.json on 2026-05-28.'
    },
    {
      id: 'relics',
      name: 'Relics',
      description: 'Curios/artifact progression pack with relic item, entity, block, and sound suggestions.',
      category: 'Magic and progression',
      modIds: ['relics'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/relics-mod/version/WKEe9sPL',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version WKEe9sPL and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/relics/sounds.json on 2026-05-28.'
    },
    {
      id: 'immersive_aircraft',
      name: 'Immersive Aircraft',
      description: 'Vehicle and travel pack with aircraft item, entity, and sound suggestions.',
      category: 'Travel and vehicles',
      modIds: ['immersive_aircraft'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/immersive-aircraft/version/RkWu0N4D',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version RkWu0N4D and jar META-INF/neoforge.mods.toml; item IDs were checked against jar item models plus lang names, entity IDs against jar lang entity keys, and sound IDs against jar assets/immersive_aircraft/sounds.json on 2026-05-28.'
    },
    {
      id: 'mystical_agriculture',
      name: 'Mystical Agriculture',
      description: 'Farming and progression pack with source-backed essence, seed, block, and tool suggestions.',
      category: 'Food and farming',
      modIds: ['mysticalagriculture'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/mystical-agriculture/version/AmApJwF1',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version AmApJwF1 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, and item IDs against jar item models plus lang/block names on 2026-05-28.'
    },
    {
      id: 'ars_elemental',
      name: 'Ars Elemental',
      description: 'Ars Nouveau elemental add-on with source-backed block, item, entity, and biome suggestions.',
      category: 'Magic and progression',
      modIds: ['ars_elemental'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://www.curseforge.com/minecraft/mc-mods/ars-elemental/files/8159010',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from CurseForge file 8159010 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and biome IDs against jar data/ars_elemental/worldgen/biome on 2026-05-28. CurseForge listing also shows 1.20.1 availability. Only the ars_elemental namespace was imported; bundled dependency/compat namespaces were intentionally ignored.'
    },
    {
      id: 'blue_skies',
      name: 'Blue Skies',
      description: 'Dimension/adventure pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['blue_skies'],
      supportedVersions: ['1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/blue-skies/version/YGq4rvX4',
      verificationNote: '1.20.1 Forge/NeoForge availability and canonical mod ID checked from Modrinth version YGq4rvX4 and jar META-INF/mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys with variant/helper keys filtered out, biome IDs against jar data/blue_skies/worldgen/biome, and sound IDs against jar assets/blue_skies/sounds.json on 2026-05-28. No 1.21.1 project version was found in the checked Modrinth metadata.'
    },
    {
      id: 'ad_astra',
      name: 'Ad Astra',
      description: 'Space exploration pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['ad_astra'],
      supportedVersions: ['1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/ad-astra/version/Qf7QFXk2',
      verificationNote: '1.20.1 Forge availability and canonical mod ID checked from Modrinth version Qf7QFXk2 and jar META-INF/mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/ad_astra/worldgen/biome, and sound IDs against jar assets/ad_astra/sounds.json on 2026-05-28. No 1.21.1 project version was found in the checked Modrinth metadata.'
    },
    {
      id: 'bumblezone',
      name: 'The Bumblezone',
      description: 'Bee dimension pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['the_bumblezone'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/the-bumblezone/version/ooFeMrip',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version ooFeMrip and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys with message/progress helper keys filtered out, biome IDs against jar data/the_bumblezone/worldgen/biome, and sound IDs against jar assets/the_bumblezone/sounds.json on 2026-05-28.'
    },
    {
      id: 'mofus_better_end',
      name: "Mofu's Better End",
      description: 'End content pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'End',
      modIds: ['mofus_better_end_'],
      supportedVersions: ['1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/mofus-better-end-mofus-broken-constellation/version/RKdHGypu',
      verificationNote: '1.20.1 Forge availability and canonical mod ID checked from Modrinth version RKdHGypu and jar META-INF/mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/mofus_better_end_/worldgen/biome, and sound IDs against jar assets/mofus_better_end_/sounds.json on 2026-05-28. The canonical namespace includes the trailing underscore. No 1.21.1 project version was found in the checked Modrinth metadata.'
    },
    {
      id: 'undergarden',
      name: 'The Undergarden',
      description: 'Underground dimension pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['undergarden'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/the-undergarden/version/sY4KZ9q3',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version sY4KZ9q3 and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/undergarden/worldgen/biome, and sound IDs against jar assets/undergarden/sounds.json on 2026-05-28.'
    },
    {
      id: 'deep_void',
      name: 'The Deep Void',
      description: 'Dark dimension/adventure pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['the_deep_void'],
      supportedVersions: ['1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/(mortius)-the-deep-void/version/N7s4znyj',
      verificationNote: '1.20.1 Forge availability and canonical mod ID checked from Modrinth version N7s4znyj and jar META-INF/mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys with helper keys filtered out, biome IDs against jar data/the_deep_void/worldgen/biome, and sound IDs against jar assets/the_deep_void/sounds.json on 2026-05-28. No 1.21.1 project version was found in the checked Modrinth metadata.'
    },
    {
      id: 'voidscape',
      name: 'Voidscape',
      description: 'Dimension/adventure pack with source-backed moon block, item, entity, and biome suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['voidscape'],
      supportedVersions: ['1.21.1'],
      sourceUrl: 'https://modrinth.com/mod/voidscape/version/yu3HKa7W',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version yu3HKa7W and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and biome IDs against jar data/voidscape/worldgen/biome on 2026-05-28.'
    },
    {
      id: 'enderscape',
      name: 'Enderscape',
      description: 'End dimension content pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'End',
      modIds: ['enderscape'],
      supportedVersions: ['1.21.1'],
      sourceUrl: 'https://modrinth.com/mod/enderscape/version/K3Vz3uXn',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version K3Vz3uXn and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/enderscape/worldgen/biome, and sound IDs against jar assets/enderscape/sounds.json on 2026-05-28. No 1.20.1 project version was found in the checked Modrinth metadata.'
    },
    {
      id: 'abyss_ii',
      name: 'The Abyss II - The Other Side',
      description: 'Abyss dimension adventure pack with source-backed block, item, entity, biome, and sound suggestions.',
      category: 'Adventure and dimensions',
      modIds: ['theabyss'],
      supportedVersions: ['1.20.1'],
      sourceUrl: 'https://www.curseforge.com/minecraft/mc-mods/the-abyss-chapter-ii/files/5129404',
      verificationNote: '1.20.1 Forge availability and canonical mod ID checked from CurseForge file 5129404 and jar META-INF/mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, biome IDs against jar data/theabyss/worldgen/biome, and sound IDs against jar assets/theabyss/sounds.json on 2026-05-28. No 1.21.1 file was found in the checked CurseForge listing.'
    },
    {
      id: 'handcrafted',
      name: 'Handcrafted',
      description: 'Decoration and furniture pack with source-backed block, item, entity, and sound suggestions.',
      category: 'Utility and decoration',
      modIds: ['handcrafted'],
      supportedVersions: ['1.21.1', '1.20.1'],
      sourceUrl: 'https://modrinth.com/mod/handcrafted/version/JfqnpP2Z',
      verificationNote: '1.21.1 NeoForge availability and canonical mod ID checked from Modrinth version JfqnpP2Z and jar META-INF/neoforge.mods.toml; block IDs were checked against jar blockstates plus lang names, item IDs against jar item models plus lang/block names, entity IDs against jar lang entity keys, and sound IDs against jar assets/handcrafted/sounds.json on 2026-05-28.'
    }
  ]
};

window.MOD_ID_PACKS.register = function registerModIdPack(pack) {
  if (!pack || !pack.id) return;
  const packs = window.MOD_ID_PACKS.packs;
  const existing = packs.findIndex(entry => entry.id === pack.id);
  if (existing >= 0) {
    packs[existing] = Object.assign({}, packs[existing], pack);
  } else {
    packs.push(pack);
  }
};
