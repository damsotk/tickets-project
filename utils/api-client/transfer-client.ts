import { CreateTransferResponse } from '@/types/transfer';

export class TransferClient {
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

  static async transferCoins(recipientId: string, amount: number) {
    return this.request<CreateTransferResponse>('/api/transfers', {
      method: 'POST',
      body: JSON.stringify({ recipientId, amount }),
    });
  }
}
