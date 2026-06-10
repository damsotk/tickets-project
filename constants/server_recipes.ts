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

const HELMET_ARMOR_KODEKS: Ingredient = {
  id: 'helmet_armor_kodeks',
  name: 'Шлем Брони Кодекса',
  texture: '/crafts-textures/end_crystal.png',
};

const CHESTPLATE_ARMOR_KODEKS: Ingredient = {
  id: 'chestplate_armor_kodeks',
  name: 'Нагрудник Брони Кодекса',
  texture: '/crafts-textures/end_crystal.png',
};

const LEGGINGS_ARMOR_KODEKS: Ingredient = {
  id: 'leggings_armor_kodeks',
  name: 'Штаны Брони Кодекса',
  texture: '/crafts-textures/end_crystal.png',
};

const BOOTS_ARMOR_KODEKS: Ingredient = {
  id: 'boots_armor_kodeks',
  name: 'Сапоги Брони Кодекса',
  texture: '/crafts-textures/end_crystal.png',
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
  name: 'Магмовый крем',
  texture: '/crafts-textures/magma_cream.png',
};

const NETHERITE_UPGRADE: Ingredient = {
  id: 'netherite_upgrade',
  name: 'Улучшение незеритом',
  texture: '/crafts-textures/netherite_upgrade.png',
};

const POWDER: Ingredient = {
  id: 'powder',
  name: 'Порошок',
  texture: '/crafts-textures/powder.png',
};

export const RECIPES: Recipe[] = [
  {
    id: 'helmet_armor_kodeks',
    name: 'Броня Кодекса, шлем',
    result: HELMET_ARMOR_KODEKS,
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
    result: CHESTPLATE_ARMOR_KODEKS,
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
    result: LEGGINGS_ARMOR_KODEKS,
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
    result: BOOTS_ARMOR_KODEKS,
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
];
