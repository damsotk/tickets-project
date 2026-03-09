'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TicketClient } from '@/utils/api-client/ticket-client';
import { CreateTicketResponse } from '@/types/tickets';
import type { User } from '@/types/user';
import { toast } from 'sonner';

interface UseCreateTicketProps {
  user: User | null;
}

interface UseCreateTicketProps {
  user: User | null;
}

export function useCreateTicket({ user }: UseCreateTicketProps) {
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  const handleTicketClick = async (type: string) => {
    if (checking) return;

    if (!user) {
      toast.error('Please login to submit a ticket');
      router.push('/auth');
      return;
    }

    setChecking(true);
    try {
      const response: CreateTicketResponse = await TicketClient.createTicket(type);
      toast.success('Ticket created successfully!');
      router.push('/tickets');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create ticket';
      toast.error(message);
    } finally {
      setChecking(false);
    }
  };

  return {
    checking,
    handleTicketClick,
  };
}
