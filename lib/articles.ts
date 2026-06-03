import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { ARTICLE_CATEGORIES, ArticleCategory } from '@/constants/available_article_categories';

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

const contentDirectory = path.join(process.cwd(), 'library-content');

export function getArticlesByCategory(category: ArticleCategory): ArticleMetadata[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) return [];

  return fs
    .readdirSync(categoryPath)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(path.join(categoryPath, fileName), 'utf-8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        preview: data.preview,
        date: data.date,
        author: data.author,
        category: data.category as ArticleCategory,
        infobox: data.infobox,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllArticleSlugs(): { category: ArticleCategory; slug: string }[] {
  return ARTICLE_CATEGORIES.flatMap(({ id }) => {
    const categoryPath = path.join(contentDirectory, id);
    if (!fs.existsSync(categoryPath)) return [];

    return fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith('.md'))
      .map((f) => ({ category: id, slug: f.replace(/\.md$/, '') }));
  });
}

export async function getArticleBySlug(
  category: ArticleCategory,
  slug: string,
): Promise<Article | null> {
  try {
    const fullPath = path.join(contentDirectory, category, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html, { sanitize: false }).process(content);

    return {
      slug,
      title: data.title,
      preview: data.preview,
      date: data.date,
      author: data.author,
      category: (data.category ?? category) as ArticleCategory,
      infobox: data.infobox,
      content: processedContent.toString(),
    };
  } catch (error) {
    console.error(`Error loading article ${category}/${slug}:`, error);
    return null;
  }
}

export function getAllArticles(): ArticleMetadata[] {
  return ARTICLE_CATEGORIES.flatMap(({ id }) => getArticlesByCategory(id)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
