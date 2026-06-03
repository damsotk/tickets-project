export const ARTICLE_CATEGORIES = [
  {
    id: 'basic',
    iconPath: '/icons/basic.png',
    hasInfobox: false,
  },
  {
    id: 'characters',
    iconPath: '/icons/characters.png',
    hasInfobox: true,
  },
  {
    id: 'faith',
    iconPath: '/icons/faith.png',
    hasInfobox: true,
  },
  {
    id: 'cities',
    iconPath: '/icons/cities.png',
    hasInfobox: true,
  },
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]['id'];

export function getCategoryConfig(id: ArticleCategory) {
  return ARTICLE_CATEGORIES.find((cat) => cat.id === id)!;
}
