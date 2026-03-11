import { useState, useEffect } from 'react';

interface OnlineData {
  players: string[];
  count: number;
}
export function useServerOnline() {
  const [data, setData] = useState<OnlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOnline = async () => {
      try {
        const res = await fetch('/api/server-online');
        if (!res.ok) throw new Error('Failed to fetch');
        const json: OnlineData = await res.json();
        setData(json);
        setError(false);
      } catch (e) {
        console.error('Failed to fetch online:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOnline();
  }, []);

  return { data, loading, error };
}
