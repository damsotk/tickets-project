import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { Markdown } from '@tiptap/markdown';
import useUser from '@/contexts/UserContext';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { ArticleClient } from '@/utils/api-client/article-client';
import { ARTICLE_EDITOR_CONFIG, EditableArticleCategory } from '@/constants/article_editor';
import { ArticleDraft, slugifyTitle, validateArticleDraft } from '@/utils/validate-article';
import { makeUrlWithUserLocale } from '@/utils/make-url-with-user-locale';

function formatToday(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${now.getFullYear()}`;
}

export function useArticleEditor(category: EditableArticleCategory, contentClassName: string) {
  const router = useRouter();
  const { user } = useUser();
  const { translate, locale } = useTranslation();
  const t = translate.articles.editor;
  const config = ARTICLE_EDITOR_CONFIG[category];

  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [author, setAuthor] = useState(user?.name ?? '');
  const [customSlug, setCustomSlug] = useState<string | null>(null);
  const [infobox, setInfobox] = useState<Record<string, string>>(() =>
    Object.fromEntries(config.infoboxFields.map((field) => [field, ''])),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slug = customSlug ?? slugifyTitle(title);
  const date = useMemo(formatToday, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        code: false,
        codeBlock: false,
        strike: false,
        underline: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Placeholder.configure({ placeholder: t.contentPlaceholder }),
      Markdown,
    ],
    editorProps: {
      attributes: { class: contentClassName },
    },
  });

  const setInfoboxField = useCallback((field: string, value: string) => {
    setInfobox((prev) => ({ ...prev, [field]: value }));
  }, []);

  const submit = useCallback(async () => {
    if (!editor || isSubmitting) return;

    const draft: ArticleDraft = {
      category,
      slug,
      title,
      preview,
      author,
      infobox,
      content: editor.isEmpty ? '' : editor.getMarkdown(),
    };

    const error = validateArticleDraft(draft);
    if (error) {
      toast.error(t.errors[error]);
      return;
    }

    setIsSubmitting(true);
    try {
      const { article } = await ArticleClient.createArticle(draft);
      toast.success(t.success);
      router.push(makeUrlWithUserLocale(locale, `/articles/${article.category}/${article.slug}`));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.errors.generic);
      setIsSubmitting(false);
    }
  }, [editor, isSubmitting, category, slug, title, preview, author, infobox, t, router, locale]);

  return {
    editor,
    config,
    date,
    title,
    preview,
    author,
    slug,
    infobox,
    isSubmitting,
    setTitle,
    setPreview,
    setAuthor,
    setSlug: setCustomSlug,
    setInfoboxField,
    submit,
  };
}
