import styles from '@/app/(styles)/admin-styles/logs-page.module.css';

interface EmptyStateProps {
  type: 'initial' | 'no-results';
}

export default function EmptyState({ type }: EmptyStateProps) {
  if (type === 'initial') {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <h3 className={styles.emptyTitle}>Start Searching</h3>
        <p className={styles.emptyText}>Enter a player name or select a category to view logs</p>
      </div>
    );
  }

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>🔍</div>
      <h3 className={styles.emptyTitle}>No Logs Found</h3>
      <p className={styles.emptyText}>No logs found for the specified filters</p>
    </div>
  );
}
