'use client';

import Image from 'next/image';
import type { User } from '@/types/user';
import { useTranslation } from '@/app/(hooks)/use-translation';
import styles from '@/app/(styles)/profile-styles/profile-client.module.css';

interface ProfileClientProps {
  user: User;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const { translate } = useTranslation();
  const t = translate.profile;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-EN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-EN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAccountAge = () => {
    const now = new Date();
    const created = new Date(user.createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} ${t.stats.timeUnits.days}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${t.stats.timeUnits.months}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${t.stats.timeUnits.years}`;
    }
  };

  const getInitials = () => {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={t.avatarAlt}
                width={128}
                height={128}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>{getInitials()}</div>
            )}
          </div>

          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{user.name || t.defaultName}</h1>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>{t.infoCards.role}</span>
            <span className={styles.roleValue}>{user.role}</span>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>{t.infoCards.userId}</span>
            <span className={styles.infoValue}>{user.id}</span>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>{t.infoCards.registrationDate}</span>
            <span className={styles.infoValue}>{formatDate(user.createdAt)}</span>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>{t.infoCards.lastUpdate}</span>
            <span className={styles.infoValue}>
              {user.updatedAt ? formatDate(user.updatedAt) : t.infoCards.notUpdated}
            </span>
          </div>
        </div>

        <div className={styles.statsSection}>
          <h2 className={styles.statsTitle}>{t.stats.title}</h2>

          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>{t.stats.accountAge}</span>
              <span className={styles.statValue}>{getAccountAge()}</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statLabel}>{t.stats.exactCreationDate}</span>
              <span className={styles.statValue}>{formatDateTime(user.createdAt)}</span>
            </div>

            {user.updatedAt &&
              new Date(user.updatedAt).getTime() !== new Date(user.createdAt).getTime() && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>{t.stats.lastModification}</span>
                  <span className={styles.statValue}>{formatDateTime(user.updatedAt)}</span>
                </div>
              )}
          </div>

          {user.role === 'ADMIN' && (
            <div className={styles.badge}>
              <span>{t.badges.admin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
