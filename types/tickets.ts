export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export enum TicketCategory {
  COMPLAINT = 'complaint',
  LORE = 'lore',
  TECH = 'tech',
}

export interface Message {
  id: string;
  text: string;
  author: 'user' | 'support';
  time: string;
  ticketId: string;
  createdAt: string;
}

export interface GetTicketResponse {
  tickets: Ticket[];
}

export interface GetTicketByIdResponse {
  ticket: Ticket;
  messages: Message[];
}

export interface CreateTicketResponse {
  success: boolean;
  ticket: Ticket;
}
