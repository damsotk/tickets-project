'use client';

import styles from '@/app/(styles)/admin-styles/logs-page.module.css';
import { parseLog } from '@/utils/parse-admin-log';

interface LogsListProps {
  logs: string[];
  currentPage: number;
}

export default function LogsList({ logs, currentPage }: LogsListProps) {
  return (
    <div className={styles.logsList}>
      {logs.map((log, index) => {
        const parsed = parseLog(log, currentPage, index);
        const globalIndex = (currentPage - 1) * 300 + index + 1;

        return (
          <div key={parsed.id} className={styles.logItem}>
            <div className={styles.logIndex}>#{globalIndex}</div>
            {parsed.timestamp && <div className={styles.logTimestamp}>{parsed.timestamp}</div>}
            <div className={styles.logMessage}>{parsed.message}</div>
          </div>
        );
      })}
    </div>
  );
}
