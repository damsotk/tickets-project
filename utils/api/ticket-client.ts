export interface Ticket {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketResponse {
  success: boolean;
  ticket: Ticket;
}

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
}
