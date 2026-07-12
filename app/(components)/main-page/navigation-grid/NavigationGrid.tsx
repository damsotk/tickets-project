'use client';

import { useParams } from 'next/navigation';
import styles from '@/app/(styles)/navigation-grid.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { useAnimateShopIcon } from '@/app/(hooks)/use-animate-shop-icon';
import { NAVIGATION_ITEMS } from '@/constants/main_page';
import { FeaturedCard } from './FeaturedCard';
import { GroupedSection } from './GroupedSection';
import { SecondaryCard } from './SecondaryCard';

export default function NavigationGrid() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const { translate } = useTranslation();
  const translations = translate.home.navigatesButtons;
  const shopIcon = useAnimateShopIcon();

  const featuredItems = NAVIGATION_ITEMS.filter((item) => item.featured);
  const regularItems = NAVIGATION_ITEMS.filter(
    (item) => !item.featured && !('grouped' in item && item.grouped),
  );
  const groupedItems = NAVIGATION_ITEMS.filter((item) => 'grouped' in item && item.grouped);

  return (
    <section className={styles.container}>
      {featuredItems.map((item) => (
        <FeaturedCard
          key={item.id}
          locale={locale}
          href={item.href}
          title={translations[item.id].title}
          description={translations[item.id].description}
          shopIcon={shopIcon}
        />
      ))}

      <div className={styles.secondaryGrid}>
        {regularItems.map((item) => (
          <SecondaryCard
            key={item.id}
            locale={locale}
            href={item.href}
            title={translations[item.id].title}
            description={translations[item.id].description}
            image={'image' in item ? item.image : undefined}
          />
        ))}
      </div>

      <GroupedSection
        locale={locale}
        label={translations.moreSection.title}
        items={groupedItems.map((item) => ({
          id: item.id,
          href: item.href,
          title: translations[item.id].title,
          description: translations[item.id].description,
        }))}
      />
    </section>
  );
}
