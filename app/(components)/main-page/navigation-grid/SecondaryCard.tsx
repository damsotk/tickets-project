import Link from 'next/link';
import { ArrowIcon } from '../../icons/arrow-icon';
import { makeUrlWithUserLocale } from '@/utils/make-url-with-user-locale';
import styles from '@/app/(styles)/navigation-grid.module.css';

type SecondaryCardProps = {
  locale: string;
  href: string;
  title: string;
  description: string;
  image?: string;
};

export function SecondaryCard({ locale, href, title, description, image }: SecondaryCardProps) {
  return (
    <Link href={makeUrlWithUserLocale(locale, href)} className={styles.secondaryCard}>
      <div className={styles.secondaryCardImageFrame}>
        {image && <img src={image} alt="" className={styles.secondaryCardImageTag} />}
        <div className={styles.secondaryCardScrim} />
      </div>
      <div className={styles.secondaryCardContent}>
        <h4 className={styles.secondaryCardTitle}>{title}</h4>
        <p className={styles.secondaryCardDescription}>{description}</p>
        <span className={styles.secondaryCardCta}>
          <ArrowIcon className={styles.secondaryCardArrow} size={14} />
        </span>
      </div>
    </Link>
  );
}
