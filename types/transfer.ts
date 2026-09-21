export interface CoinTransfer {
  id: string;
  amount: number;
  recipientId: string | null;
  createdAt: string;
}

export interface CreateTransferResponse {
  transfer: CoinTransfer;
  balance: number;
}
