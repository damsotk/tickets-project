import { Ticket } from '@/types/tickets';
import { TicketClient } from '@/utils/api-client/ticket-client';
import { useState } from 'react';

interface TicketsPageClientProps {
  initialTickets: Ticket[] | null;
}

export function useUpdateTickets({ initialTickets }: TicketsPageClientProps) {
  const [tickets, setTickets] = useState<Ticket[] | null>(initialTickets);

  const handleTicketClose = async (ticketId: string) => {
    let previousTickets: Ticket[] | null = null;

    setTickets((prevTickets) => {
      previousTickets = prevTickets;

      if (!prevTickets) return prevTickets;
      return prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: 'CLOSED' } : ticket,
      );
    });

    try {
      await TicketClient.closeTicket(ticketId);
    } catch (error) {
      console.error('Failed to close ticket: ', error);
      setTickets(previousTickets);
    }
  };

  return {
    handleTicketClose,
    tickets,
  };
}
