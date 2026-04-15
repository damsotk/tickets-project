import ArticlesPageClient from '@/app/(components)/article-page/main-page/ArticlesPageClient';
import { getArticlesByCategory } from '@/lib/articles';

export default function ArticlesPageServer() {
  const initialArticles = {
    basic: getArticlesByCategory('basic'),
    characters: getArticlesByCategory('characters'),
    faith: getArticlesByCategory('faith'),
    cities: getArticlesByCategory('cities'),
  };

  return <ArticlesPageClient initialArticles={initialArticles} />;
}
