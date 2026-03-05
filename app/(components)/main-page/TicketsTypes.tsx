'use client';

import { useCreateTicket } from '@/app/(hooks)/tickets-page-hooks/use-create-ticket';
import { useTranslation } from '@/app/(hooks)/use-translation';
import styles from '@/app/(styles)/tickets-type-cards.module.css';
import useUser from '@/contexts/UserContext';
import { TICKET_TYPES } from '@/constants/ticket_create_info';

export default function TicketsTypes() {
  const { user } = useUser();
  const { translate } = useTranslation();
  const { checking, handleTicketClick } = useCreateTicket({ user });

  const translated = translate.home.tickets.types;

  return (
    <div className={styles.cardsContainer}>
      {TICKET_TYPES.map((ticket) => {
        const ticketTranslation = translated[ticket.id as keyof typeof translated];

        return (
          <div
            key={ticket.id}
            className={`${styles.ticketCard} ${styles[ticket.variant]}`}
            onClick={() => handleTicketClick(ticket.id)}
            style={{
              cursor: checking ? 'wait' : 'pointer',
              opacity: checking ? 0.7 : 1,
            }}
          >
            <div className={styles.cardTitle}>{ticketTranslation?.title || ticket.title}</div>
            <div className={styles.cardSubtitle}>
              {ticketTranslation?.description || ticket.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
