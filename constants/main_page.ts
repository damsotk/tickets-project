export const SERVER_IP = 'elium.aboba.host';

export const NAVIGATION_ITEMS = [
  {
    id: 'shop' as const,
    href: '/shop',
    featured: true,
  },
  {
    id: 'altarCrafts' as const,
    href: '/crafts',
    featured: false,
  },
  {
    id: 'articles' as const,
    href: '/articles',
    featured: false,
  },
  {
    id: 'howToPlay' as const,
    href: '/how-to-play',
    featured: false,
    grouped: true,
  },
  {
    id: 'tickets' as const,
    href: '/create-ticket',
    featured: false,
    grouped: true,
  },
  {
    id: 'rumors' as const,
    href: '/discord-message',
    featured: false,
    grouped: true,
  },
] as const;
