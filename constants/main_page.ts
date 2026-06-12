export const SERVER_IP = 'elium.aboba.host';

export const NAVIGATION_ITEMS = [
  {
    id: 'shop' as const,
    href: '/shop',
    color: 'gold' as const,
    icon: '🛒',
    featured: true,
  },
  {
    id: 'altarCrafts' as const,
    href: '/crafts',
    color: 'altar' as const,
    icon: '⚗️',
    featured: false,
  },
  {
    id: 'articles' as const,
    href: '/articles',
    color: 'green' as const,
    icon: '📰',
    featured: false,
  },
  {
    id: 'howToPlay' as const,
    href: '/how-to-play',
    color: 'blue' as const,
    icon: '📖',
    featured: false,
    grouped: true,
  },
  {
    id: 'tickets' as const,
    href: '/create-ticket',
    color: 'red' as const,
    icon: '📋',
    featured: false,
    grouped: true,
  },
  {
    id: 'rumors' as const,
    href: '/discord-message',
    color: 'purple' as const,
    icon: '👁️',
    featured: false,
    grouped: true,
  },
] as const;
