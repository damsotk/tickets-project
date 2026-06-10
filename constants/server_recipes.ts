export type Ingredient = {
  id: string;
  name: string;
  emoji: string;
  texture?: string;
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
  id: 'void_pearl',
  name: 'Шлем Брони Кодекса',
  emoji: '🟣',
  texture: '/crafts-textures/end_crystal.png',
};

const CHESTPLATE_ARMOR_KODEKS: Ingredient = {
  id: 'void_pearl',
  name: 'Нагрудник Брони Кодекса',
  emoji: '🟣',
  texture: '/crafts-textures/end_crystal.png',
};

const LEGGINGS_ARMOR_KODEKS: Ingredient = {
  id: 'void_pearl',
  name: 'Штаны Брони Кодекса',
  emoji: '🟣',
  texture: '/crafts-textures/end_crystal.png',
};

const BOOTS_ARMOR_KODEKS: Ingredient = {
  id: 'void_pearl',
  name: 'Сапоги Брони Кодекса',
  emoji: '🟣',
  texture: '/crafts-textures/end_crystal.png',
};

const END_CRYSTAL: Ingredient = {
  id: 'end_crystal',
  name: 'Кристалл энда',
  emoji: '🟣',
  texture: '/crafts-textures/end_crystal.png',
};

const ENDER_EYE: Ingredient = {
  id: 'ender_eye',
  name: 'Глаз Края',
  emoji: '🟣',
  texture: '/crafts-textures/ender_eye.png',
};

const DIAMOND: Ingredient = {
  id: 'diamond',
  name: 'Основа брони кодекса',
  emoji: '🟣',
  texture: '/crafts-textures/diamond.png',
};

const NETHERITE_SCRAP: Ingredient = {
  id: 'netherite_scrap',
  name: 'Осколок незерита',
  emoji: '🟣',
  texture: '/crafts-textures/netherite_scrap.png',
};

const SEA_HEARTH: Ingredient = {
  id: 'sea_hearth',
  name: 'Сердце моря',
  emoji: '🟣',
  texture: '/crafts-textures/sea_hearth.png',
};

const ENCHANTED_BOOK: Ingredient = {
  id: 'enchanted_book',
  name: 'Зачарованная книга, прочность 3',
  emoji: '🟣',
  texture: '/crafts-textures/enchanted_book.png',
};

const ECHO_FRAGMENT: Ingredient = {
  id: 'echo_fragment',
  name: 'Осколок эха',
  emoji: '🟣',
  texture: '/crafts-textures/echo_fragment.png',
};

const DIAMOND_HELMET: Ingredient = {
  id: 'diamond_helmet',
  name: 'Алмазный шлем',
  emoji: '🟣',
  texture: '/crafts-textures/diamond_helmet.png',
};

const DIAMOND_CHESTPLATE: Ingredient = {
  id: 'diamond_chestplate',
  name: 'Алмазный нагрудник',
  emoji: '🟣',
  texture: '/crafts-textures/diamond_chestplate.png',
};

const DIAMOND_LEGGINGS: Ingredient = {
  id: 'diamond_chestplate',
  name: 'Алмазные штаны',
  emoji: '🟣',
  texture: '/crafts-textures/diamond_leggings.png',
};

const DIAMOND_BOOTS: Ingredient = {
  id: 'diamond_boots',
  name: 'Алмазные ботинки',
  emoji: '🟣',
  texture: '/crafts-textures/diamond_boots.png',
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
];
