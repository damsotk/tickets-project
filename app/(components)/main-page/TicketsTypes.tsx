'use client';

import { useState } from 'react';
import { useRequireAuth } from '@/app/(hooks)/ellium-tickets-hooks/use-require-auth';
import styles from '@/app/(styles)/ellium-tickets-styles/tickets-type-cards.module.css';

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
  const { checkAuthAndRedirect } = useRequireAuth();
  const [checking, setChecking] = useState(false);

  const handleTicketClick = async (type: string) => {
    if (checking) return;

    setChecking(true);
    try {
      const isAuthenticated = await checkAuthAndRedirect();
      if (!isAuthenticated) return;
      const response = await fetch('/api/tickets/create-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: type }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Ticket created: ', data.ticket);
      } else {
        console.error('Error create ticket: ', data.error);
      }

      console.log('Create ticket:', type);
    } catch (error) {
      console.error(error);
    } finally {
      setChecking(false);
    }
  };

  const handleTestGetClick = async () => {
    try {
      const response = await fetch('/api/tickets/get-tickets', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Tickets:', data.tickets);
      } else {
        console.error('Error fetching tickets:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

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
      <button onClick={() => handleTestGetClick()}>test button for get tickets</button>
    </div>
  );
}
