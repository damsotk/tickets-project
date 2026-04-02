import { useState, useCallback } from 'react';

interface UseModalNavigationReturn {
  currentPage: number;
  handleNext: (validator?: () => boolean) => void;
  handlePrev: () => void;
  resetPage: () => void;
}

export function useModalNavigation(initialPage: number = 1): UseModalNavigationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleNext = useCallback((validator?: () => boolean) => {
    if (validator && !validator()) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => setCurrentPage((prev) => prev - 1), []);
  const resetPage = useCallback(() => setCurrentPage(initialPage), [initialPage]);

  return { currentPage, handleNext, handlePrev, resetPage };
}
