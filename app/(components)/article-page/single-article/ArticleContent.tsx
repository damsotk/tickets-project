import { Article } from '@/lib/articles';
import styles from '@/app/(styles)/articles-styles/article-content.module.css';
import Link from 'next/link';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className={styles.contentWrapper}>
      <nav className={styles.breadcrumbs}>
        <Link href="/articles">Library</Link>
        <span className={styles.separator}>›</span>
        <span className={styles.category}>{article.category}</span>
      </nav>

      <h1 className={styles.title}>{article.title}</h1>

      <div className={styles.metadata}>
        <span className={styles.author}>By {article.author}</span>
        <span className={styles.separator}>•</span>
        <time className={styles.date}>{article.date}</time>
      </div>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
