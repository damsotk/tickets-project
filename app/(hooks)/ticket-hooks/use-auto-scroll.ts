import { useEffect, useRef, useCallback } from 'react';
import { Message } from '@/types/message';

interface UseMessengerScrollOptions {
  messages: Message[];
  isLoading: boolean;
}

export function useAutoScroll({ messages, isLoading }: UseMessengerScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    endRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      scrollToBottom('smooth');
    }
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      scrollToBottom('auto');
    }
  }, [isLoading]);

  const scrollAfterSend = useCallback(() => {
    setTimeout(() => scrollToBottom('smooth'), 100);
  }, [scrollToBottom]);

  return {
    containerRef,
    endRef,
    scrollToBottom,
    scrollAfterSend,
  };
}
