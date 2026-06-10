'use client';

import { useState, useRef } from 'react';
import type { Recipe, Ingredient } from '@/constants/server_recipes';
import { IngredientVisual } from './IngredientVisual';
import styles from '@/app/(styles)/crafts-styles/craft-circle.module.css';

const SLOT_ANGLES_DEG = [270, 315, 0, 45, 90, 135, 180, 225];
const RADIUS = 96;

interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

interface SlotProps {
  ingredient: Ingredient;
  angle: number;
  onMouseEnter: (name: string, e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

function Slot({ ingredient, angle, onMouseEnter, onMouseMove, onMouseLeave }: SlotProps) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + (RADIUS / 2.2) * Math.cos(rad);
  const y = 50 + (RADIUS / 2.2) * Math.sin(rad);

  return (
    <div
      className={styles.slot}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={(e) => onMouseEnter(ingredient.name, e)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <IngredientVisual ingredient={ingredient} size={36} className={styles.slotImage} />
    </div>
  );
}

interface CraftCircleProps {
  recipe: Recipe;
}

export function CraftCircle({ recipe }: CraftCircleProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: '', x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  function showTooltip(name: string, e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      text: name,
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top - 32,
    });
  }

  function moveTooltip(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top - 32,
    }));
  }

  function hideTooltip() {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.circle}>
        {recipe.slots.map((ingredient, i) => (
          <Slot
            key={i}
            ingredient={ingredient}
            angle={SLOT_ANGLES_DEG[i]}
            onMouseEnter={showTooltip}
            onMouseMove={moveTooltip}
            onMouseLeave={hideTooltip}
          />
        ))}

        <div
          className={`${styles.slot} ${styles.centerSlot}`}
          onMouseEnter={(e) => showTooltip(recipe.result.name, e)}
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        >
          <IngredientVisual ingredient={recipe.result} size={40} className={styles.slotImage} />
        </div>
      </div>

      {tooltip.visible && (
        <div className={styles.tooltip} style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
