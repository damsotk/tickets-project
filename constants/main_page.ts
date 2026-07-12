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
    image: '/ellium-tickets-images/altar_icon.png',
  },
  {
    id: 'articles' as const,
    href: '/articles',
    featured: false,
    image: '/ellium-tickets-images/wiki_icon.png',
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
