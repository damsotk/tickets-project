export const TICKET_TYPES = [
  {
    id: 'complaint',
    title: 'Complaint',
    description: 'Write a complaint against a player',
    variant: 'complaint',
  },
  {
    id: 'lore',
    title: 'Lore',
    description: 'Ask a question about server lore',
    variant: 'lore',
  },
  {
    id: 'tech',
    title: 'Tech',
    description: 'Ask a question about the technical side of the server',
    variant: 'tech',
  },
] as const;
