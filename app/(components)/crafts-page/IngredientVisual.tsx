'use client';

import Image from 'next/image';
import type { Ingredient } from '@/constants/server_recipes';

interface IngredientVisualProps {
  ingredient: Ingredient;
  size: number;
  className?: string;
}

export function IngredientVisual({ ingredient, size, className }: IngredientVisualProps) {
  if (ingredient.texture) {
    return (
      <Image
        src={ingredient.texture}
        alt={ingredient.name}
        width={size}
        height={size}
        className={className}
      />
    );
  }

  return (
    <span
      className={className}
      role="img"
      aria-label={ingredient.name}
      style={{ fontSize: `${Math.round(size * 0.8)}px`, lineHeight: 1 }}
    >
      {ingredient.emoji}
    </span>
  );
}
