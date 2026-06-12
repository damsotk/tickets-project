'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/app/(styles)/navigation-grid.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { NAVIGATION_ITEMS } from '@/constants/main_page';

const AVAILABLE_LOCALES = ['ru', 'en', 'uk', 'by'];

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
}

export default function NavigationGrid() {
  const params = useParams();
  const localeFromParams = params.locale as string;
  const locale = AVAILABLE_LOCALES.includes(localeFromParams) ? localeFromParams : 'en';

  const { translate } = useTranslation();
  const translations = translate.home.navigatesButtons;

  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const featuredItems = NAVIGATION_ITEMS.filter((item) => item.featured);
  const regularItems = NAVIGATION_ITEMS.filter(
    (item) => !item.featured && !('grouped' in item && item.grouped),
  );
  const groupedItems = NAVIGATION_ITEMS.filter((item) => 'grouped' in item && item.grouped);

  return (
    <section className={styles.container}>
      {featuredItems.length > 0 && (
        <div className={styles.featuredSection}>
          {featuredItems.map((item) => {
            const content = translations[item.id];
            return (
              <Link
                key={item.id}
                href={withLocale(locale, item.href)}
                className={`${styles.card} ${styles.featuredCard} ${styles[item.color]}`}
              >
                <div className={styles.featuredBackground} />
                <div className={styles.featuredInner}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{item.icon}</span>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.title}>{content.title}</h3>
                    <p className={styles.description}>{content.description}</p>
                  </div>
                  <div className={styles.arrow}>→</div>
                </div>
                <div className={styles.featuredBadge}>✦</div>
              </Link>
            );
          })}
        </div>
      )}

      <div className={styles.grid}>
        {regularItems.map((item) => {
          const content = translations[item.id];
          return (
            <Link
              key={item.id}
              href={withLocale(locale, item.href)}
              className={`${styles.card} ${styles[item.color]}`}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{item.icon}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{content.title}</h3>
                <p className={styles.description}>{content.description}</p>
              </div>
              <div className={styles.arrow}>→</div>
            </Link>
          );
        })}

        <div className={styles.accordionWrapper}>
          <button
            className={`${styles.card} ${styles.moreButton} ${isGroupOpen ? styles.moreButtonOpen : ''}`}
            onClick={() => setIsGroupOpen((prev) => !prev)}
            aria-expanded={isGroupOpen}
          >
            <span className={styles.moreButtonLabel}>{translations.moreSection.title}</span>
            <div className={`${styles.chevron} ${isGroupOpen ? styles.chevronOpen : ''}`}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6L8 11L13 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          <div className={`${styles.accordionBody} ${isGroupOpen ? styles.accordionBodyOpen : ''}`}>
            <div className={styles.accordionInner}>
              {groupedItems.map((item) => {
                const content = translations[item.id];
                return (
                  <Link
                    key={item.id}
                    href={withLocale(locale, item.href)}
                    className={`${styles.card} ${styles[item.color]}`}
                  >
                    <div className={styles.iconWrapper}>
                      <span className={styles.icon}>{item.icon}</span>
                    </div>
                    <div className={styles.content}>
                      <h3 className={styles.title}>{content.title}</h3>
                      <p className={styles.description}>{content.description}</p>
                    </div>
                    <div className={styles.arrow}>→</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
