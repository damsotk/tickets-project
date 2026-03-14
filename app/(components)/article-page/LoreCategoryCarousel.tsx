'use client';
import Image from 'next/image';
import styles from '@/app/(styles)/articles-styles/lore-category-carousel.module.css';
import { ARTICLE_CATEGORIES } from '@/constants/available_article_categories';
import { useCategoryNavigation } from '@/app/(hooks)/articles-page-hooks/use-change-category';

interface LoreCategoryCarouselProps {
  currentCategory: 'characters' | 'faith' | 'cities';
  onCurrentCategoryChange: (category: 'characters' | 'faith' | 'cities') => void;
}

export default function LoreCategoryCarousel({
  currentCategory,
  onCurrentCategoryChange,
}: LoreCategoryCarouselProps) {
  const { currentIndex, activeCategory, handleNext, handlePrev } = useCategoryNavigation({
    currentCategory,
    onCategoryChange: onCurrentCategoryChange,
  });

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={handlePrev} aria-label="Previous category">
        ‹
      </button>

      <div className={styles.categoryCard}>
        <div className={styles.cardContent}>
          <div className={styles.textSection}>
            <h2 className={styles.categoryTitle}>{activeCategory.title}</h2>
            <p className={styles.categoryDescription}>{activeCategory.description}</p>
          </div>

          <div className={styles.iconSection}>
            <Image
              src={activeCategory.iconPath}
              alt={activeCategory.title}
              width={120}
              height={120}
              className={styles.categoryIcon}
            />
          </div>
        </div>

        <div className={styles.indicators}>
          {ARTICLE_CATEGORIES.map((_, index) => (
            <span
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>

      <button className={styles.navButton} onClick={handleNext} aria-label="Next category">
        ›
      </button>
    </div>
  );
}
