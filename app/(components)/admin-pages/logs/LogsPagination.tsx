'use client';

import styles from '@/app/(styles)/admin-styles/logs-page.module.css';
import { usePageJump } from '@/app/(hooks)/admin-page-hooks/usePageJump';
import { PaginationButton } from '@/utils/pagination-generate-buttons';

interface LogsPaginationProps {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  paginationButtons: PaginationButton[];
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
  const { pageInput, setPageInput, handleSubmit, canSubmit } = usePageJump({
    totalPages,
    loading,
    onGoToPage,
  });

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
          {paginationButtons.map((btn) => {
            if (btn.type === 'ellipsis') {
              return (
                <span key={btn.key} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            const pageNum = btn.value!;
            return (
              <button
                key={btn.key}
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

      <form onSubmit={handleSubmit} className={styles.pageJumpForm}>
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
        <button type="submit" disabled={!canSubmit} className={styles.pageJumpButton}>
          Go
        </button>
      </form>
    </div>
  );
}
