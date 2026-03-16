'use client';
import ArticleCard from './ArticleCard';
import styles from '@/app/(styles)/articles-styles/article-list.module.css';

interface Article {
  id: string;
  title: string;
  preview: string;
  date: string;
  author: string;
}
const articlesData: Record<'characters' | 'faith' | 'cities', Article[]> = {
  characters: [
    {
      id: '1',
      title: 'Eldric the Fiery',
      preview: 'Legendary mage, founder of the first magic academy...',
      date: '15.03.2024',
      author: 'Keeper of Knowledge',
    },
    {
      id: '2',
      title: 'Shadow Wanderer',
      preview: 'Mysterious hero whose name is forgotten by time...',
      date: '12.03.2024',
      author: 'Chronicler',
    },
  ],
  faith: [
    {
      id: '3',
      title: 'Cult of the Eternal Flame',
      preview: 'The oldest religion, worshiping the power of fire...',
      date: '10.03.2024',
      author: 'Priest',
    },
  ],
  cities: [
    {
      id: '4',
      title: 'Nordheim',
      preview: 'Northern capital, city of Vikings and warriors...',
      date: '08.03.2024',
      author: 'Cartographer',
    },
  ],
};

interface Props {
  category: 'characters' | 'faith' | 'cities';
}

export default function ArticlesList({ category }: Props) {
  const articles = articlesData[category];

  return (
    <div className={styles.articlesContainer}>
      <h3 className={styles.sectionTitle}>Articles of page</h3>

      <div className={styles.articlesGrid}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
