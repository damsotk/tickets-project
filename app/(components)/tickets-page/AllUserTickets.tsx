import styles from '@/app/(styles)/tickets-styles/all-user-tickets.module.css';
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
  return (
    <div className={styles.ticketsSection}>
      <div className={styles.ticketsHeader}>
        <h2>My Tickets</h2>
        <button className={styles.newTicketBtn}>+ Create</button>
      </div>

      <div className={styles.ticketsList}>
        {!tickets || tickets.length === 0 ? (
          <p>No tickets yet.</p>
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
                {ticket.category}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
