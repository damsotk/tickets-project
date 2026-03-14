import { useMemo } from 'react';
import { ARTICLE_CATEGORIES } from '@/constants/available_article_categories';

type CategoryId = 'characters' | 'faith' | 'cities';

interface UseCategoryNavigationProps {
  currentCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}

interface UseCategoryNavigationReturn {
  currentIndex: number;
  activeCategory: {
    id: CategoryId;
    title: string;
    description: string;
    iconPath: string;
  };
  handleNext: () => void;
  handlePrev: () => void;
  totalCategories: number;
}

export function useCategoryNavigation({
  currentCategory,
  onCategoryChange,
}: UseCategoryNavigationProps): UseCategoryNavigationReturn {
  const currentIndex = ARTICLE_CATEGORIES.findIndex((cat) => cat.id === currentCategory);

  const activeCategory = useMemo(() => {
    return ARTICLE_CATEGORIES[currentIndex] || ARTICLE_CATEGORIES[0];
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = currentIndex === ARTICLE_CATEGORIES.length - 1 ? 0 : currentIndex + 1;
    onCategoryChange(ARTICLE_CATEGORIES[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? ARTICLE_CATEGORIES.length - 1 : currentIndex - 1;
    onCategoryChange(ARTICLE_CATEGORIES[prevIndex].id);
  };

  return {
    currentIndex,
    activeCategory,
    handleNext,
    handlePrev,
    totalCategories: ARTICLE_CATEGORIES.length,
  };
}
