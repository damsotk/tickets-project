import styles from '@/app/(styles)/tickets-styles/messanger.module.css';
import { Message } from '@/types/message';
import { formatDate } from '@/utils/format-date';

interface TicketMessangerProps {
  messages: Message[];
  selectedTicket: string | null;
  isLoading?: boolean;
}

export default function TicketMessanger({
  messages,
  selectedTicket,
  isLoading = false,
}: TicketMessangerProps) {
  return (
    <div className={styles.messengerWrapper}>
      <div className={styles.messengerHeader}>
        <h3>Ticket #{selectedTicket?.slice(0, 8)}</h3>
        <button className={styles.closeTicketBtn}>Close Ticket</button>
      </div>

      <div className={styles.messagesContainer}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className={styles.emptyMessages}>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.author.role === 'USER' ? styles.userMessage : styles.supportMessage
              }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageHeader}>
                  <strong>{message.author.name}</strong>
                  <span className={styles.messageRole}>
                    {message.author.role === 'ADMIN' ? 'Support' : 'You'}
                  </span>
                </div>
                <p>{message.text}</p>
                <span className={styles.messageTime}>{formatDate(message.createdAt)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          className={styles.messageInput}
          disabled={isLoading}
        />
        <button className={styles.sendBtn} disabled={isLoading}>
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
