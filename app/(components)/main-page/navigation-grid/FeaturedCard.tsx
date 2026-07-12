import Link from 'next/link';
import { ArrowIcon } from '../../icons/arrow-icon';
import { makeUrlWithUserLocale } from '@/utils/make-url-with-user-locale';
import styles from '@/app/(styles)/navigation-grid.module.css';
import type { useAnimateShopIcon } from '@/app/(hooks)/use-animate-shop-icon';

type FeaturedCardProps = {
  locale: string;
  href: string;
  title: string;
  description: string;
  shopIcon: ReturnType<typeof useAnimateShopIcon>;
};

export function FeaturedCard({ locale, href, title, description, shopIcon }: FeaturedCardProps) {
  const { cardRef, imageRef, handleMouseMove, handleMouseLeave } = shopIcon;

  return (
    <Link
      ref={cardRef}
      href={makeUrlWithUserLocale(locale, href)}
      className={styles.shopCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.shopContent}>
        <h3 className={styles.shopTitle}>{title}</h3>
        <p className={styles.shopDescription}>{description}</p>
      </div>

      <div className={styles.shopImageFrame}>
        <div ref={imageRef} className={styles.shopImage}>
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
}
