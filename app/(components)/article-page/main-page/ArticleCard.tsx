'use client';
import Link from 'next/link';
import styles from '@/app/(styles)/articles-styles/article-card.module.css';
import { ArticleMetadata } from '@/lib/articles';

interface ArticleCardProps {
  article: ArticleMetadata;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.category}/${article.slug}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <h4 className={styles.articleTitle}>{article.title}</h4>
      </div>

      <p className={styles.articlePreview}>{article.preview}</p>

      <div className={styles.cardFooter}>
        <span className={styles.author}>{article.author}</span>
        <span className={styles.date}>{article.date}</span>
      </div>
    </Link>
  );
}
