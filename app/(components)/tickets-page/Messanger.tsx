import styles from '@/app/(styles)/tickets-styles/messanger.module.css';

interface Message {
  id: number;
  text: string;
  author: string;
  time: string;
}

interface TicketMessangerProps {
  messages: Message[];
  selectedTicket: number | null;
}

export default function TicketMessanger({ messages, selectedTicket }: TicketMessangerProps) {
  return (
    <div className={styles.messengerWrapper}>
      <div className={styles.messengerHeader}>
        <h3>Ticket #{selectedTicket}</h3>
        <button className={styles.closeTicketBtn}>Close Ticket</button>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.author === 'user' ? styles.userMessage : styles.supportMessage}`}
          >
            <div className={styles.messageContent}>
              <p>{message.text}</p>
              <span className={styles.messageTime}>{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input type="text" placeholder="Type a message..." className={styles.messageInput} />
        <button className={styles.sendBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
