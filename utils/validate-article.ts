import {
  ARTICLE_EDITOR_CONFIG,
  ARTICLE_LIMITS,
  ARTICLE_SLUG_PATTERN,
  EditableArticleCategory,
  isEditableCategory,
} from '@/constants/article_editor';

export interface ArticleDraft {
  category: EditableArticleCategory;
  slug: string;
  title: string;
  preview: string;
  author: string;
  infobox: Record<string, string>;
  content: string;
}

export type ArticleDraftError =
  | 'invalidCategory'
  | 'titleRequired'
  | 'titleTooLong'
  | 'previewRequired'
  | 'previewTooLong'
  | 'authorRequired'
  | 'authorTooLong'
  | 'slugInvalid'
  | 'slugTooLong'
  | 'infoboxInvalid'
  | 'infoboxValueTooLong'
  | 'contentRequired'
  | 'contentTooLong';

export function validateArticleDraft(draft: ArticleDraft): ArticleDraftError | null {
  if (!isEditableCategory(draft.category)) return 'invalidCategory';

  if (!draft.title.trim()) return 'titleRequired';
  if (draft.title.length > ARTICLE_LIMITS.title) return 'titleTooLong';

  if (!draft.preview.trim()) return 'previewRequired';
  if (draft.preview.length > ARTICLE_LIMITS.preview) return 'previewTooLong';

  if (!draft.author.trim()) return 'authorRequired';
  if (draft.author.length > ARTICLE_LIMITS.author) return 'authorTooLong';

  if (draft.slug.length > ARTICLE_LIMITS.slug) return 'slugTooLong';
  if (!ARTICLE_SLUG_PATTERN.test(draft.slug)) return 'slugInvalid';

  const allowedFields: readonly string[] = ARTICLE_EDITOR_CONFIG[draft.category].infoboxFields;
  for (const [key, value] of Object.entries(draft.infobox)) {
    if (!allowedFields.includes(key) || typeof value !== 'string') return 'infoboxInvalid';
    if (value.length > ARTICLE_LIMITS.infoboxValue) return 'infoboxValueTooLong';
  }

  if (!draft.content.trim()) return 'contentRequired';
  if (draft.content.length > ARTICLE_LIMITS.content) return 'contentTooLong';

  return null;
}

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  ґ: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  є: 'ye',
  ж: 'zh',
  з: 'z',
  и: 'i',
  і: 'i',
  ї: 'yi',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ў: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

export function slugifyTitle(title: string): string {
  return Array.from(title.toLowerCase())
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join('')
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, ARTICLE_LIMITS.slug)
    .replace(/_+$/, '');
}
