import { useState } from 'react';
import { Message } from '@/types/message';
import { TicketClient } from '@/utils/api-client/ticket-client';

export function useGetMessages() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [messagesCache, setMessagesCache] = useState<Record<string, Message[]>>({});
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const handleSelectTicket = async (ticketId: string) => {
    if (ticketId === selectedTicket) return;

    setSelectedTicket(ticketId);
    if (messagesCache[ticketId]) {
      return;
    }
    setIsLoadingMessages(true);

    try {
      const response = await TicketClient.getTicketMessagesById(ticketId);

      setMessagesCache((prev) => ({
        ...prev,
        [ticketId]: response.messages,
      }));
    } catch (error) {
      console.error('Failed to load messages:', error);

      setMessagesCache((prev) => ({
        ...prev,
        [ticketId]: [],
      }));
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const messages = selectedTicket ? messagesCache[selectedTicket] || [] : [];

  return {
    selectedTicket,
    messages,
    isLoadingMessages,
    handleSelectTicket,
  };
}
