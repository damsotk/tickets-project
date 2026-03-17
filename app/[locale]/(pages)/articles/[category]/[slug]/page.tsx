import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';
import styles from '@/app/(styles)/articles-styles/single-article-page.module.css';
import { notFound } from 'next/navigation';
import ArticleContent from '@/app/(components)/article-page/single-article/ArticleContent';
import ArticleInfobox from '@/app/(components)/article-page/single-article/ArticleInfobox';
import Header from '@/app/(components)/main-page/Header';

interface ArticlePageProps {
  params: {
    locale: string;
    category: 'characters' | 'faith' | 'cities';
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  const locales = ['en', 'uk', 'by', 'ru'];

  return slugs.flatMap((item) =>
    locales.map((locale) => ({
      locale,
      category: item.category,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.category, params.slug);

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
  const article = await getArticleBySlug(params.category, params.slug);

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
