import { TicketCategory } from '@prisma/client';

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: 'OPEN' | 'CLOSED';
}

export interface CreateTicketResponse {
  success: boolean;
  ticket: Ticket;
}

export interface CloseTicketResponse {
  success: boolean;
  ticket: Ticket;
}
