import { normalizeSearchParams, isSearchValid } from '@/utils/admin-logs-search';
import { useState, useCallback } from 'react';

interface UseLogsSearchFormProps {
  onSearch: (params: { player: string; category: string; search: string }) => Promise<void>;
  loading: boolean;
}

export function useLogsSearchForm({ onSearch, loading }: UseLogsSearchFormProps) {
  const [playerInput, setPlayerInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const normalizedParams = normalizeSearchParams({
        player: playerInput,
        category: selectedCategory,
        search: searchInput,
      });

      if (!isSearchValid(normalizedParams)) {
        return;
      }

      await onSearch(normalizedParams);
    },
    [playerInput, selectedCategory, searchInput, onSearch],
  );

  const canSubmit = !loading && !!(playerInput.trim() || selectedCategory);

  return {
    playerInput,
    setPlayerInput,
    selectedCategory,
    setSelectedCategory,
    searchInput,
    setSearchInput,
    handleSubmit,
    canSubmit,
  };
}
