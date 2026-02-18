'use client';
import styles from '@/app/(styles)/tickets-styles/main-page-tickets.module.css';
import AllUserTickets from '@/app/(components)/tickets-page/AllUserTickets';
import TicketMessanger from '@/app/(components)/tickets-page/Messanger';
import { Ticket } from '@/types/tickets';
import { useGetMessages } from '@/app/(hooks)/ticket-hooks/use-get-messages';
import { User } from '@/types/user';

interface TicketsPageClientProps {
  initialTickets: Ticket[] | null;
  currentUser: User | null;
}

export default function TicketsPageClient({ initialTickets, currentUser }: TicketsPageClientProps) {
  const {
    selectedTicket,
    messages,
    isLoadingMessages,
    handleSelectTicket,
    addMessageToCache,
    addOptimisticMessage,
    removeOptimisticMessage,
  } = useGetMessages();

  return (
    <div className={styles.container}>
      <AllUserTickets
        tickets={initialTickets}
        selectedTicket={selectedTicket}
        onSelectTicket={handleSelectTicket}
      />

      <div className={styles.messengerSection}>
        {selectedTicket ? (
          <TicketMessanger
            messages={messages}
            selectedTicket={selectedTicket}
            isLoading={isLoadingMessages}
            addMessageToCache={addMessageToCache}
            onOptimisticUpdate={addOptimisticMessage}
            onOptimisticRemove={removeOptimisticMessage}
            currentUser={currentUser}
          />
        ) : (
          <div className={styles.emptyState}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Select a ticket to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
