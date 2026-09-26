import { cache } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import { prisma } from '@/lib/prisma';
import { ArticleCategory } from '@/constants/available_article_categories';

export interface ArticleMetadata {
  slug: string;
  title: string;
  preview: string;
  date: string;
  author: string;
  category: ArticleCategory;
  infobox?: Record<string, string | string[]>;
}

export interface Article extends ArticleMetadata {
  content: string;
}

const metadataSelect = {
  slug: true,
  title: true,
  preview: true,
  date: true,
  author: true,
  category: true,
  infobox: true,
} as const;

type ArticleMetadataRow = {
  slug: string;
  title: string;
  preview: string;
  date: Date;
  author: string;
  category: string;
  infobox: unknown;
};

function formatDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getUTCFullYear()}`;
}

function toMetadata(row: ArticleMetadataRow): ArticleMetadata {
  return {
    slug: row.slug,
    title: row.title,
    preview: row.preview,
    date: formatDate(row.date),
    author: row.author,
    category: row.category as ArticleCategory,
    infobox: (row.infobox as ArticleMetadata['infobox']) ?? undefined,
  };
}

export async function getArticlesByCategory(category: ArticleCategory): Promise<ArticleMetadata[]> {
  const rows = await prisma.article.findMany({
    where: { category },
    select: metadataSelect,
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
  });

  return rows.map(toMetadata);
}

export const getArticleBySlug = cache(
  async (category: ArticleCategory, slug: string): Promise<Article | null> => {
    const row = await prisma.article.findUnique({
      where: { category_slug: { category, slug } },
      select: { ...metadataSelect, content: true },
    });

    if (!row) return null;

    const processedContent = await remark().use(html, { sanitize: false }).process(row.content);

    return {
      ...toMetadata(row),
      content: processedContent.toString(),
    };
  },
);
