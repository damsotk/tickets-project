import { MinecraftInfoClient } from '@/utils/api-client/minecraft-info-client';
import { useState, useCallback } from 'react';

interface LogsResponse {
  page: number;
  count: number;
  totalCount?: number;
  totalPages?: number;
  logs: string[];
  player: string;
}

export function useServerLogs() {
  const [data, setData] = useState<LogsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = useCallback(async (player: string, page: number = 1) => {
    if (!player || player.trim().length === 0) {
      setError('Player name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const json = await MinecraftInfoClient.getLogs({ player, page });
      setData(json);
      setCurrentPlayer(player);
      setCurrentPage(page);
    } catch (e) {
      console.error('Failed to fetch logs:', e);
      setError(e instanceof Error ? e.message : 'Failed to fetch logs');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = useCallback(
    async (newPage: number) => {
      if (newPage < 1 || !currentPlayer) return;
      await fetchLogs(currentPlayer, newPage);
    },
    [currentPlayer, fetchLogs],
  );

  const nextPage = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [currentPage, handlePageChange]);

  const prevPage = useCallback(() => {
    handlePageChange(currentPage - 1);
  }, [currentPage, handlePageChange]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setCurrentPlayer('');
    setCurrentPage(1);
  }, []);

  const hasNextPage = data ? data.count === 300 : false;
  const hasPrevPage = currentPage > 1;

  return {
    data,
    loading,
    error,
    currentPlayer,
    currentPage,
    fetchLogs,
    handlePageChange,
    nextPage,
    prevPage,
    reset,
    hasNextPage,
    hasPrevPage,
  };
}
