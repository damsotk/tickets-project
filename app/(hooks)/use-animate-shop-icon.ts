'use client';

import { useRef, type MouseEvent } from 'react';

export function useAnimateShopIcon() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const moveX = x * 18;
    const moveY = y * 12;

    image.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;
    if (!image) return;
    image.style.transform = 'translate3d(0, 0, 0) scale(1)';
  };

  return { cardRef, imageRef, handleMouseMove, handleMouseLeave };
}
