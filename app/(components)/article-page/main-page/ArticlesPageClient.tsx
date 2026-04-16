'use client';
import styles from '@/app/(styles)/articles-styles/articles-page.module.css';
import LoreCategoryCarousel from '@/app/(components)/article-page/main-page/LoreCategoryCarousel';
import { useState } from 'react';
import ArticlesList from '@/app/(components)/article-page/main-page/ArticlesList';
import { ArticleMetadata } from '@/lib/articles';

interface ArticlesPageClientProps {
  initialArticles: {
    basic: ArticleMetadata[];
    characters: ArticleMetadata[];
    faith: ArticleMetadata[];
    cities: ArticleMetadata[];
  };
}

export default function ArticlesPageClient({ initialArticles }: ArticlesPageClientProps) {
  const [currentCategory, setCurrentCategory] = useState<
    'basic' | 'characters' | 'faith' | 'cities'
  >('basic');

  const currentArticles = initialArticles[currentCategory];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <LoreCategoryCarousel
          currentCategory={currentCategory}
          onCurrentCategoryChange={setCurrentCategory}
        />

        <ArticlesList currentArticles={currentArticles} />
      </div>
    </div>
  );
}
