'use client';

import Image from 'next/image';
import styles from '@/app/(styles)/shop-styles/site-shop.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

interface ShopItem {
  key: string;
  price: number;
  icon: string;
  color: 'gold' | 'purple' | 'red' | 'blue' | 'green';
  isFrom?: boolean;
}

const shopItems: ShopItem[] = [
  { key: 'createTwink', price: 400, icon: '👤', color: 'blue' },
  { key: 'addSchematic', price: 1000, icon: '📐', color: 'purple', isFrom: true },
  { key: 'customMechanic', price: 3000, icon: '⚙️', color: 'red' },
  { key: 'flightAbility', price: 800, icon: '🕊️', color: 'green' },
  { key: 'reduceBan', price: 600, icon: '🔓', color: 'gold' },
  { key: 'escapeKant', price: 3000, icon: '🏃', color: 'red' },
];

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default function DonateShop() {
  const { translate } = useTranslation();
  const t = translate.shop;

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroIconWrapper}>
          <Image
            src="/icons/custom_gold_ingot.png"
            alt="Gold Ingot"
            width={64}
            height={64}
            className={styles.heroIcon}
          />
        </div>
        <h1 className={styles.heroTitle}>{t.title}</h1>
        <p className={styles.heroSubtitle}>{t.subtitle}</p>
      </div>
      <div className={styles.grid}>
        {shopItems.map((item) => {
          const itemT = t.items[item.key as keyof typeof t.items];

          return (
            <div key={item.key} className={`${styles.card} ${styles[item.color]}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{item.icon}</span>
                </div>
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

              {itemT.badge && <div className={styles.badge}>{itemT.badge}</div>}
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
