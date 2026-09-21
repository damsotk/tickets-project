import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { TransferClient } from '@/utils/api-client/transfer-client';
import type { TransferDirection, TransferHistoryItem } from '@/types/transfer';

export function useTransferHistory(refreshKey: number) {
  const [direction, setDirection] = useState<TransferDirection>('all');
  const [transfers, setTransfers] = useState<TransferHistoryItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    TransferClient.getHistory(direction, null, controller.signal)
      .then((data) => {
        setTransfers(data.transfers);
        setNextCursor(data.nextCursor);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error('Failed to load transfer history:', error);
        setTransfers([]);
        setNextCursor(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [direction, refreshKey]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const data = await TransferClient.getHistory(direction, nextCursor);
      setTransfers((prev) => [...prev, ...data.transfers]);
      setNextCursor(data.nextCursor);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoadingMore(false);
    }
  }, [direction, nextCursor, isLoadingMore]);

  return {
    direction,
    transfers,
    hasMore: nextCursor !== null,
    isLoading,
    isLoadingMore,
    setDirection,
    loadMore,
  };
}
