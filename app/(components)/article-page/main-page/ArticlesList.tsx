'use client';
import { ArticleMetadata } from '@/lib/articles';
import ArticleCard from './ArticleCard';
import styles from '@/app/(styles)/articles-styles/article-list.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

interface ArticleListProps {
  currentArticles: ArticleMetadata[];
}

export default function ArticlesList({ currentArticles }: ArticleListProps) {
  const { translate } = useTranslation();
  const translated = translate.articles.articlesList;
  return (
    <div className={styles.articlesContainer}>
      <h3 className={styles.sectionTitle}>{translated.title}</h3>

      <div className={styles.articlesGrid}>
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => <ArticleCard key={article.slug} article={article} />)
        ) : (
          <p>{translated.noArticles}</p>
        )}
      </div>
    </div>
  );
}
