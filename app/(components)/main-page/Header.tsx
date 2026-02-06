'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/(hooks)/use-auth';
import styles from '@/app/(styles)/ellium-tickets-styles/header.module.css';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>Ellium tickets</h1>
      </div>
      <div className={styles.headerRight}>
        <>
          {user ? (
            <>
              <div className={styles.chatIcon}>
                <div className={styles.notificationBadge}>1</div>
                <img src="/icons/ticket-alt.png" alt="" />
              </div>
              <img
                src={user.avatar || 'https://api.dicebear.com/9.x/adventurer-neutral/svg?radius=0'}
                alt="User avatar"
                className={styles.userAvatar}
                title={user.name}
              />
              <button
                onClick={logout}
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
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              style={{
                padding: '8px 16px',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          )}
        </>
      </div>
    </header>
  );
}
