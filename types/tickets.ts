import { TicketCategory } from '@prisma/client';

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTicketResponse {
  success: boolean;
  ticket: Ticket;
}
