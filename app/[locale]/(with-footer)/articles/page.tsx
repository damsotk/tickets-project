import ArticlesPageClient from '@/app/(components)/article-page/main-page/ArticlesPageClient';
import { getArticlesByCategory } from '@/lib/articles';
import { ARTICLE_CATEGORIES, ArticleCategory } from '@/constants/available_article_categories';
import { ArticleMetadata } from '@/lib/articles';

export default function ArticlesPageServer() {
  const initialArticles = Object.fromEntries(
    ARTICLE_CATEGORIES.map(({ id }) => [id, getArticlesByCategory(id)]),
  ) as Record<ArticleCategory, ArticleMetadata[]>;

  return <ArticlesPageClient initialArticles={initialArticles} />;
}
