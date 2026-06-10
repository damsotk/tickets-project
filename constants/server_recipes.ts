export type Ingredient = {
  id: string;
  name: string;
  texture: string;
};

export type Recipe = {
  id: string;
  name: string;
  result: Ingredient;
  slots: [
    Ingredient,
    Ingredient,
    Ingredient,
    Ingredient,
    Ingredient,
    Ingredient,
    Ingredient,
    Ingredient,
  ];
};

const END_CRYSTAL: Ingredient = {
  id: 'end_crystal',
  name: 'Кристалл энда',
  texture: '/crafts-textures/end_crystal.png',
};

const ENDER_EYE: Ingredient = {
  id: 'ender_eye',
  name: 'Глаз Края',
  texture: '/crafts-textures/ender_eye.png',
};

const DIAMOND: Ingredient = {
  id: 'diamond',
  name: 'Основа брони кодекса',
  texture: '/crafts-textures/diamond.png',
};

const NETHERITE_SCRAP: Ingredient = {
  id: 'netherite_scrap',
  name: 'Осколок незерита',
  texture: '/crafts-textures/netherite_scrap.png',
};

const SEA_HEARTH: Ingredient = {
  id: 'sea_hearth',
  name: 'Сердце моря',
  texture: '/crafts-textures/sea_hearth.png',
};

const ENCHANTED_BOOK: Ingredient = {
  id: 'enchanted_book',
  name: 'Зачарованная книга, прочность 3',
  texture: '/crafts-textures/enchanted_book.png',
};

const ECHO_FRAGMENT: Ingredient = {
  id: 'echo_fragment',
  name: 'Осколок эха',
  texture: '/crafts-textures/echo_fragment.png',
};

const DIAMOND_HELMET: Ingredient = {
  id: 'diamond_helmet',
  name: 'Алмазный шлем',
  texture: '/crafts-textures/diamond_helmet.png',
};

const DIAMOND_CHESTPLATE: Ingredient = {
  id: 'diamond_chestplate',
  name: 'Алмазный нагрудник',
  texture: '/crafts-textures/diamond_chestplate.png',
};

const DIAMOND_LEGGINGS: Ingredient = {
  id: 'diamond_leggings',
  name: 'Алмазные штаны',
  texture: '/crafts-textures/diamond_leggings.png',
};

const DIAMOND_BOOTS: Ingredient = {
  id: 'diamond_boots',
  name: 'Алмазные ботинки',
  texture: '/crafts-textures/diamond_boots.png',
};

const DIAMOND_BLOCK: Ingredient = {
  id: 'kodeks_obsidian',
  name: 'Алмазный Блок',
  texture: '/crafts-textures/diamond_block.png',
};

const BLAZE_ROD: Ingredient = {
  id: 'blaze_rod',
  name: 'Огненный стержень',
  texture: '/crafts-textures/blaze_rod.png',
};

const BONE_BLOCK: Ingredient = {
  id: 'bone_block',
  name: 'Блок костей',
  texture: '/crafts-textures/bone_block.png',
};

const BONE: Ingredient = {
  id: 'bone',
  name: 'Кость',
  texture: '/crafts-textures/bone.png',
};

const FLINT: Ingredient = {
  id: 'flint',
  name: 'Кремень',
  texture: '/crafts-textures/flint.png',
};

const MAGMA_CREAM: Ingredient = {
  id: 'magma_cream',
  name: 'Сгусток магмы',
  texture: '/crafts-textures/magma_cream.png',
};

const NETHERITE_UPGRADE: Ingredient = {
  id: 'netherite_upgrade',
  name: 'Улучшение незеритом',
  texture: '/crafts-textures/netherite_upgrade.png',
};

const POWDER: Ingredient = {
  id: 'powder',
  name: 'Порох',
  texture: '/crafts-textures/powder.png',
};

const REGILANT: Ingredient = {
  id: 'regilant',
  name: 'Регилянт',
  texture: '/crafts-textures/amethyst_shard.png',
};

const AMETHYST_SHARD: Ingredient = {
  id: 'amethyst_shard',
  name: 'Аметистовый осколок',
  texture: '/crafts-textures/amethyst_shard.png',
};

const CONDUIT: Ingredient = {
  id: 'conduit',
  name: 'Проводник',
  texture: '/crafts-textures/conduit.png',
};

const LAPIS: Ingredient = {
  id: 'lapis',
  name: 'Лазурит',
  texture: '/crafts-textures/lapis.png',
};

const MAGMA_BLOCK: Ingredient = {
  id: 'magma_block',
  name: 'Блок магмы',
  texture: '/crafts-textures/magma_block.png',
};

const NETHERITE_INGOT: Ingredient = {
  id: 'netherite_ingot',
  name: 'Слиток незерита',
  texture: '/crafts-textures/netherite_ingot.png',
};

const SOUL_SAND: Ingredient = {
  id: 'soul_sand',
  name: 'Песок душ',
  texture: '/crafts-textures/soul_sand.png',
};

const TOTEM_OF_UNDYING: Ingredient = {
  id: 'totem_of_undying',
  name: 'Тотем бессмертия',
  texture: '/crafts-textures/totem_of_undying.png',
};

const TURTLE_SHELL: Ingredient = {
  id: 'turtle_shell',
  name: 'Панцирь черепахи',
  texture: '/crafts-textures/turtle_shell.png',
};

const KODEKS_HELMET: Ingredient = {
  id: 'netherite_helmet',
  name: 'Шлем Кодекса',
  texture: '/crafts-textures/netherite_helmet.png',
};

const KODEKS_CHESTPLATE: Ingredient = {
  id: 'netherite_chestplate',
  name: 'Нагрудник Кодекса',
  texture: '/crafts-textures/netherite_chestplate.png',
};

const KODEKS_LEGGINGS: Ingredient = {
  id: 'netherite_leggings',
  name: 'Штаны Кодекса',
  texture: '/crafts-textures/netherite_leggings.png',
};

const KODEKS_BOOTS: Ingredient = {
  id: 'netherite_boots',
  name: 'Ботинки Кодекса',
  texture: '/crafts-textures/netherite_boots.png',
};

const NO_TEXTURE: Ingredient = {
  id: 'no_texture',
  name: 'Нету текстуры',
  texture: '/crafts-textures/barrier.png',
};

const BOTTLE_ENCHANTING: Ingredient = {
  id: 'bottle_enchanting',
  name: 'Бутылка опыта',
  texture: '/crafts-textures/bottle_enchanting.png',
};

const GLOWSTONE: Ingredient = {
  id: 'glowstone',
  name: 'Светокамень',
  texture: '/crafts-textures/glowstone.png',
};

const GOLD_INGOT: Ingredient = {
  id: 'gold_ingot',
  name: 'Золотой слиток',
  texture: '/crafts-textures/gold_ingot.png',
};

const PAPER: Ingredient = {
  id: 'paper',
  name: 'Бумага',
  texture: '/crafts-textures/paper.png',
};

const FLASH_SCROLL: Ingredient = {
  id: 'flash_scroll',
  name: 'Свиток вспышки',
  texture: '/crafts-textures/paper.png',
};

const BACK_SCROLL: Ingredient = {
  id: 'back_scroll',
  name: 'Свиток возврата',
  texture: '/crafts-textures/paper.png',
};

const CLOCK: Ingredient = {
  id: 'clock',
  name: 'Часы',
  texture: '/crafts-textures/clock.gif',
};

const ENDER_PEARL: Ingredient = {
  id: 'ender_pearl',
  name: 'Жемчуг Края',
  texture: '/crafts-textures/ender_pearl.png',
};

const NAUTILUS_SHELL: Ingredient = {
  id: 'nautilus_shell',
  name: 'Раковина nautilus',
  texture: '/crafts-textures/nautilus_shell.png',
};

const PRISMARINE_SHARD: Ingredient = {
  id: 'prismarine_shard',
  name: 'Осколок призмарина',
  texture: '/crafts-textures/prismarine_shard.png',
};

const RECOVERY_COMPASS: Ingredient = {
  id: 'recovery_compass',
  name: 'Компас восстановления',
  texture: '/crafts-textures/recovery_compass.gif',
};

export const RECIPES: Recipe[] = [
  {
    id: 'helmet_armor_kodeks',
    name: 'Броня Кодекса, шлем',
    result: KODEKS_HELMET,
    slots: [
      END_CRYSTAL,
      ENDER_EYE,
      DIAMOND,
      NETHERITE_SCRAP,
      DIAMOND_HELMET,
      SEA_HEARTH,
      ENCHANTED_BOOK,
      ECHO_FRAGMENT,
    ],
  },
  {
    id: 'chestplate_armor_kodeks',
    name: 'Броня Кодекса, нагрудник',
    result: KODEKS_CHESTPLATE,
    slots: [
      END_CRYSTAL,
      ENDER_EYE,
      DIAMOND,
      NETHERITE_SCRAP,
      DIAMOND_CHESTPLATE,
      SEA_HEARTH,
      ENCHANTED_BOOK,
      ECHO_FRAGMENT,
    ],
  },
  {
    id: 'leggings_armor_kodeks',
    name: 'Броня Кодекса, штаны',
    result: KODEKS_LEGGINGS,
    slots: [
      END_CRYSTAL,
      ENDER_EYE,
      DIAMOND,
      NETHERITE_SCRAP,
      DIAMOND_LEGGINGS,
      SEA_HEARTH,
      ENCHANTED_BOOK,
      ECHO_FRAGMENT,
    ],
  },
  {
    id: 'boots_armor_kodeks',
    name: 'Броня Кодекса, ботинки',
    result: KODEKS_BOOTS,
    slots: [
      END_CRYSTAL,
      ENDER_EYE,
      DIAMOND,
      NETHERITE_SCRAP,
      DIAMOND_BOOTS,
      SEA_HEARTH,
      ENCHANTED_BOOK,
      ECHO_FRAGMENT,
    ],
  },
  {
    id: 'diamond',
    name: 'Основа брони кодекса',
    result: DIAMOND,
    slots: [
      NETHERITE_UPGRADE,
      POWDER,
      BONE_BLOCK,
      BLAZE_ROD,
      DIAMOND_BLOCK,
      MAGMA_CREAM,
      BONE,
      FLINT,
    ],
  },
  {
    id: 'regilant',
    name: 'Регилянт',
    result: REGILANT,
    slots: [
      LAPIS,
      END_CRYSTAL,
      SOUL_SAND,
      TURTLE_SHELL,
      CONDUIT,
      TOTEM_OF_UNDYING,
      MAGMA_BLOCK,
      NETHERITE_INGOT,
    ],
  },
  {
    id: 'flash_scroll',
    name: 'Свиток вспышки',
    result: FLASH_SCROLL,
    slots: [BOTTLE_ENCHANTING, POWDER, GOLD_INGOT, BLAZE_ROD, PAPER, MAGMA_CREAM, GLOWSTONE, FLINT],
  },
  {
    id: 'back_scroll',
    name: 'Свиток возврата',
    result: BACK_SCROLL,
    slots: [
      ENDER_PEARL,
      PRISMARINE_SHARD,
      RECOVERY_COMPASS,
      NETHERITE_SCRAP,
      PAPER,
      NAUTILUS_SHELL,
      CLOCK,
      AMETHYST_SHARD,
    ],
  },
];
