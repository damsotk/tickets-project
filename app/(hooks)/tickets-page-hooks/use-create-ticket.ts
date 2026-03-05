'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TicketClient } from '@/utils/api-client/ticket-client';
import { CreateTicketResponse } from '@/types/tickets';
import type { User } from '@/types/user';

interface UseCreateTicketProps {
  user: User | null;
}

export function useCreateTicket({ user }: UseCreateTicketProps) {
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  const handleTicketClick = async (type: string) => {
    if (checking) return;

    if (!user) {
      alert('Please login to submit a ticket');
      router.push('/auth');
      return;
    }

    setChecking(true);
    try {
      const response: CreateTicketResponse = await TicketClient.createTicket(type);
      router.push('/tickets');
      console.log('Ticket created: ', response.ticket);
    } catch (error) {
      console.error(error);
    } finally {
      setChecking(false);
    }
  };

  return {
    checking,
    handleTicketClick,
  };
}
