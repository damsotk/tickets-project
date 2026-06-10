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

const KODEKS_OBSIDIAN: Ingredient = {
  id: 'kodeks_obsidian',
  name: 'Обсидиан кодекса',
  texture: '/crafts-textures/obsidian.png',
};

const KODEKS_INGOT: Ingredient = {
  id: 'kodeks_ingot',
  name: 'Слиток кодекса',
  texture: '/crafts-textures/ingot.png',
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
      KODEKS_OBSIDIAN,
      ENDER_EYE,
      KODEKS_INGOT,
      NETHERITE_SCRAP,
      ECHO_FRAGMENT,
      SEA_HEARTH,
      END_CRYSTAL,
      KODEKS_INGOT,
    ],
  },
];
