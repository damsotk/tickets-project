'use client';

import styles from '@/app/(styles)/tickets-styles/all-user-tickets.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { Ticket } from '@/types/tickets';
import { formatDate } from '@/utils/format-date';

interface AllUserTicketsProps {
  tickets: Ticket[] | null;
  selectedTicket: string | null;
  onSelectTicket: (id: string) => void;
}

export default function AllUserTickets({
  tickets,
  selectedTicket,
  onSelectTicket,
}: AllUserTicketsProps) {
  const { translate } = useTranslation();
  const t = translate.tickets.allTickets;

  return (
    <div className={styles.ticketsSection}>
      <div className={styles.ticketsHeader}>
        <h2>{t.title}</h2>
        <button className={styles.newTicketBtn}>{t.createButton}</button>
      </div>

      <div className={styles.ticketsList}>
        {!tickets || tickets.length === 0 ? (
          <p>{t.noTickets}</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`${styles.ticketItem} ${selectedTicket === ticket.id ? styles.active : ''}`}
              onClick={() => onSelectTicket(ticket.id)}
            >
              <div className={styles.ticketInfo}>
                <h3>{ticket.title}</h3>
                <span className={styles.ticketDate}>{formatDate(ticket.createdAt)}</span>
              </div>
              <span className={`${styles.ticketStatus} ${styles[ticket.category]}`}>
                {t.categories[ticket.category as keyof typeof t.categories] || ticket.category}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
