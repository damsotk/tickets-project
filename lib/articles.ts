import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
