'use client';

import styles from '@/app/(styles)/header.module.css';
import LanguageSwitcher from '../LanguageSwitcher';
import { useHeader } from '@/app/(hooks)/main-page-hooks/useHeader';

export default function Header() {
  const {
    user,
    translated,
    isMobileMenuOpen,
    mobileMenuRef,
    handleLogout,
    handleLogin,
    handleTicketsClick,
    toggleMobileMenu,
    closeMobileMenu,
  } = useHeader();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>{translated.title}</h1>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.headerRight}>
        <div className={styles.desktopNav}>
          <LanguageSwitcher />
          {user ? (
            <>
              <div className={styles.chatIcon} onClick={handleTicketsClick}>
                {/* <div className={styles.notificationBadge}>0</div> */}
                <img src="/icons/ticket-alt.png" alt={translated.ticketIconAlt} />
              </div>
              <img
                src={user.avatar || 'https://api.dicebear.com/9.x/adventurer-neutral/svg?radius=0'}
                alt={translated.userAvatarAlt}
                className={styles.userAvatar}
                title={user.name}
              />
              <button onClick={handleLogout} className={styles.logoutBtn}>
                {translated.logout}
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className={styles.loginBtn}>
              {translated.login}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={() => toggleMobileMenu()}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenu} ref={mobileMenuRef}>
            <div className={styles.mobileMenuHeader}>
              <h3>{translated.title}</h3>
              <button
                className={styles.closeButton}
                onClick={() => closeMobileMenu()}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.mobileMenuContent}>
              {user && (
                <div className={styles.userInfo}>
                  <img
                    src={
                      user.avatar || 'https://api.dicebear.com/9.x/adventurer-neutral/svg?radius=0'
                    }
                    alt={user.name}
                    className={styles.mobileUserAvatar}
                  />
                  <div className={styles.userDetails}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                </div>
              )}

              <div className={styles.mobileMenuItems}>
                <LanguageSwitcher />

                {user && (
                  <button className={styles.mobileMenuItem} onClick={handleTicketsClick}>
                    <img src="/icons/ticket-alt.png" alt={translated.ticketIconAlt} />
                    <span>Tickets</span>
                    {/* <span className={styles.mobileBadge}>0</span> */}
                  </button>
                )}

                {user ? (
                  <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {translated.logout}
                  </button>
                ) : (
                  <button onClick={handleLogin} className={styles.mobileLoginBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {translated.login}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
