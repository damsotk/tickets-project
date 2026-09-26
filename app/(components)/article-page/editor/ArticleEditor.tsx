'use client';
import Link from 'next/link';
import { EditorContent } from '@tiptap/react';
import pageStyles from '@/app/(styles)/articles-styles/single-article-page.module.css';
import contentStyles from '@/app/(styles)/articles-styles/article-content.module.css';
import styles from '@/app/(styles)/articles-styles/article-editor.module.css';
import EditorToolbar from '@/app/(components)/article-page/editor/EditorToolbar';
import InfoboxEditor from '@/app/(components)/article-page/editor/InfoboxEditor';
import { useArticleEditor } from '@/app/(hooks)/articles-page-hooks/use-article-editor';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { EditableArticleCategory, ARTICLE_LIMITS } from '@/constants/article_editor';
import { makeUrlWithUserLocale } from '@/utils/make-url-with-user-locale';

interface ArticleEditorProps {
  category: EditableArticleCategory;
}

export default function ArticleEditor({ category }: ArticleEditorProps) {
  const { translate, locale } = useTranslation();
  const t = translate.articles.editor;

  const editorState = useArticleEditor(category, `${contentStyles.content} ${styles.editorArea}`);
  const { editor, config, isSubmitting } = editorState;

  return (
    <div className={pageStyles.pageWrapper}>
      <div className={styles.actionsBar}>
        <label className={styles.slugField}>
          <span className={styles.slugLabel}>{t.slugLabel}</span>
          <span className={styles.slugPrefix}>/articles/{category}/</span>
          <input
            className={`${styles.plainInput} ${styles.slugInput}`}
            value={editorState.slug}
            maxLength={ARTICLE_LIMITS.slug}
            onChange={(e) => editorState.setSlug(e.target.value.toLowerCase())}
            spellCheck={false}
          />
        </label>

        <div className={styles.actions}>
          <Link href={makeUrlWithUserLocale(locale, '/articles')} className={styles.cancelButton}>
            {t.cancel}
          </Link>
          <button
            type="button"
            className={styles.saveButton}
            onClick={editorState.submit}
            disabled={!editor || isSubmitting}
          >
            {isSubmitting ? t.saving : t.save}
          </button>
        </div>
      </div>

      <div className={pageStyles.articleLayout}>
        <article className={contentStyles.contentWrapper}>
          <nav className={contentStyles.breadcrumbs}>
            <span>Library</span>
            <span className={contentStyles.separator}>›</span>
            <span className={contentStyles.category}>{category}</span>
          </nav>

          <input
            className={`${contentStyles.title} ${styles.plainInput} ${styles.titleInput}`}
            value={editorState.title}
            maxLength={ARTICLE_LIMITS.title}
            placeholder={t.titlePlaceholder}
            onChange={(e) => editorState.setTitle(e.target.value)}
          />

          <div className={contentStyles.metadata}>
            <span className={contentStyles.author}>
              By{' '}
              <input
                className={`${styles.plainInput} ${styles.authorInput}`}
                value={editorState.author}
                maxLength={ARTICLE_LIMITS.author}
                placeholder={t.authorPlaceholder}
                onChange={(e) => editorState.setAuthor(e.target.value)}
                size={Math.max(editorState.author.length, t.authorPlaceholder.length, 4)}
              />
            </span>
            <span className={contentStyles.separator}>•</span>
            <time className={contentStyles.date}>{editorState.date}</time>
          </div>

          <textarea
            className={`${styles.plainInput} ${styles.previewInput}`}
            value={editorState.preview}
            maxLength={ARTICLE_LIMITS.preview}
            placeholder={t.previewPlaceholder}
            rows={2}
            onChange={(e) => editorState.setPreview(e.target.value)}
          />

          {editor && <EditorToolbar editor={editor} />}
          <EditorContent editor={editor} />
        </article>

        <InfoboxEditor
          title={editorState.title}
          image={config.defaultImage}
          fields={config.infoboxFields}
          values={editorState.infobox}
          onChange={editorState.setInfoboxField}
        />
      </div>
    </div>
  );
}
