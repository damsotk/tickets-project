import type { UserSearchResult } from '@/types/user';

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

export type TransferDirection = 'all' | 'sent' | 'received';

export interface TransferHistoryItem {
  id: string;
  amount: number;
  createdAt: string;
  direction: 'sent' | 'received';
  counterparty: UserSearchResult | null;
}

export interface GetTransferHistoryResponse {
  transfers: TransferHistoryItem[];
  nextCursor: string | null;
}
