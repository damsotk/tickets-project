import { useState, useCallback } from 'react';
import { StatusMessage } from '@/types/whitelist';

export function useStatus() {
  const [status, setStatus] = useState<StatusMessage | null>(null);

  const clearStatus = useCallback(() => setStatus(null), []);

  const setSuccess = useCallback((message: string) => setStatus({ type: 'success', message }), []);

  const setError = useCallback((message: string) => setStatus({ type: 'error', message }), []);

  return { status, setStatus, clearStatus, setSuccess, setError };
}
