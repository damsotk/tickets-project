'use client';

import styles from '@/app/(styles)/tickets-styles/all-user-tickets.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { Ticket } from '@/types/tickets';
import { formatDate } from '@/utils/format-date';
import { useParams, useRouter } from 'next/navigation';

interface AllUserTicketsProps {
  tickets: Ticket[] | null;
  selectedTicket: { id: string; status: string } | null;
  onSelectTicket: (id: string, status: 'OPEN' | 'CLOSED') => void;
}

export default function AllUserTickets({
  tickets,
  selectedTicket,
  onSelectTicket,
}: AllUserTicketsProps) {
  const { translate } = useTranslation();
  const translated = translate.tickets.allTickets;
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const createTicketRedirect = () => {
    router.push(`/${locale}/create-ticket`);
  };

  const backToMainRedirect = () => {
    router.push(`/${locale}/`);
  };

  return (
    <div className={styles.ticketsSection}>
      <div className={styles.ticketsHeader}>
        <h2>{translated.title}</h2>
        <div className={styles.headerButtons}>
          <button onClick={createTicketRedirect} className={styles.newTicketBtn}>
            {translated.createButton}
          </button>
          <button onClick={backToMainRedirect} className={styles.backBtn}>
            {translated.backButton ?? '← Back'}
          </button>
        </div>
      </div>

      <div className={styles.ticketsList}>
        {!tickets || tickets.length === 0 ? (
          <p>{translated.noTickets}</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`${styles.ticketItem} ${
                selectedTicket?.id === ticket.id ? styles.active : ''
              } ${ticket.status === 'CLOSED' ? styles.closedTicket : ''}`}
              onClick={() => onSelectTicket(ticket.id, ticket.status)}
            >
              <div className={styles.ticketInfo}>
                <h3>{ticket.title}</h3>
                <span className={styles.ticketDate}>{formatDate(ticket.createdAt)}</span>
              </div>
              <span className={`${styles.ticketStatus} ${styles[ticket.category]}`}>
                {translated.categories[ticket.category as keyof typeof translated.categories] ||
                  ticket.category}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
