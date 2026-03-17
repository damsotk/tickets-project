import { Article } from '@/lib/articles';
import Image from 'next/image';
import styles from '@/app/(styles)/articles-styles/article-infobox.module.css';

interface ArticleInfobox {
  article: Article;
}

export default function ArticleInfobox({ article }: ArticleInfobox) {
  if (!article.infobox) {
    return null;
  }

  const { infobox } = article;

  return (
    <aside className={styles.infobox}>
      {infobox.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={infobox.image as string}
            alt={article.title}
            width={350}
            height={350}
            className={styles.image}
            priority
          />
        </div>
      )}

      <h2 className={styles.title}>{article.title}</h2>

      <dl className={styles.infoList}>
        {Object.entries(infobox)
          .filter(([key]) => key !== 'image')
          .map(([key, value]) => (
            <div key={key} className={styles.infoItem}>
              <dt className={styles.label}>{key}</dt>
              <dd className={styles.value}>{Array.isArray(value) ? value.join(', ') : value}</dd>
            </div>
          ))}
      </dl>
    </aside>
  );
}
