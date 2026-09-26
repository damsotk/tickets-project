import { ArticleCategory } from '@/constants/available_article_categories';

interface ArticleEditorConfig {
  defaultImage: string | null;
  infoboxFields: readonly string[];
}

export const ARTICLE_EDITOR_CONFIG = {
  characters: {
    defaultImage: '/articles/characters/umbra.webp',
    infoboxFields: [
      'Статус',
      'Организация',
      'Место жительства',
      'Род занятий',
      'Раса',
      'Пол',
      'Религия',
      'Магические способности',
      'Черты',
      'Ближний круг',
    ],
  },
  cities: {
    defaultImage: null,
    infoboxFields: ['тип', 'макс. жителей', 'основан', 'глава', 'локация', 'план', 'сейчас'],
  },
  faith: {
    defaultImage: null,
    infoboxFields: ['Тип', 'Основан', 'Основатели', 'Место', 'Участники'],
  },
} as const satisfies Partial<Record<ArticleCategory, ArticleEditorConfig>>;

export type EditableArticleCategory = keyof typeof ARTICLE_EDITOR_CONFIG;

export function isEditableCategory(category: string): category is EditableArticleCategory {
  return Object.hasOwn(ARTICLE_EDITOR_CONFIG, category);
}

export const ARTICLE_LIMITS = {
  slug: 100,
  title: 200,
  preview: 300,
  author: 100,
  infoboxValue: 300,
  content: 100_000,
} as const;

export const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/;
