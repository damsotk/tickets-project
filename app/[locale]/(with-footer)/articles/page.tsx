import ArticlesPageClient from '@/app/(components)/article-page/main-page/ArticlesPageClient';
import { getArticlesByCategory } from '@/lib/articles';
import { ARTICLE_CATEGORIES, ArticleCategory } from '@/constants/available_article_categories';
import { ArticleMetadata } from '@/lib/articles';

export const dynamic = 'force-dynamic';

export default async function ArticlesPageServer() {
  const entries = await Promise.all(
    ARTICLE_CATEGORIES.map(async ({ id }) => [id, await getArticlesByCategory(id)] as const),
  );
  const initialArticles = Object.fromEntries(entries) as Record<ArticleCategory, ArticleMetadata[]>;

  return <ArticlesPageClient initialArticles={initialArticles} />;
}
