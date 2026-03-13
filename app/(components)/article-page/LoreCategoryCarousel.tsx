'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/(styles)/articles-styles/lore-category-carousel.module.css';

interface Category {
  id: 'characters' | 'faith' | 'cities';
  title: string;
  description: string;
  iconPath: string;
}

const categories: Category[] = [
  {
    id: 'characters',
    title: 'Characters',
    description: 'Legends and heroes of our world',
    iconPath: '/icons/characters.png',
  },
  {
    id: 'faith',
    title: 'Faith',
    description: 'Gods, cults and sacred rituals',
    iconPath: '/icons/faith.png',
  },
  {
    id: 'cities',
    title: 'Cities',
    description: 'Great settlements and their history',
    iconPath: '/icons/cities.png',
  },
];

interface Props {
  activeCategory: 'characters' | 'faith' | 'cities';
  onCategoryChange: (category: 'characters' | 'faith' | 'cities') => void;
}

export default function LoreCategoryCarousel({ activeCategory, onCategoryChange }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = categories.findIndex((cat) => cat.id === activeCategory);
    if (index !== -1) setCurrentIndex(index);
  }, [activeCategory]);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onCategoryChange(categories[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onCategoryChange(categories[newIndex].id);
  };

  const currentCategory = categories[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={handlePrev} aria-label="Предыдущая категория">
        ‹
      </button>

      <div className={styles.categoryCard}>
        <div className={styles.cardContent}>
          <div className={styles.textSection}>
            <h2 className={styles.categoryTitle}>{currentCategory.title}</h2>
            <p className={styles.categoryDescription}>{currentCategory.description}</p>
          </div>

          <div className={styles.iconSection}>
            <Image
              src={currentCategory.iconPath}
              alt={currentCategory.title}
              width={120}
              height={120}
              className={styles.categoryIcon}
            />
          </div>
        </div>

        <div className={styles.indicators}>
          {categories.map((_, index) => (
            <span
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                onCategoryChange(categories[index].id);
              }}
            />
          ))}
        </div>
      </div>

      <button className={styles.navButton} onClick={handleNext} aria-label="Следующая категория">
        ›
      </button>
    </div>
  );
}
