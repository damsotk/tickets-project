import { useEffect, useRef } from 'react';

interface UseAutoScrollOptions {
  dependencies?: any[];
  enabled?: boolean;
}

export function useAutoScroll({ dependencies = [], enabled = true }: UseAutoScrollOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (!enabled) return;
    endRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (enabled && dependencies.length > 0) {
      scrollToBottom('smooth');
    }
  }, dependencies);

  return {
    containerRef,
    endRef,
    scrollToBottom,
  };
}
