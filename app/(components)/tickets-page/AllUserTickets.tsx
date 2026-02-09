import styles from '@/app/(styles)/tickets-styles/all-user-tickets.module.css';
import { Ticket } from '@/types/tickets';

interface AllUserTicketsProps {
  tickets: Ticket[];
  selectedTicket: string | null;
  onSelectTicket: (id: string) => void;
  onCreateTicket?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function AllUserTickets({
  tickets,
  selectedTicket,
  onSelectTicket,
  onCreateTicket,
  isLoading,
  error,
}: AllUserTicketsProps) {
  return (
    <div className={styles.ticketsSection}>
      <div className={styles.ticketsHeader}>
        <h2>My Tickets</h2>
        <button className={styles.newTicketBtn} onClick={onCreateTicket}>
          + Create
        </button>
      </div>

      <div className={styles.ticketsList}>
        {isLoading ? (
          <p>Loading tickets...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : !tickets || tickets.length === 0 ? (
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
                <span className={styles.ticketDate}>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
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
