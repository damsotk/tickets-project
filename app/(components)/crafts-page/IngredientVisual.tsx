'use client';

import Image from 'next/image';
import type { Ingredient } from '@/constants/server_recipes';

interface IngredientVisualProps {
  ingredient: Ingredient;
  size: number;
  className?: string;
}

export function IngredientVisual({ ingredient, size, className }: IngredientVisualProps) {
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
