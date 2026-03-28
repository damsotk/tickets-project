import { MinecraftInfoClient } from '@/utils/api-client/minecraft-info-client';
import { useState, useCallback } from 'react';

interface LogsResponse {
  page: number;
  totalPages: number;
  totalLogs: number;
  count: number;
  logs: string[];
}

interface FetchParams {
  player?: string;
  category?: string;
  search?: string;
  page?: number;
}

export function useServerLogs() {
  const [data, setData] = useState<LogsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');

  const fetchLogs = useCallback(async (params: FetchParams) => {
    const { player = '', category = '', search = '', page = 1 } = params;

    if (!player && !category) {
      setError('Player name or category is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const json = await MinecraftInfoClient.getLogs({
        player: player || undefined,
        category: category || undefined,
        search: search || undefined,
        page,
      });

      setData(json);
      setCurrentPlayer(player);
      setCurrentCategory(category);
      setCurrentPage(page);
      setCurrentSearch(search);
    } catch (e) {
      console.error('Failed to fetch logs:', e);
      setError(e instanceof Error ? e.message : 'Failed to fetch logs');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToPage = useCallback(
    async (pageNumber: number) => {
      if (pageNumber < 1) return;
      if (data && pageNumber > data.totalPages) return;

      await fetchLogs({
        player: currentPlayer,
        category: currentCategory,
        search: currentSearch,
        page: pageNumber,
      });
    },
    [currentPlayer, currentCategory, data, fetchLogs],
  );

  const nextPage = useCallback(() => {
    if (data && currentPage < data.totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, data, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setCurrentPlayer('');
    setCurrentCategory('');
    setCurrentPage(1);
  }, []);

  return {
    data,
    loading,
    error,
    currentPlayer,
    currentCategory,
    currentSearch,
    currentPage,
    fetchLogs,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
}
