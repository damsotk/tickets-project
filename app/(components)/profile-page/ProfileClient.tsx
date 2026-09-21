'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { User } from '@/types/user';
import { useTranslation } from '@/app/(hooks)/use-translation';
import EditableName from '@/app/(components)/profile-page/EditableName';
import TransferCoins from '@/app/(components)/profile-page/TransferCoins';
import TransferHistory from '@/app/(components)/profile-page/TransferHistory';
import useUser from '@/contexts/UserContext';
import styles from '@/app/(styles)/profile-styles/profile-client.module.css';

interface ProfileClientProps {
  user: User;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const { translate } = useTranslation();
  const t = translate.profile;
  const { user: contextUser, setUser } = useUser();
  const [balance, setBalance] = useState(user.balance);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [name, setName] = useState(user.name);
  const [nameChangedAt, setNameChangedAt] = useState(user.nameChangedAt);

  const handleTransferred = (newBalance: number) => {
    setBalance(newBalance);
    setHistoryRefreshKey((prev) => prev + 1);
    if (contextUser) setUser({ ...contextUser, balance: newBalance });
  };

  const handleNameChanged = (newName: string, changedAt: string) => {
    setName(newName);
    setNameChangedAt(new Date(changedAt));
    if (contextUser) setUser({ ...contextUser, name: newName, nameChangedAt: new Date(changedAt) });
  };

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
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  const formatBalance = (balance: number) => {
    return balance.toLocaleString('en-US');
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            {user.avatar ? (
              <img
                src={user.avatar || 'https://api.dicebear.com/9.x/adventurer-neutral/svg?radius=0'}
                className={styles.userAvatar}
                title={name}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>{getInitials()}</div>
            )}
          </div>

          <div className={styles.userInfo}>
            <EditableName
              name={name || t.defaultName}
              nameChangedAt={nameChangedAt}
              className={styles.userName}
              onChanged={handleNameChanged}
            />

            <div className={styles.balanceDisplay}>
              <Image
                src="/icons/custom_gold_ingot.png"
                alt={'Balance'}
                width={24}
                height={24}
                className={styles.coinIcon}
              />
              <span className={styles.balanceAmount}>{formatBalance(balance)}</span>
            </div>
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

        <TransferCoins balance={balance} onTransferred={handleTransferred} />

        <TransferHistory refreshKey={historyRefreshKey} />

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
