export const SERVER_IP = 'mc.chroniclesofelium.com';

export const NAVIGATION_ITEMS = [
  {
    id: 'tickets' as const,
    href: '/create-ticket',
    color: 'red' as const,
    icon: '📋',
  },
  {
    id: 'articles' as const,
    href: '/articles',
    color: 'green' as const,
    icon: '📰',
  },
  {
    id: 'rumors' as const,
    href: '/discord-message',
    color: 'purple' as const,
    icon: '👁️',
  },
] as const;
