import { useState, useEffect } from 'react';
import { UserClient } from '@/utils/api-client/user-client';
import type { UserSearchResult } from '@/types/user';

export const MIN_SEARCH_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 300;

export function useUserSearch(query: string, enabled: boolean) {
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const trimmedQuery = query.trim();
  const isQueryValid = enabled && trimmedQuery.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    if (!isQueryValid) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const data = await UserClient.searchUsers(trimmedQuery, controller.signal);
        setResults(data.users);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Failed to search users:', error);
        setResults([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [trimmedQuery, isQueryValid]);

  return { results, isLoading, isQueryValid };
}
