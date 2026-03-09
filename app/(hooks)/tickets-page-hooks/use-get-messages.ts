import { useState } from 'react';
import { Message } from '@/types/message';
import { TicketClient } from '@/utils/api-client/ticket-client';
import { toast } from 'sonner';

interface SelectedTicket {
  id: string;
  status: 'OPEN' | 'CLOSED';
}

export function useGetMessages() {
  const [selectedTicket, setSelectedTicket] = useState<SelectedTicket | null>(null);
  const [messagesCache, setMessagesCache] = useState<Record<string, Message[]>>({});
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const handleSelectTicket = async (ticketId: string, status: 'OPEN' | 'CLOSED') => {
    if (ticketId === selectedTicket?.id) return;

    setSelectedTicket({ id: ticketId, status: status });
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
      toast.error(`Failed to load messages: ${error}`);

      setMessagesCache((prev) => ({
        ...prev,
        [ticketId]: [],
      }));
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const updateTicketStatus = (ticketId: string, status: 'OPEN' | 'CLOSED') => {
    setSelectedTicket((prev) => {
      if (prev?.id === ticketId) {
        return { ...prev, status };
      }
      return prev;
    });
  };

  const addMessageToCache = (ticketId: string, message: Message) => {
    setMessagesCache((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), message],
    }));
  };

  const addOptimisticMessage = (ticketId: string, message: Message) => {
    setMessagesCache((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), message],
    }));
  };

  const removeOptimisticMessage = (ticketId: string, tempId: string) => {
    setMessagesCache((prev) => ({
      ...prev,
      [ticketId]: (prev[ticketId] || []).filter((msg) => msg.id !== tempId),
    }));
  };

  const messages = selectedTicket ? messagesCache[selectedTicket.id] || [] : [];

  return {
    selectedTicket,
    messages,
    isLoadingMessages,
    handleSelectTicket,
    addMessageToCache,
    addOptimisticMessage,
    removeOptimisticMessage,
    updateTicketStatus,
  };
}
