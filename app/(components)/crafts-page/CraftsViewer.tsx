'use client';

import { useMemo, useState } from 'react';
import type { Recipe } from '@/constants/server_recipes';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { CraftCircle } from './CraftCircle';
import { IngredientVisual } from './IngredientVisual';
import styles from '@/app/(styles)/crafts-styles/craft-viewer.module.css';

interface CraftsViewerProps {
  recipes: Recipe[];
}

export function CraftsViewer({ recipes }: CraftsViewerProps) {
  const [activeId, setActiveId] = useState(recipes[0].id);
  const active = recipes.find((r) => r.id === activeId) ?? recipes[0];

  const { translate } = useTranslation();
  const t = translate.crafts;

  const recipeIdByIngredientId = useMemo(() => {
    const map: Record<string, string> = {};
    for (const recipe of recipes) {
      map[recipe.result.id] = recipe.id;
    }
    return map;
  }, [recipes]);

  const resultName = t.ingredients[active.result.id as keyof typeof t.ingredients];
  const description = t.recipes[active.id as keyof typeof t.recipes]?.description;

  return (
    <div className={styles.viewer}>
      <div className={styles.circleArea}>
        <CraftCircle
          recipe={active}
          recipeIdByIngredientId={recipeIdByIngredientId}
          onNavigate={setActiveId}
        />
        <p className={styles.resultName}>{resultName}</p>
        {description && <p className={styles.recipeDescription}>{description}</p>}
      </div>

      <div className={styles.listArea}>
        <p className={styles.listLabel}>рецепты</p>
        <div className={styles.list}>
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              className={`${styles.recipeBtn} ${recipe.id === activeId ? styles.recipeBtnActive : ''}`}
              onClick={() => setActiveId(recipe.id)}
            >
              <IngredientVisual
                ingredient={recipe.result}
                size={32}
                className={styles.recipeBtnImage}
              />
              <span className={styles.recipeBtnName}>
                {t.ingredients[recipe.result.id as keyof typeof t.ingredients]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
