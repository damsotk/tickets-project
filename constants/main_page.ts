export const SERVER_IP = 'mc.chroniclesofelium.com';

export const NAVIGATION_ITEMS = [
  {
    id: 'shop' as const,
    href: '/shop',
    color: 'gold' as const,
    icon: '🛒',
    featured: true,
  },
  {
    id: 'howToPlay' as const,
    href: '/how-to-play',
    color: 'blue' as const,
    icon: '📖',
    featured: false,
  },
  {
    id: 'tickets' as const,
    href: '/create-ticket',
    color: 'red' as const,
    icon: '📋',
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
    id: 'rumors' as const,
    href: '/discord-message',
    color: 'purple' as const,
    icon: '👁️',
    featured: false,
  },
] as const;
