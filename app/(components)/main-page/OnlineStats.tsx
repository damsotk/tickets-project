'use client';

import styles from '@/app/(styles)/online-stats.module.css';
import { getInitials } from '@/utils/get-initials';
import { getRandomColorByText } from '@/utils/get-random-color-by-text';
import { useServerOnline } from '@/app/(hooks)/main-page-hooks/useServerOnline';

export default function OnlineStats() {
  const { data, loading, error } = useServerOnline();

  if (loading) {
    return (
      <section className={styles.container}>
        <div className={`${styles.card} ${styles.skeleton}`}>
          <div className={styles.skeletonHeader}></div>
          <div className={styles.skeletonAvatars}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={styles.skeletonAvatar}></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.container}>
        <div className={`${styles.card} ${styles.error}`}>
          <span className={styles.errorIcon}>⚠️</span>
          <span className={styles.errorText}>Failed to load online data</span>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.indicator}></span>
            <h2 className={styles.title}>Online</h2>
          </div>
          <span className={styles.count}>{data?.count || 0}</span>
        </div>

        {data && data.players.length > 0 ? (
          <div className={styles.playersGrid}>
            {data.players.map((playerName) => (
              <div key={playerName} className={styles.playerCard}>
                <div
                  className={styles.playerAvatar}
                  style={{ backgroundColor: getRandomColorByText(playerName) }}
                >
                  {getInitials(playerName)}
                </div>
                <span className={styles.playerName}>{playerName}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🌙</span>
            <p className={styles.emptyText}>No players online</p>
          </div>
        )}
      </div>
    </section>
  );
}
