import Link from 'next/link';
import { useState } from 'react';
import { ArrowIcon } from '../../icons/arrow-icon';
import { makeUrlWithUserLocale } from '@/utils/make-url-with-user-locale';
import styles from '@/app/(styles)/navigation-grid.module.css';

type GroupedItem = {
  id: string;
  href: string;
  title: string;
  description: string;
};

type GroupedSectionProps = {
  locale: string;
  label: string;
  items: GroupedItem[];
};

export function GroupedSection({ locale, label, items }: GroupedSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className={styles.list}>
      <div className={styles.category}>
        <button
          className={styles.categoryHeader}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span className={styles.categoryLabel}>{label}</span>
          <div className={`${styles.categoryChevron} ${isOpen ? styles.categoryChevronOpen : ''}`}>
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

        <div className={`${styles.categoryBody} ${isOpen ? styles.categoryBodyOpen : ''}`}>
          <div className={styles.categoryInner}>
            {items.map((item) => (
              <Link
                key={item.id}
                href={makeUrlWithUserLocale(locale, item.href)}
                className={styles.row}
              >
                <div className={styles.rowContent}>
                  <span className={styles.rowTitle}>{item.title}</span>
                  <span className={styles.rowDescription}>{item.description}</span>
                </div>
                <ArrowIcon className={styles.rowArrow} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
