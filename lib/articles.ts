import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface ArticleMetadata {
  slug: string;
  title: string;
  preview: string;
  date: string;
  author: string;
  category: 'characters' | 'faith' | 'cities';
  infobox?: Record<string, string | string[]>;
}

export interface Article extends ArticleMetadata {
  content: string;
}

const contentDirectory = path.join(process.cwd(), 'library-content');

export function getArticlesByCategory(
  category: 'characters' | 'faith' | 'cities',
): ArticleMetadata[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoryPath);

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf-8');

      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title,
        preview: data.preview,
        date: data.date,
        author: data.author,
        category: data.category,
        infobox: data.infobox,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export function getAllArticleSlugs(): { category: string; slug: string }[] {
  const categories = ['characters', 'faith', 'cities'];
  const slugs: { category: string; slug: string }[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(contentDirectory, category);

    if (fs.existsSync(categoryPath)) {
      const fileNames = fs.readdirSync(categoryPath);

      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .forEach((fileName) => {
          slugs.push({ category, slug: fileName.replace(/\.md$/, '') });
        });
    }
  });

  return slugs;
}

export async function getArticleBySlug(
  category: 'characters' | 'faith' | 'cities',
  slug: string,
): Promise<Article | null> {
  try {
    const fullPath = path.join(contentDirectory, category, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html, { sanitize: false }).process(content);

    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      preview: data.preview,
      date: data.date,
      author: data.author,
      category: data.category || category,
      infobox: data.infobox,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error loading article ${category}/${slug}:`, error);
    return null;
  }
}
