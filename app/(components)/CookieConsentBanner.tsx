'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import styles from '@/app/(styles)/cookie-consent-banner.module.css';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics-consent');
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'true') {
      setHasConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'true');
    setHasConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return hasConsent ? <Analytics /> : null;

  return (
    <>
      <div className={styles.overlay} onClick={handleDecline} />
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>Cookie Notice</h3>
          </div>
          <p className={styles.description}>
            We use analytics to improve your experience and understand how our service is used. This
            helps us make the platform better for everyone.
          </p>
          <p className={styles.note}>
            Essential cookies for authentication, language preferences, and messaging are always
            active.{' '}
            <a href="/privacy-policy" className={styles.link}>
              Learn more
            </a>
          </p>
          <div className={styles.buttons}>
            <button onClick={handleAccept} className={styles.acceptButton}>
              Accept Analytics
            </button>
            <button onClick={handleDecline} className={styles.declineButton}>
              Essential Only
            </button>
          </div>
        </div>
      </div>
      {hasConsent && <Analytics />}
    </>
  );
}
