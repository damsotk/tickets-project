'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/(styles)/online-stats.module.css';

interface OnlineData {
  players: string[];
  count: number;
}

export default function OnlineStats() {
  const [data, setData] = useState<OnlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOnline = async () => {
      try {
        const res = await fetch('/api/server-online');
        if (!res.ok) throw new Error('Failed to fetch');
        const json: OnlineData = await res.json();
        setData(json);
        setError(false);
      } catch (e) {
        console.error('Failed to fetch online:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOnline();
  }, []);

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      '#ef4444',
      '#f97316',
      '#eab308',
      '#22c55e',
      '#14b8a6',
      '#3b82f6',
      '#8b5cf6',
      '#ec4899',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

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
                  style={{ backgroundColor: getAvatarColor(playerName) }}
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
