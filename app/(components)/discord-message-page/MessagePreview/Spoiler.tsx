import { ReactNode, useState } from 'react';
import styles from '@/app/(styles)/discord-message-styles/discord-preview.module.css';

export default function Spoiler({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      className={`${styles.spoiler} ${revealed ? styles.spoilerRevealed : ''}`}
      onClick={() => setRevealed(true)}
    >
      <span className={styles.spoilerContent}>{children}</span>
    </span>
  );
}
