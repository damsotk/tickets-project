import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ArticleDraft } from '@/utils/validate-article';

type CreatedArticle = { category: string; slug: string };

type CreateArticleResult =
  | { error: NextResponse; article: null }
  | { error: null; article: CreatedArticle };

function todayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function compactInfobox(infobox: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(infobox)
      .map(([key, value]) => [key, value.trim()] as const)
      .filter(([, value]) => value),
  );
}

export async function createArticle(
  draft: ArticleDraft,
  defaultImage: string | null,
): Promise<CreateArticleResult> {
  const infobox = {
    ...(defaultImage ? { image: defaultImage } : {}),
    ...compactInfobox(draft.infobox),
  };

  try {
    const article = await prisma.article.create({
      data: {
        category: draft.category,
        slug: draft.slug,
        title: draft.title.trim(),
        preview: draft.preview.trim(),
        author: draft.author.trim(),
        date: todayUtc(),
        infobox: Object.keys(infobox).length ? infobox : Prisma.DbNull,
        content: draft.content.trim(),
      },
      select: { category: true, slug: true },
    });

    return { error: null, article };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        error: NextResponse.json(
          { error: 'An article with this address already exists in this category' },
          { status: 409 },
        ),
        article: null,
      };
    }
    throw error;
  }
}
