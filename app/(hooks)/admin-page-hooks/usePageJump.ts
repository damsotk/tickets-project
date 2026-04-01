import { useState, useCallback } from 'react';
import { validatePageNumber } from '@/utils/pagination-generate-buttons';

interface UsePageJumpProps {
  totalPages: number;
  loading: boolean;
  onGoToPage: (page: number) => void;
}

export function usePageJump({ totalPages, loading, onGoToPage }: UsePageJumpProps) {
  const [pageInput, setPageInput] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const validation = validatePageNumber(pageInput, totalPages);

      if (!validation.isValid || validation.page === null) {
        return;
      }

      onGoToPage(validation.page);
      setPageInput('');
    },
    [pageInput, totalPages, onGoToPage],
  );

  const canSubmit = !loading && !!pageInput;

  return {
    pageInput,
    setPageInput,
    handleSubmit,
    canSubmit,
  };
}
