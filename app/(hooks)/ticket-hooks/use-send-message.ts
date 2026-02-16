import { useState } from 'react';
import { TicketClient } from '@/utils/api-client/ticket-client';
import { Message } from '@/types/message';

interface UseSendMessageProps {
  selectedTicket: string | null;
  addMessageToCache: (ticketId: string, message: Message) => void;
}

export function useSendMessage({ selectedTicket, addMessageToCache }: UseSendMessageProps) {
  const [messageToSend, setMessageToSend] = useState('');
  const [isSending, setIsSending] = useState(false);
  const handleSendMessage = async () => {
    try {
      if (!selectedTicket) {
        console.error('No ticket selected');
        return;
      }

      if (!messageToSend.trim()) {
        console.error('Message is empty');
        return;
      }
      const response = await TicketClient.sendMessage(messageToSend, selectedTicket);
      console.log('Message sent:', response);

      if (response.message) {
        addMessageToCache(selectedTicket, response.message);
      }
      setMessageToSend('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    handleSendMessage,
    setMessageToSend,
    messageToSend,
    handleKeyDown,
    isSending,
  };
}
