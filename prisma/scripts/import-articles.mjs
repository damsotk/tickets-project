import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PrismaClient } from '@prisma/client';

const CATEGORIES = ['basic', 'characters', 'faith', 'cities'];
const contentDirectory = path.join(process.cwd(), 'library-content');

const prisma = new PrismaClient();

function parseDate(value, file) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(value ?? '').trim());
  if (!match) throw new Error(`${file}: invalid date "${value}", expected DD.MM.YYYY`);

  const [, day, month, year] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (date.getUTCDate() !== Number(day)) throw new Error(`${file}: invalid date "${value}"`);

  return date;
}

function requireString(data, key, file) {
  const value = data[key];
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${file}: missing "${key}"`);
  return value.trim();
}

function readArticles() {
  return CATEGORIES.flatMap((category) => {
    const categoryPath = path.join(contentDirectory, category);
    if (!fs.existsSync(categoryPath)) return [];

    return fs
      .readdirSync(categoryPath)
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const file = `${category}/${fileName}`;
        const { data, content } = matter(fs.readFileSync(path.join(categoryPath, fileName), 'utf-8'));

        if (data.category && data.category !== category) {
          throw new Error(`${file}: frontmatter category "${data.category}" does not match folder`);
        }

        return {
          slug: fileName.replace(/\.md$/, ''),
          category,
          title: requireString(data, 'title', file),
          preview: requireString(data, 'preview', file),
          author: requireString(data, 'author', file),
          date: parseDate(data.date, file),
          infobox: data.infobox ?? undefined,
          content: content.trim(),
        };
      });
  });
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const articles = readArticles();

  console.log(`Found ${articles.length} articles`);

  if (dryRun) {
    for (const a of articles) console.log(`  ${a.category}/${a.slug} — ${a.title}`);
    return;
  }

  for (const { category, slug, ...fields } of articles) {
    await prisma.article.upsert({
      where: { category_slug: { category, slug } },
      create: { category, slug, ...fields },
      update: fields,
    });
    console.log(`  ✓ ${category}/${slug}`);
  }

  console.log(`Imported ${articles.length} articles, total in DB: ${await prisma.article.count()}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
