import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';
import styles from '@/app/(styles)/articles-styles/single-article-page.module.css';
import { notFound } from 'next/navigation';
import Header from '@/app/(components)/main-page/Header';
import ArticleContent from '@/app/(components)/article-page/single-article/ArticleContent';
import ArticleInfobox from '@/app/(components)/article-page/single-article/ArticleInfobox';

interface ArticlePageProps {
  params: Promise<{
    locale: string;
    category: 'characters' | 'faith' | 'cities';
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();

  return slugs.map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.category, resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Library of Knowledge`,
    description: article.preview,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.category, resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <div className={styles.articleLayout}>
        <ArticleContent article={article} />

        <ArticleInfobox article={article} />
      </div>
    </div>
  );
}
