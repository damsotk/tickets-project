'use client';
import styles from '@/app/(styles)/articles-styles/articles-page.module.css';
import LoreCategoryCarousel from '@/app/(components)/article-page/LoreCategoryCarousel';
import { useState } from 'react';
import Header from '@/app/(components)/main-page/Header';

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<'characters' | 'faith' | 'cities'>(
    'characters',
  );

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Libary of Knowledge</h1>

        <LoreCategoryCarousel
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
    </div>
  );
}
