// hooks/whitelist/use-whitelist.ts

import { useState, useCallback, useEffect } from 'react';
import { StatusMessage } from '@/types/whitelist';
import { WhitelistClient } from '@/utils/api-client/whitelist-client';

interface UseWhitelistOptions {
  setSuccess: (msg: string) => void;
  setError: (msg: string) => void;
  clearStatus: () => void;
}

export function useWhitelist({ setSuccess, setError, clearStatus }: UseWhitelistOptions) {
  const [players, setPlayers] = useState<string[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchWhitelist = useCallback(async () => {
    try {
      const data = await WhitelistClient.getWhitelist();
      setPlayers(data.players ?? []);
      setEnabled(data.state ?? false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить вайтлист');
    } finally {
      setFetching(false);
    }
  }, [setError]);

  useEffect(() => {
    fetchWhitelist();
  }, [fetchWhitelist]);

  const toggle = useCallback(async () => {
    clearStatus();
    setToggling(true);
    const newState = !enabled;

    try {
      const data = await WhitelistClient.toggle(newState);
      setEnabled(newState);
      setSuccess(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось переключить вайтлист');
    } finally {
      setToggling(false);
    }
  }, [enabled, clearStatus, setSuccess, setError]);

  const addPlayer = useCallback(
    async (player: string) => {
      clearStatus();
      setAdding(true);

      try {
        const data = await WhitelistClient.addPlayer(player);
        setSuccess(data.message);
        await fetchWhitelist();
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось подключиться к серверу');
        return false;
      } finally {
        setAdding(false);
      }
    },
    [clearStatus, setSuccess, setError, fetchWhitelist],
  );

  return { players, enabled, fetching, toggling, adding, toggle, addPlayer, fetchWhitelist };
}
