'use client';
import { Editor, useEditorState } from '@tiptap/react';
import styles from '@/app/(styles)/articles-styles/article-editor.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

interface EditorToolbarProps {
  editor: Editor;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const { translate } = useTranslation();
  const t = translate.articles.editor;

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      heading1: e.isActive('heading', { level: 1 }),
      heading2: e.isActive('heading', { level: 2 }),
      heading3: e.isActive('heading', { level: 3 }),
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      bulletList: e.isActive('bulletList'),
      orderedList: e.isActive('orderedList'),
      blockquote: e.isActive('blockquote'),
      link: e.isActive('link'),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href ?? '';
    const url = window.prompt(t.linkPrompt, previousUrl);
    if (url === null) return;

    const chain = editor.chain().focus().extendMarkRange('link');
    if (url.trim()) chain.setLink({ href: url.trim() }).run();
    else chain.unsetLink().run();
  };

  const buttons = [
    {
      key: 'heading1',
      label: 'H1',
      active: state.heading1,
      run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      key: 'heading2',
      label: 'H2',
      active: state.heading2,
      run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      key: 'heading3',
      label: 'H3',
      active: state.heading3,
      run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      key: 'bold',
      label: <strong>B</strong>,
      active: state.bold,
      run: () => editor.chain().focus().toggleBold().run(),
    },
    {
      key: 'italic',
      label: <em>I</em>,
      active: state.italic,
      run: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      key: 'bulletList',
      label: '•',
      active: state.bulletList,
      run: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      key: 'orderedList',
      label: '1.',
      active: state.orderedList,
      run: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      key: 'blockquote',
      label: '❝',
      active: state.blockquote,
      run: () => editor.chain().focus().toggleBlockquote().run(),
    },
    { key: 'link', label: '🔗', active: state.link, run: toggleLink },
  ] as const;

  return (
    <div className={styles.toolbar} role="toolbar">
      {buttons.map(({ key, label, active, run }) => (
        <button
          key={key}
          type="button"
          className={`${styles.toolbarButton} ${active ? styles.toolbarButtonActive : ''}`}
          onClick={run}
          title={t.toolbar[key]}
          aria-label={t.toolbar[key]}
          aria-pressed={active}
        >
          {label}
        </button>
      ))}

      <span className={styles.toolbarDivider} />

      <button
        type="button"
        className={styles.toolbarButton}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!state.canUndo}
        title={t.toolbar.undo}
        aria-label={t.toolbar.undo}
      >
        ↶
      </button>
      <button
        type="button"
        className={styles.toolbarButton}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!state.canRedo}
        title={t.toolbar.redo}
        aria-label={t.toolbar.redo}
      >
        ↷
      </button>
    </div>
  );
}
