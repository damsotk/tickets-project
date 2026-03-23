'use client';

import { useState } from 'react';
import styles from '@/app/(styles)/admin-styles/logs-page.module.css';

interface LogsPaginationProps {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  paginationButtons: (number | string)[];
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
}

export default function LogsPagination({
  currentPage,
  totalPages,
  loading,
  paginationButtons,
  onNextPage,
  onPrevPage,
  onGoToPage,
}: LogsPaginationProps) {
  const [pageInput, setPageInput] = useState('');

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);

    if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
      return;
    }

    onGoToPage(pageNum);
    setPageInput('');
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagination}>
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1 || loading}
          className={styles.paginationButton}
          aria-label="Previous page"
        >
          ← Previous
        </button>

        <div className={styles.paginationButtons}>
          {paginationButtons.map((btn, idx) => {
            if (btn === '...') {
              return (
                <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            const pageNum = btn as number;
            return (
              <button
                key={pageNum}
                onClick={() => onGoToPage(pageNum)}
                disabled={loading}
                className={`${styles.pageButton} ${
                  pageNum === currentPage ? styles.pageButtonActive : ''
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages || loading}
          className={styles.paginationButton}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>

      <form onSubmit={handlePageJump} className={styles.pageJumpForm}>
        <label htmlFor="pageJump" className={styles.pageJumpLabel}>
          Go to page:
        </label>
        <input
          id="pageJump"
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          placeholder="Page #"
          className={styles.pageJumpInput}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !pageInput} className={styles.pageJumpButton}>
          Go
        </button>
      </form>
    </div>
  );
}
