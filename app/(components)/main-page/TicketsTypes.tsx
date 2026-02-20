'use client';

import { useCreateTicket } from '@/app/(hooks)/ticket-hooks/use-create-ticket';
import styles from '@/app/(styles)/tickets-type-cards.module.css';
import useUser from '@/contexts/UserContext';

const TICKET_TYPES = [
  {
    id: 'complaint',
    title: 'Complaint',
    description: 'Write a complaint against a player',
    className: styles.complaint,
  },
  {
    id: 'lore',
    title: 'Lore',
    description: 'Ask a question about server lore',
    className: styles.lore,
  },
  {
    id: 'tech',
    title: 'Tech',
    description: 'Ask a question about the technical side of the server',
    className: styles.tech,
  },
] as const;

export default function TicketsTypes() {
  const { user } = useUser();
  const { checking, handleTicketClick } = useCreateTicket({ user });

  return (
    <div className={styles.cardsContainer}>
      {TICKET_TYPES.map((ticket) => (
        <div
          key={ticket.id}
          className={`${styles.ticketCard} ${ticket.className}`}
          onClick={() => handleTicketClick(ticket.id)}
          style={{
            cursor: checking ? 'wait' : 'pointer',
            opacity: checking ? 0.7 : 1,
          }}
        >
          <div className={styles.cardTitle}>{ticket.title}</div>
          <div className={styles.cardSubtitle}>{ticket.description}</div>
        </div>
      ))}
    </div>
  );
}
