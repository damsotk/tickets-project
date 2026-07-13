'use client';

import Image from 'next/image';
import styles from '@/app/(styles)/shop-styles/site-shop.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

interface ShopItem {
  key: string;
  price: number;
  isFrom?: boolean;
}

const shopItems: ShopItem[] = [
  { key: 'createTwink', price: 400 },
  { key: 'addSchematic', price: 1000, isFrom: true },
  { key: 'customMechanic', price: 3000 },
  { key: 'flightAbility', price: 800 },
  { key: 'reduceBan', price: 600 },
  { key: 'escapeKant', price: 3000 },
];

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default function DonateShop() {
  const { translate } = useTranslation();
  const t = translate.shop;

  return (
    <div className={styles.container}>
      <div className={styles.heroBanner}>
        <Image
          src="/ellium-tickets-images/shop_background.png"
          alt=""
          fill
          priority
          className={styles.heroBannerImage}
        />
        <div className={styles.heroBannerFade} />
        <div className={styles.heroBannerContent}>
          <h1 className={styles.heroTitle}>{t.title}</h1>
          <p className={styles.heroSubtitle}>{t.subtitle}</p>
        </div>
      </div>

      <div className={styles.grid}>
        {shopItems.map((item) => {
          const itemT = t.items[item.key as keyof typeof t.items];

          return (
            <div key={item.key} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.priceTag}>
                  {item.isFrom && <span className={styles.priceFrom}>{t.from}</span>}
                  <span className={styles.priceValue}>{formatPrice(item.price)}</span>
                  <Image
                    src="/icons/custom_gold_ingot.png"
                    alt="currency"
                    width={20}
                    height={20}
                    className={styles.currencyIcon}
                  />
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.itemTitle}>{itemT.name}</h3>
                <p className={styles.itemDescription}>{itemT.description}</p>
              </div>

              <div className={styles.badgeSlot}>
                {itemT.badge && <span className={styles.badge}>{itemT.badge}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.notice}>
        <p className={styles.noticeText}>{t.notice}</p>
      </div>
    </div>
  );
}
