'use client';
import styles from '@/app/(styles)/articles-styles/articles-page.module.css';
import LoreCategoryCarousel from '@/app/(components)/article-page/main-page/LoreCategoryCarousel';
import { useState } from 'react';
import ArticlesList from '@/app/(components)/article-page/main-page/ArticlesList';
import { ArticleMetadata } from '@/lib/articles';
import { ArticleCategory, ARTICLE_CATEGORIES } from '@/constants/available_article_categories';

interface ArticlesPageClientProps {
  initialArticles: Record<ArticleCategory, ArticleMetadata[]>;
}

export default function ArticlesPageClient({ initialArticles }: ArticlesPageClientProps) {
  const [currentCategory, setCurrentCategory] = useState<ArticleCategory>(ARTICLE_CATEGORIES[0].id);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <LoreCategoryCarousel
          currentCategory={currentCategory}
          onCurrentCategoryChange={setCurrentCategory}
        />
        <ArticlesList currentArticles={initialArticles[currentCategory]} />
      </div>
    </div>
  );
}
