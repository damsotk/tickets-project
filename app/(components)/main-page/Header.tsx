'use client';

import { useRouter } from 'next/navigation';
import styles from '@/app/(styles)/header.module.css';
import { logout } from '@/app/(actions)/auth-actions';
import { useTranslation } from '@/app/(hooks)/use-translation';
import useUser from '@/contexts/UserContext';

export default function Header() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { translate, locale } = useTranslation();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.refresh();
  };

  const handleLogin = () => {
    router.push(`/${locale}/auth`);
  };

  const t = translate.home.header;

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>{t.title}</h1>
      </div>
      <div className={styles.headerRight}>
        {user ? (
          <>
            <div className={styles.chatIcon}>
              <div className={styles.notificationBadge}>1</div>
              <img src="/icons/ticket-alt.png" alt={t.ticketIconAlt} />
            </div>
            <img
              src={user.avatar || 'https://api.dicebear.com/9.x/adventurer-neutral/svg?radius=0'}
              alt={t.userAvatarAlt}
              className={styles.userAvatar}
              title={user.name}
            />
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '12px',
              }}
            >
              {t.logout}
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              padding: '8px 16px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {t.login}
          </button>
        )}
      </div>
    </header>
  );
}
