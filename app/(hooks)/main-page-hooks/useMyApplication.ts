import { useState, useEffect } from 'react';
import { WhitelistClient } from '@/utils/api-client/whitelist-client';
import { MyApplication } from '@/types/whitelist';

export function useMyApplication(enabled: boolean) {
  const [application, setApplication] = useState<MyApplication | null>(null);
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setApplication(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchApplication = async () => {
      setLoading(true);
      try {
        const json = await WhitelistClient.getMyApplication();
        if (!cancelled) setApplication(json.application);
      } catch (e) {
        console.error('Failed to fetch whitelist application:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchApplication();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { application, setApplication, loading };
}
