import { useAutoScroll } from '@/app/(hooks)/ticket-hooks/use-auto-scroll';
import { useSendMessage } from '@/app/(hooks)/ticket-hooks/use-send-message';
import styles from '@/app/(styles)/tickets-styles/messanger.module.css';
import { Message } from '@/types/message';
import { formatDate } from '@/utils/format-date';
import { truncateName } from '@/utils/truncate-name';

interface TicketMessangerProps {
  messages: Message[];
  selectedTicket: string | null;
  isLoading?: boolean;
  addMessageToCache: (ticketId: string, message: Message) => void;
  onOptimisticUpdate: (ticketId: string, message: Message) => void;
  onOptimisticRemove: (ticketId: string, tempId: string) => void;
  currentUserId?: string;
}

export default function TicketMessanger({
  messages,
  selectedTicket,
  isLoading = false,
  addMessageToCache,
  onOptimisticUpdate,
  onOptimisticRemove,
  currentUserId,
}: TicketMessangerProps) {
  const { containerRef, endRef, scrollAfterSend } = useAutoScroll({
    messages,
    isLoading,
  });

  const { messageToSend, setMessageToSend, handleSendMessage, handleKeyDown, isSending } =
    useSendMessage({
      selectedTicket,
      addMessageToCache,
      onOptimisticUpdate,
      onOptimisticRemove,
      currentUserId,
      onSendSuccess: scrollAfterSend,
    });

  return (
    <div className={styles.messengerWrapper}>
      <div className={styles.messengerHeader}>
        <h3>Ticket #{selectedTicket?.slice(0, 8)}</h3>
        <button className={styles.closeTicketBtn}>Close Ticket</button>
      </div>

      <div className={styles.messagesContainer} ref={containerRef}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className={styles.emptyMessages}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isCurrentUser = message.author.id === currentUserId;
              const isPending = message.isPending;

              return (
                <div
                  key={message.id}
                  className={`${styles.message} ${
                    isCurrentUser ? styles.userMessage : styles.supportMessage
                  } ${isPending ? styles.pendingMessage : ''}`}
                >
                  <div className={styles.messageContent}>
                    <div className={styles.messageHeader}>
                      <strong className={styles.authorName} title={message.author.name}>
                        {truncateName(message.author.name)}
                      </strong>
                      <span className={styles.messageRole}>
                        {isCurrentUser
                          ? 'You'
                          : message.author.role === 'ADMIN'
                            ? 'Support'
                            : message.author.name}
                      </span>
                    </div>
                    <p>{message.text}</p>
                    <span className={styles.messageTime}>
                      {isPending ? (
                        <span className={styles.sendingIndicator}>
                          <span className={styles.sendingDot}></span>
                          Sending...
                        </span>
                      ) : (
                        formatDate(message.createdAt)
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          className={styles.messageInput}
          disabled={isLoading || isSending}
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          className={styles.sendBtn}
          disabled={isLoading || isSending || !messageToSend.trim()}
        >
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
