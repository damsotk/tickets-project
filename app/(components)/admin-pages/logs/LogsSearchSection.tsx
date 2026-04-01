'use client';

import { CATEGORIES } from '@/constants/available_admin_logs_categories';
import styles from '@/app/(styles)/admin-styles/logs-page.module.css';
import { formatCategoryLabel } from '@/utils/admin-logs-search';
import { useLogsSearchForm } from '@/app/(hooks)/admin-page-hooks/useLogsSearchForm';

interface LogsSearchSectionProps {
  onSearch: (params: { player: string; category: string; search: string }) => Promise<void>;
  loading: boolean;
  currentPlayer: string;
  currentCategory: string;
  totalLogs?: number;
}

export default function LogsSearchSection({
  onSearch,
  loading,
  currentPlayer,
  currentCategory,
  totalLogs,
}: LogsSearchSectionProps) {
  const {
    playerInput,
    setPlayerInput,
    selectedCategory,
    setSelectedCategory,
    searchInput,
    setSearchInput,
    handleSubmit,
    canSubmit,
  } = useLogsSearchForm({ onSearch, loading });

  const currentCategoryLabel = currentCategory
    ? formatCategoryLabel(currentCategory, CATEGORIES)
    : '';

  return (
    <div className={styles.searchSection}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
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
            <label htmlFor="search" className={styles.inputLabel}>
              Search in logs
            </label>
            <input
              id="search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search text in logs..."
              className={styles.input}
              disabled={loading}
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

        <button type="submit" disabled={!canSubmit} className={styles.searchButton}>
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
              <span className={styles.categoryName}>{currentCategoryLabel}</span>
            </>
          )}
          {totalLogs !== undefined && (
            <span className={styles.totalCount}> (Total: {totalLogs})</span>
          )}
        </div>
      )}
    </div>
  );
}
