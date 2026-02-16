import { useState } from 'react';
import { TicketClient } from '@/utils/api-client/ticket-client';

export function useSendMessage() {
  const [messageToSend, setMessageToSend] = useState('');
  const handleSendMessage = async (text: string, selectedTicket: string | null) => {
    try {
      if (!selectedTicket) {
        console.error('No ticket selected');
        return;
      }
      if (!text.trim()) {
        console.error('Message is empty');
        return;
      }
      TicketClient.sendMessage(text, selectedTicket);
      setMessageToSend('');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSendMessage,
    setMessageToSend,
    messageToSend,
  };
}
