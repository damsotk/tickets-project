'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/app/(styles)/navigation-grid.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { useAnimateShopIcon } from '@/app/(hooks)/use-animate-shop-icon';
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

  const {
    cardRef: shopCardRef,
    imageRef: shopImageRef,
    handleMouseMove: handleShopMouseMove,
    handleMouseLeave: resetShopImage,
  } = useAnimateShopIcon();

  const featuredItems = NAVIGATION_ITEMS.filter((item) => item.featured);
  const regularItems = NAVIGATION_ITEMS.filter(
    (item) => !item.featured && !('grouped' in item && item.grouped),
  );
  const groupedItems = NAVIGATION_ITEMS.filter((item) => 'grouped' in item && item.grouped);

  return (
    <section className={styles.container}>
      {featuredItems.map((item) => {
        const content = translations[item.id];
        return (
          <Link
            key={item.id}
            ref={shopCardRef}
            href={withLocale(locale, item.href)}
            className={styles.shopCard}
            onMouseMove={handleShopMouseMove}
            onMouseLeave={resetShopImage}
          >
            <div className={styles.shopContent}>
              <h3 className={styles.shopTitle}>{content.title}</h3>
              <p className={styles.shopDescription}>{content.description}</p>
              <span className={styles.shopCta}>
                <span className={styles.shopCtaLabel}>Перейти</span>
                <span className={styles.shopCtaDivider} />
                <svg
                  className={styles.shopCtaArrow}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className={styles.shopImageFrame}>
              <div ref={shopImageRef} className={styles.shopImage}>
                <img
                  src="/ellium-tickets-images/shop_icon_eliot.png"
                  alt=""
                  className={styles.shopImageTag}
                />
              </div>
              <div className={styles.shopImageScrim} />
            </div>
          </Link>
        );
      })}

      <div className={styles.list}>
        {regularItems.map((item) => {
          const content = translations[item.id];
          return (
            <Link key={item.id} href={withLocale(locale, item.href)} className={styles.row}>
              <div className={styles.rowContent}>
                <span className={styles.rowTitle}>{content.title}</span>
                <span className={styles.rowDescription}>{content.description}</span>
              </div>
              <svg
                className={styles.rowArrow}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          );
        })}

        {groupedItems.length > 0 && (
          <div className={styles.category}>
            <button
              className={styles.categoryHeader}
              onClick={() => setIsGroupOpen((prev) => !prev)}
              aria-expanded={isGroupOpen}
            >
              <span className={styles.categoryLabel}>{translations.moreSection.title}</span>
              <div
                className={`${styles.categoryChevron} ${isGroupOpen ? styles.categoryChevronOpen : ''}`}
              >
                <svg
                  width="14"
                  height="14"
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

            <div className={`${styles.categoryBody} ${isGroupOpen ? styles.categoryBodyOpen : ''}`}>
              <div className={styles.categoryInner}>
                {groupedItems.map((item) => {
                  const content = translations[item.id];
                  return (
                    <Link key={item.id} href={withLocale(locale, item.href)} className={styles.row}>
                      <div className={styles.rowContent}>
                        <span className={styles.rowTitle}>{content.title}</span>
                        <span className={styles.rowDescription}>{content.description}</span>
                      </div>
                      <svg
                        className={styles.rowArrow}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
