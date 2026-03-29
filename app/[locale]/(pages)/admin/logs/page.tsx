'use client';

import { useServerLogs } from '@/app/(hooks)/admin-page-hooks/useServerLogs';
import styles from '@/app/(styles)/admin-styles/logs-page.module.css';
import LogsSearchSection from '@/app/(components)/admin-pages/logs/LogsSearchSection';
import LogsListSection from '@/app/(components)/admin-pages/logs/LogsListSection';
import ErrorMessage from '@/app/(components)/admin-pages/logs/ErrorMessage';
import EmptyState from '@/app/(components)/admin-pages/logs/EmptyState';

export default function LogsPage() {
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

  const handleSearch = async (params: { player: string; category: string; search: string }) => {
    await fetchLogs({
      player: params.player,
      category: params.category,
      search: params.search,
      page: 1,
    });
  };

  const showInitialState = !loading && !error && !currentPlayer && !currentCategory;
  const showNoResults = !loading && !error && data && data.logs.length === 0;
  const showLogs = !error && data && data.logs.length > 0;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <LogsSearchSection
          onSearch={handleSearch}
          loading={loading}
          currentPlayer={currentPlayer}
          currentCategory={currentCategory}
          totalLogs={data?.totalLogs}
        />

        {error && <ErrorMessage error={error} />}

        {showLogs && (
          <LogsListSection
            data={data}
            currentPage={currentPage}
            loading={loading}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            onGoToPage={goToPage}
          />
        )}

        {showInitialState && <EmptyState type="initial" />}
        {showNoResults && <EmptyState type="no-results" />}
      </div>
    </div>
  );
}
