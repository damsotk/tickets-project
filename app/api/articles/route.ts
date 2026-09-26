import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, checkRateLimit } from '@/lib/api/guards';
import { createArticle } from '@/lib/api/articles';
import { ARTICLE_EDITOR_CONFIG, ARTICLE_LIMITS } from '@/constants/article_editor';
import { ArticleDraft, ArticleDraftError, validateArticleDraft } from '@/utils/validate-article';

const ARTICLE_ERROR_MESSAGES: Record<ArticleDraftError, string> = {
  invalidCategory: 'Articles cannot be created in this category',
  titleRequired: 'Title is required',
  titleTooLong: `Title must be at most ${ARTICLE_LIMITS.title} characters`,
  previewRequired: 'Preview is required',
  previewTooLong: `Preview must be at most ${ARTICLE_LIMITS.preview} characters`,
  authorRequired: 'Author is required',
  authorTooLong: `Author must be at most ${ARTICLE_LIMITS.author} characters`,
  slugInvalid: 'Address may contain only latin letters, digits, "_" and "-"',
  slugTooLong: `Address must be at most ${ARTICLE_LIMITS.slug} characters`,
  infoboxInvalid: 'Infobox contains unknown fields',
  infoboxValueTooLong: `Infobox values must be at most ${ARTICLE_LIMITS.infoboxValue} characters`,
  contentRequired: 'Article text is required',
  contentTooLong: `Article text must be at most ${ARTICLE_LIMITS.content} characters`,
};

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === 'string')
  );
}

export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAdmin();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'articles');
    if (limitError) return limitError;

    const body = await request.json();
    const { category, slug, title, preview, author, infobox, content } = body ?? {};

    if (
      [category, slug, title, preview, author, content].some((v) => typeof v !== 'string') ||
      !isStringRecord(infobox)
    ) {
      return NextResponse.json({ error: 'Invalid article payload' }, { status: 400 });
    }

    const draft: ArticleDraft = { category, slug, title, preview, author, infobox, content };

    const draftError = validateArticleDraft(draft);
    if (draftError) {
      return NextResponse.json({ error: ARTICLE_ERROR_MESSAGES[draftError] }, { status: 400 });
    }

    const { error: createError, article } = await createArticle(
      draft,
      ARTICLE_EDITOR_CONFIG[draft.category].defaultImage,
    );
    if (createError) return createError;

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
