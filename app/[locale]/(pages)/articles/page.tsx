'use client';
import styles from '@/app/(styles)/articles-styles/articles-page.module.css';
import LoreCategoryCarousel from '@/app/(components)/article-page/LoreCategoryCarousel';
import { useState } from 'react';
import Header from '@/app/(components)/main-page/Header';
import ArticlesList from '@/app/(components)/article-page/ArticlesList';

export default function ArticlesPage() {
  const [currentCategory, setCurrentCategory] = useState<'characters' | 'faith' | 'cities'>(
    'characters',
  );

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Libary of Knowledge</h1>

        <LoreCategoryCarousel
          currentCategory={currentCategory}
          onCurrentCategoryChange={setCurrentCategory}
        />

        <ArticlesList category={currentCategory} />
      </div>
    </div>
  );
}
