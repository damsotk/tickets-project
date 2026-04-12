import { StatusMessage } from '@/types/whitelist';
import styles from '@/app/(styles)/admin-styles/whitelist-page.module.css';

interface Props {
  status: StatusMessage;
}

export function StatusBar({ status }: Props) {
  const isSuccess = status.type === 'success';

  return (
    <div className={`${styles.statusBar} ${isSuccess ? styles.statusSuccess : styles.statusError}`}>
      <span>{isSuccess ? '✓' : '✕'}</span>
      <span>{status.message}</span>
    </div>
  );
}
