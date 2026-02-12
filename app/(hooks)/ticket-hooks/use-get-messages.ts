import { useState } from 'react';
import { Message } from '@/types/message';
import { TicketClient } from '@/utils/api-client/ticket-client';

export function useGetMessages() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const handleSelectTicket = async (ticketId: string) => {
    if (ticketId === selectedTicket) return;
    setSelectedTicket(ticketId);
    setIsLoadingMessages(true);
    try {
      const response = await TicketClient.getTicketMessagesById(ticketId);
      setMessages(response.messages);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  return {
    selectedTicket,
    messages,
    isLoadingMessages,
    handleSelectTicket,
  };
}
