import styles from '@/app/(styles)/admin-styles/whitelist-page.module.css';

interface Props {
  players: string[];
  fetching: boolean;
}

export function PlayerList({ players, fetching }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Игроки в вайтлисте</h3>
        <span className={styles.sectionCount}>{players.length}</span>
      </div>

      {fetching ? (
        <p className={styles.loadingText}>Загрузка...</p>
      ) : players.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>👤</span>
          <p className={styles.emptyText}>Вайтлист пуст</p>
        </div>
      ) : (
        <ul className={styles.playerList}>
          {players.map((name) => (
            <li key={name} className={styles.playerItem}>
              <img
                src={`https://mc-heads.net/avatar/${name}/28`}
                alt={name}
                width={28}
                height={28}
                className={styles.playerAvatar}
              />
              <span className={styles.playerNick}>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
