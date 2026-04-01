'use client';

import { useMemo } from 'react';
import styles from '@/app/(styles)/admin-styles/logs-page.module.css';
import LogsList from './LogsList';
import LogsPagination from './LogsPagination';
import { generatePaginationButtons } from '@/utils/pagination-generate-buttons';

interface LogsListSectionProps {
  data: {
    logs: string[];
    count: number;
    totalPages: number;
    totalLogs: number;
  };
  currentPage: number;
  loading: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
}

export default function LogsListSection({
  data,
  currentPage,
  loading,
  onNextPage,
  onPrevPage,
  onGoToPage,
}: LogsListSectionProps) {
  const paginationButtons = useMemo(
    () => generatePaginationButtons(currentPage, data.totalPages),
    [currentPage, data.totalPages],
  );

  return (
    <div className={styles.logsContainer}>
      <div className={styles.logsHeader}>
        <h2 className={styles.logsTitle}>
          Page {currentPage} of {data.totalPages}
        </h2>
        <div className={styles.logsCount}>
          {data.count} {data.count === 1 ? 'entry' : 'entries'}
        </div>
      </div>

      <LogsList logs={data.logs} currentPage={currentPage} />

      <LogsPagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        loading={loading}
        paginationButtons={paginationButtons}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        onGoToPage={onGoToPage}
      />
    </div>
  );
}
