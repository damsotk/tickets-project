import { useState, useEffect } from 'react';
import { MinecraftInfoClient } from '@/utils/api-client/minecraft-info-client';

interface OnlineData {
  players: string[];
  count: number;
}
export function useServerOnline() {
  const [data, setData] = useState<OnlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnline = async () => {
      try {
        const json = await MinecraftInfoClient.getOnlinePlayers();
        setData(json);
        setError(null);
      } catch (e) {
        console.error('Failed to fetch online:', e);
        setError(e instanceof Error ? e.message : 'Failed to fetch online players');
      } finally {
        setLoading(false);
      }
    };

    fetchOnline();
  });

  return { data, loading, error };
}
