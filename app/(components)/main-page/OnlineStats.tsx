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
          <svg
            className={styles.errorIcon}
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1.5L15 14H1L8 1.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path d="M8 6.5V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11.7" r="0.8" fill="currentColor" />
          </svg>
          <span className={styles.errorText}>Не удалось загрузить данные онлайна</span>
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
            <h2 className={styles.title}>Онлайн</h2>
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
            <svg
              className={styles.emptyIcon}
              width="32"
              height="32"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M6 8H10M8 6V10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <p className={styles.emptyText}>🌙</p>
          </div>
        )}
      </div>
    </section>
  );
}
