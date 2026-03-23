'use client';

import { useState, useMemo } from 'react';
import { useServerLogs } from '@/app/(hooks)/admin-page-hooks/useServerLogs';
import styles from '@/app/(styles)/admin-styles/logs-page.module.css';
import Header from '@/app/(components)/main-page/Header';

const CATEGORIES = [
  { value: '', label: 'All Categories', icon: '📋' },
  { value: 'ЧАТ', label: 'Chat', icon: '💬' },
  { value: 'КОМАНДА', label: 'Commands', icon: '⌨️' },
  { value: 'БЛОК', label: 'Block Actions', icon: '🧱' },
  { value: 'ДРОП', label: 'Item Drop', icon: '📤' },
  { value: 'ПОДБОР', label: 'Item Pickup', icon: '📥' },
  { value: 'ИНВЕНТАРЬ', label: 'Inventory', icon: '🎒' },
  { value: 'УРОН', label: 'Damage', icon: '⚔️' },
  { value: 'СМЕРТЬ', label: 'Death', icon: '💀' },
];

export default function LogsPage() {
  const [playerInput, setPlayerInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pageInput, setPageInput] = useState('');

  const {
    data,
    loading,
    error,
    currentPlayer,
    currentCategory,
    currentPage,
    fetchLogs,
    goToPage,
    nextPage,
    prevPage,
  } = useServerLogs();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPlayer = playerInput.trim();

    if (!trimmedPlayer && !selectedCategory) {
      return;
    }

    await fetchLogs({
      player: trimmedPlayer,
      category: selectedCategory,
      page: 1,
    });
    setPageInput('');
  };

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);

    if (isNaN(pageNum) || pageNum < 1) {
      return;
    }

    if (data && pageNum > data.totalPages) {
      return;
    }

    goToPage(pageNum);
  };

  const parseLog = (log: string, index: number) => {
    const match = log.match(/^\[(.*?)\]\s*(.*)$/);
    if (match) {
      return {
        id: `${currentPage}-${index}`,
        timestamp: match[1],
        message: match[2],
      };
    }
    return {
      id: `${currentPage}-${index}`,
      timestamp: '',
      message: log,
    };
  };

  const paginationButtons = useMemo(() => {
    if (!data) return [];

    const { totalPages } = data;
    const buttons: (number | string)[] = [];
    const maxButtons = 7;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) buttons.push(i);
        buttons.push('...');
        buttons.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        buttons.push(1);
        buttons.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) buttons.push(i);
      } else {
        buttons.push(1);
        buttons.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) buttons.push(i);
        buttons.push('...');
        buttons.push(totalPages);
      }
    }

    return buttons;
  }, [data, currentPage]);

  const getCurrentCategoryLabel = () => {
    const category = CATEGORIES.find((c) => c.value === currentCategory);
    return category ? `${category.icon} ${category.label}` : currentCategory;
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.contentContainer}>
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label htmlFor="player" className={styles.inputLabel}>
                  Player Name
                </label>
                <input
                  id="player"
                  type="text"
                  value={playerInput}
                  onChange={(e) => setPlayerInput(e.target.value)}
                  placeholder="Enter player nickname..."
                  className={styles.input}
                  disabled={loading}
                  maxLength={16}
                />
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="category" className={styles.inputLabel}>
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.select}
                  disabled={loading}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || (!playerInput.trim() && !selectedCategory)}
              className={styles.searchButton}
            >
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Loading...
                </>
              ) : (
                'Search'
              )}
            </button>
          </form>

          {(currentPlayer || currentCategory) && (
            <div className={styles.searchInfo}>
              <span>Viewing logs</span>
              {currentPlayer && (
                <>
                  {' for player: '}
                  <span className={styles.playerName}>{currentPlayer}</span>
                </>
              )}
              {currentCategory && (
                <>
                  {' in category: '}
                  <span className={styles.categoryName}>{getCurrentCategoryLabel()}</span>
                </>
              )}
              {data?.totalLogs !== undefined && (
                <span className={styles.totalCount}> (Total: {data.totalLogs})</span>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className={styles.errorBox}>
            <div className={styles.errorIcon}>⚠️</div>
            <div>
              <div className={styles.errorTitle}>Error</div>
              <div className={styles.errorMessage}>{error}</div>
            </div>
          </div>
        )}

        {!error && data && data.logs.length > 0 && (
          <div className={styles.logsContainer}>
            <div className={styles.logsHeader}>
              <h2 className={styles.logsTitle}>
                Page {currentPage} of {data.totalPages}
              </h2>
              <div className={styles.logsCount}>
                {data.count} {data.count === 1 ? 'entry' : 'entries'}
              </div>
            </div>

            <div className={styles.logsList}>
              {data.logs.map((log, index) => {
                const parsed = parseLog(log, index);
                const globalIndex = (currentPage - 1) * 300 + index + 1;

                return (
                  <div key={parsed.id} className={styles.logItem}>
                    <div className={styles.logIndex}>#{globalIndex}</div>
                    {parsed.timestamp && (
                      <div className={styles.logTimestamp}>{parsed.timestamp}</div>
                    )}
                    <div className={styles.logMessage}>{parsed.message}</div>
                  </div>
                );
              })}
            </div>

            <div className={styles.paginationWrapper}>
              <div className={styles.pagination}>
                <button
                  onClick={prevPage}
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
                        onClick={() => goToPage(pageNum)}
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
                  onClick={nextPage}
                  disabled={currentPage === data.totalPages || loading}
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
                  max={data.totalPages}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  placeholder="Page #"
                  className={styles.pageJumpInput}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !pageInput}
                  className={styles.pageJumpButton}
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        )}

        {!loading && !error && !currentPlayer && !currentCategory && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3 className={styles.emptyTitle}>Start Searching</h3>
            <p className={styles.emptyText}>
              Enter a player name or select a category to view logs
            </p>
          </div>
        )}

        {!loading && !error && data && data.logs.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No Logs Found</h3>
            <p className={styles.emptyText}>No logs found for the specified filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
