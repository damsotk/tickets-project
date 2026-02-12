import { GetMessagesResponse } from '@/types/message';
import { CreateTicketResponse } from '@/types/tickets';

export class TicketClient {
  private static async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  }

  static async createTicket(type: string) {
    return this.request<CreateTicketResponse>('/api/tickets/create-ticket', {
      method: 'POST',
      body: JSON.stringify({ category: type }),
    });
  }

  static async getTicketMessagesById(ticketId: string) {
    return this.request<GetMessagesResponse>(`/api/tickets/messages?ticketId=${ticketId}`);
  }
}
