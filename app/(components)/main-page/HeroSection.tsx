'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/(styles)/hero-section.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

const SERVER_IP = 'play.ellium.net';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const { translate } = useTranslation();

  const tranlated = translate.home.heroSection;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className={styles.hero}>
      <Image
        src="/ellium-tickets-images/logo.png"
        alt="Ellium Logo"
        width={180}
        height={180}
        className={styles.iconWrapper}
        priority
      />

      <h1 className={styles.title}>{tranlated.title}</h1>
      <p className={styles.subtitle}>{tranlated.subtitle}</p>

      <button className={styles.ipButton} onClick={handleCopy}>
        <span className={styles.ip}>{SERVER_IP}</span>
        <span className={styles.copyIcon}>
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </span>
        <span className={styles.copyText}>{copied ? 'Copied!' : 'Copy'}</span>
      </button>
    </section>
  );
}
