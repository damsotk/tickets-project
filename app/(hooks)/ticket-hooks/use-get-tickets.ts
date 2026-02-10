import { TicketClient } from '@/utils/api-client/ticket-client';
import { Ticket } from '@/types/tickets';
import { useState, useEffect } from 'react';

export function useGetTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await TicketClient.getTickets();
      setTickets(response.tickets);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return { getTickets, tickets, isLoading, error };
}
