import { useState } from 'react';
import { TicketClient } from '@/utils/api-client/ticket-client';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import { toast } from 'sonner';

interface UseSendMessageProps {
  selectedTicket: string | null;
  addMessageToCache: (ticketId: string, message: Message) => void;
  onOptimisticUpdate: (ticketId: string, message: Message) => void;
  onOptimisticRemove: (ticketId: string, tempId: string) => void;
  currentUser: User | null;
  onSendSuccess?: () => void;
}

export function useSendMessage({
  selectedTicket,
  addMessageToCache,
  onOptimisticUpdate,
  onOptimisticRemove,
  currentUser,
  onSendSuccess,
}: UseSendMessageProps) {
  const [messageToSend, setMessageToSend] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!selectedTicket) {
      toast.error('No ticket selected');
      return;
    }

    if (!messageToSend.trim()) {
      toast.error('Message is empty');
      return;
    }

    if (!currentUser?.id) {
      toast.error('User not authenticated');
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      text: messageToSend,
      authorId: currentUser.id,
      createdAt: new Date().toString(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        role: 'USER',
      },
      isPending: true,
    };

    onOptimisticUpdate(selectedTicket, optimisticMessage);

    const textToSend = messageToSend;
    setMessageToSend('');
    setIsSending(true);

    onSendSuccess?.();
    try {
      const response = await TicketClient.sendMessage(textToSend, selectedTicket);
      onOptimisticRemove(selectedTicket, tempId);

      if (response.message) {
        addMessageToCache(selectedTicket, response.message);
      }
    } catch (error) {
      toast.error(`${error}`);

      onOptimisticRemove(selectedTicket, tempId);

      setMessageToSend(textToSend);
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
    messageToSend,
    setMessageToSend,
    handleSendMessage,
    handleKeyDown,
    isSending,
  };
}
