'use client';
import { ArticleMetadata } from '@/lib/articles';
import ArticleCard from './ArticleCard';
import styles from '@/app/(styles)/articles-styles/article-list.module.css';

interface ArticleListProps {
  currentArticles: ArticleMetadata[];
}

export default function ArticlesList({ currentArticles }: ArticleListProps) {
  return (
    <div className={styles.articlesContainer}>
      <h3 className={styles.sectionTitle}>Articles of page</h3>

      <div className={styles.articlesGrid}>
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => <ArticleCard key={article.slug} article={article} />)
        ) : (
          <p>No articles found in this category.</p>
        )}
      </div>
    </div>
  );
}
