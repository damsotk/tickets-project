'use client';

import { useState } from 'react';
import { useServerLogs } from '@/app/(hooks)/admin-page-hooks/useServerLogs';
import styles from '@/app/(styles)/admin-styles/logs-page.module.css';

export default function LogsPage() {
  const [playerInput, setPlayerInput] = useState('');

  const {
    data,
    loading,
    error,
    currentPlayer,
    currentPage,
    fetchLogs,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = useServerLogs();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPlayer = playerInput.trim();

    if (!trimmedPlayer) {
      return;
    }

    await fetchLogs(trimmedPlayer, 1);
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

  const totalPages = data?.totalPages;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Player Logs</h1>

        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
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
            <button
              type="submit"
              disabled={loading || !playerInput.trim()}
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

          {currentPlayer && (
            <div className={styles.searchInfo}>
              Viewing logs for player: <span className={styles.playerName}>{currentPlayer}</span>
              {data?.totalCount !== undefined && (
                <span className={styles.totalCount}>(Total entries: {data.totalCount})</span>
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
                Page {currentPage} {totalPages && `of ${totalPages}`}
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

            <div className={styles.pagination}>
              <button
                onClick={prevPage}
                disabled={!hasPrevPage || loading}
                className={styles.paginationButton}
              >
                ← Previous
              </button>

              <div className={styles.paginationInfo}>
                <span className={styles.currentPage}>Page {currentPage}</span>
                {totalPages && <span className={styles.totalPages}>of {totalPages}</span>}
              </div>

              <button
                onClick={nextPage}
                disabled={(!hasNextPage && (!totalPages || currentPage >= totalPages)) || loading}
                className={styles.paginationButton}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {!loading && !error && !currentPlayer && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3 className={styles.emptyTitle}>Start Searching</h3>
            <p className={styles.emptyText}>
              Enter a player name in the field above to view their logs
            </p>
          </div>
        )}

        {!loading && !error && data && data.logs.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No Logs Found</h3>
            <p className={styles.emptyText}>Player {currentPlayer} has no log entries</p>
          </div>
        )}
      </div>
    </div>
  );
}
