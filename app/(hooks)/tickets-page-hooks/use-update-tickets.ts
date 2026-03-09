import { Ticket } from '@/types/tickets';
import { TicketClient } from '@/utils/api-client/ticket-client';
import { useState } from 'react';
import { toast } from 'sonner';

interface TicketsPageClientProps {
  initialTickets: Ticket[] | null;
}

interface UseUpdateTicketsProps extends TicketsPageClientProps {
  onTicketStatusChange?: (ticketId: string, status: 'OPEN' | 'CLOSED') => void;
}

export function useUpdateTickets({ initialTickets, onTicketStatusChange }: UseUpdateTicketsProps) {
  const [tickets, setTickets] = useState<Ticket[] | null>(initialTickets);
  const [isClosing, setIsClosing] = useState(false);

  const handleTicketClose = async (ticketId: string) => {
    if (isClosing) return;

    setIsClosing(true);
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
      onTicketStatusChange?.(ticketId, 'CLOSED');
    } catch (error) {
      toast.error(`'Failed to close ticket: ${error}`);
      setTickets(previousTickets);
    } finally {
      setIsClosing(false);
    }
  };

  return {
    handleTicketClose,
    tickets,
    isClosing,
  };
}
