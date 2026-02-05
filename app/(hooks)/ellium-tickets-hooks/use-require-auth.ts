'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/utils/api';

interface UseRequireAuthReturn {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuthAndRedirect: () => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useRequireAuth(): UseRequireAuthReturn {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      await ApiClient.getCurrentUser();
      setIsAuthenticated(true);
      return true;
    } catch {
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  const checkAuthAndRedirect = useCallback(async (): Promise<boolean> => {
    const isAuth = await checkAuth();

    if (!isAuth) {
      alert('Please login to submit a ticket');
      router.push('/auth');
      return false;
    }
    return true;
  }, [checkAuth, router]);

  const refetch = useCallback(async () => {
    setLoading(true);
    await checkAuth();
    setLoading(false);
  }, [checkAuth]);

  return {
    isAuthenticated,
    loading,
    checkAuthAndRedirect,
    refetch,
  };
}
