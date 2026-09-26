import { notFound } from 'next/navigation';
import ArticleEditor from '@/app/(components)/article-page/editor/ArticleEditor';
import { isEditableCategory } from '@/constants/article_editor';

interface NewArticlePageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export default async function NewArticlePage({ params }: NewArticlePageProps) {
  const { category } = await params;
  if (!isEditableCategory(category)) notFound();

  return <ArticleEditor category={category} />;
}
