import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';
import styles from '@/app/(styles)/articles-styles/single-article-page.module.css';
import { notFound } from 'next/navigation';
import ArticleContent from '@/app/(components)/article-page/single-article/ArticleContent';
import ArticleInfobox from '@/app/(components)/article-page/single-article/ArticleInfobox';

interface ArticlePageProps {
  params: Promise<{
    locale: string;
    category: 'basic' | 'characters' | 'faith' | 'cities';
    slug: string;
  }>;
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
  const { category, slug } = await params;
  const article = await getArticleBySlug(category, slug);

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
  const { category, slug } = await params;
  const article = await getArticleBySlug(category, slug);

  if (!article) {
    notFound();
  }

  const isBasic = article.category === 'basic';

  return (
    <div className={styles.pageWrapper}>
      <div className={isBasic ? styles.articleLayoutFull : styles.articleLayout}>
        <ArticleContent article={article} isBasic={isBasic} />
        {!isBasic && <ArticleInfobox article={article} />}
      </div>
    </div>
  );
}
