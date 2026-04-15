interface Category {
  id: 'basic' | 'characters' | 'faith' | 'cities';
  title: string;
  description: string;
  iconPath: string;
}

export const ARTICLE_CATEGORIES: Category[] = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'Basic',
    iconPath: '/icons/characters.png',
  },
  {
    id: 'characters',
    title: 'Characters',
    description: 'Legends and heroes of our world',
    iconPath: '/icons/characters.png',
  },
  {
    id: 'faith',
    title: 'Faith',
    description: 'Gods, cults and sacred rituals',
    iconPath: '/icons/faith.png',
  },
  {
    id: 'cities',
    title: 'Cities',
    description: 'Great settlements and their history',
    iconPath: '/icons/cities.png',
  },
];
