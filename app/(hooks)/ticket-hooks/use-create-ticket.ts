'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/app/(hooks)/auth-hooks/use-require-auth';
import { CreateTicketResponse, TicketClient } from '@/utils/api/ticket-client';

export function useCreateTicket() {
  const [checking, setChecking] = useState(false);
  const { checkAuthAndRedirect } = useRequireAuth();
  const router = useRouter();

  const handleTicketClick = async (type: string) => {
    if (checking) return;

    setChecking(true);
    try {
      const isAuthenticated = await checkAuthAndRedirect();
      if (!isAuthenticated) return;
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
