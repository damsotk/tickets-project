import styles from '@/app/(styles)/admin-styles/logs-page.module.css';

interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className={styles.errorBox}>
      <div className={styles.errorIcon}>⚠️</div>
      <div>
        <div className={styles.errorTitle}>Error</div>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    </div>
  );
}
