import styles from '@/app/(styles)/admin-styles/whitelist-page.module.css';

interface Props {
  enabled: boolean;
  toggling: boolean;
  fetching: boolean;
  onToggle: () => void;
}

export function WhitelistToggle({ enabled, toggling, fetching, onToggle }: Props) {
  const disabled = toggling || fetching;

  return (
    <div className={styles.toggleBar}>
      <span className={styles.toggleLabel}>
        Вайтлист:{' '}
        <span className={enabled ? styles.toggleStatusOn : styles.toggleStatusOff}>
          {enabled ? 'Включён' : 'Выключен'}
        </span>
      </span>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`${styles.toggleButton} ${enabled ? styles.toggleButtonDisable : styles.toggleButtonEnable}`}
      >
        {toggling ? '...' : enabled ? 'Выключить' : 'Включить'}
      </button>
    </div>
  );
}
