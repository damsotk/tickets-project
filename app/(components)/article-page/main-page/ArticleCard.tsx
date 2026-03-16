'use client';
import Link from 'next/link';
import styles from '@/app/(styles)/articles-styles/article-card.module.css';

interface Article {
  id: string;
  title: string;
  preview: string;
  date: string;
  author: string;
}

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link href={`/articles/${article.id}`} className={styles.card}>
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
