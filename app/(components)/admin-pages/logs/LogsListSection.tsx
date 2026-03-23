'use client';

import { useMemo } from 'react';
import styles from '@/app/(styles)/admin-styles/logs-page.module.css';
import LogsList from './LogsList';
import LogsPagination from './LogsPagination';

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
  const paginationButtons = useMemo(() => {
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
  }, [data.totalPages, currentPage]);

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
