'use client';
import Image from 'next/image';
import infoboxStyles from '@/app/(styles)/articles-styles/article-infobox.module.css';
import styles from '@/app/(styles)/articles-styles/article-editor.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

interface InfoboxEditorProps {
  title: string;
  image: string | null;
  fields: readonly string[];
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export default function InfoboxEditor({
  title,
  image,
  fields,
  values,
  onChange,
}: InfoboxEditorProps) {
  const { translate } = useTranslation();
  const t = translate.articles.editor;

  return (
    <aside className={infoboxStyles.infobox}>
      {image && (
        <div className={infoboxStyles.imageWrapper}>
          <Image
            src={image}
            alt={title}
            width={350}
            height={350}
            className={infoboxStyles.image}
            priority
          />
        </div>
      )}

      <h2 className={`${infoboxStyles.title} ${title ? '' : styles.placeholderText}`}>
        {title || t.titlePlaceholder}
      </h2>

      <dl className={infoboxStyles.infoList}>
        {fields.map((field, index) => (
          <div key={field} className={infoboxStyles.infoItem}>
            <dt className={infoboxStyles.label}>
              <label htmlFor={`infobox-field-${index}`}>{field}</label>
            </dt>
            <dd className={infoboxStyles.value}>
              <textarea
                id={`infobox-field-${index}`}
                className={`${styles.plainInput} ${styles.infoboxInput}`}
                rows={1}
                value={values[field] ?? ''}
                placeholder={t.infoboxPlaceholder}
                onChange={(e) => onChange(field, e.target.value)}
              />
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
