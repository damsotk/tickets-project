'use client';
import Link from 'next/link';
import { ArticleMetadata } from '@/lib/articles';
import ArticleCard from './ArticleCard';
import styles from '@/app/(styles)/articles-styles/article-list.module.css';
import cardStyles from '@/app/(styles)/articles-styles/article-card.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import useUser from '@/contexts/UserContext';
import { ArticleCategory } from '@/constants/available_article_categories';
import { isEditableCategory } from '@/constants/article_editor';
import { makeUrlWithUserLocale } from '@/utils/make-url-with-user-locale';

interface ArticleListProps {
  category: ArticleCategory;
  currentArticles: ArticleMetadata[];
}

export default function ArticlesList({ category, currentArticles }: ArticleListProps) {
  const { translate, locale } = useTranslation();
  const { user } = useUser();
  const translated = translate.articles.articlesList;

  const canAddArticle = user?.role === 'ADMIN' && isEditableCategory(category);

  return (
    <div className={styles.articlesContainer}>
      <h3 className={styles.sectionTitle}>{translated.title}</h3>

      <div className={styles.articlesGrid}>
        {canAddArticle && (
          <Link
            href={makeUrlWithUserLocale(locale, `/admin/articles/${category}/new`)}
            className={`${cardStyles.card} ${cardStyles.addCard}`}
            aria-label={translated.addArticle}
            title={translated.addArticle}
          >
            <span className={cardStyles.addIcon}>+</span>
            <span className={cardStyles.addLabel}>{translated.addArticle}</span>
          </Link>
        )}

        {currentArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}

        {currentArticles.length === 0 && !canAddArticle && <p>{translated.noArticles}</p>}
      </div>
    </div>
  );
}
