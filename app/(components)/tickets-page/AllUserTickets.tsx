import styles from '@/app/(styles)/tickets-styles/all-user-tickets.module.css';

interface Ticket {
  id: number;
  title: string;
  status: string;
  date: string;
}

interface AllUserTicketsProps {
  tickets: Ticket[];
  selectedTicket: number | null;
  onSelectTicket: (id: number) => void;
  onCreateTicket?: () => void;
}

export default function AllUserTickets({
  tickets,
  selectedTicket,
  onSelectTicket,
  onCreateTicket,
}: AllUserTicketsProps) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className={styles.ticketsSection}>
        <div className={styles.ticketsHeader}>
          <h2>My Tickets</h2>
          <button className={styles.newTicketBtn} onClick={onCreateTicket}>
            + Create
          </button>
        </div>
        <div className={styles.ticketsList}>
          <p>No tickets yet.</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.ticketsSection}>
      <div className={styles.ticketsHeader}>
        <h2>My Tickets</h2>
        <button className={styles.newTicketBtn}>+ Create</button>
      </div>
      <div className={styles.ticketsList}>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`${styles.ticketItem} ${selectedTicket === ticket.id ? styles.active : ''}`}
            onClick={() => onSelectTicket(ticket.id)}
          >
            <div className={styles.ticketInfo}>
              <h3>{ticket.title}</h3>
              <span className={styles.ticketDate}>{ticket.date}</span>
            </div>
            <span className={`${styles.ticketStatus} ${styles[ticket.status]}`}>
              {ticket.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
