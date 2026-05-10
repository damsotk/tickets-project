'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from '@/app/(styles)/navigation-grid.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { NAVIGATION_ITEMS } from '@/constants/main_page';

const AVAILABLE_LOCALES = ['ru', 'en', 'uk', 'by'];

function withLocale(locale: string, href: string) {
  if (href === '/') {
    return `/${locale}`;
  }

  return `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
}

export default function NavigationGrid() {
  const params = useParams();
  const localeFromParams = params.locale as string;

  const locale = AVAILABLE_LOCALES.includes(localeFromParams) ? localeFromParams : 'en';

  const { translate } = useTranslation();
  const translations = translate.home.navigatesButtons;

  const featuredItems = NAVIGATION_ITEMS.filter((item) => item.featured);
  const regularItems = NAVIGATION_ITEMS.filter((item) => !item.featured);

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
      </div>
    </section>
  );
}
