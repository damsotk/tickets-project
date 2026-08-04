'use client';

import Image from 'next/image';
import type { Ingredient } from '@/constants/server_recipes';
import { useTranslation } from '@/app/(hooks)/use-translation';

interface IngredientVisualProps {
  ingredient: Ingredient;
  size: number;
  className?: string;
}

export function IngredientVisual({ ingredient, size, className }: IngredientVisualProps) {
  const { translate } = useTranslation();
  const name =
    translate.crafts.ingredients[ingredient.id as keyof typeof translate.crafts.ingredients];

  return (
    <Image src={ingredient.texture} alt={name} width={size} height={size} className={className} />
  );
}
