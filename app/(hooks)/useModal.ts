import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

interface UseModalOptions {
  redirectUrl?: string;
  checkAccess?: () => boolean;
}

interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export function useModal(initialState: boolean = false, options?: UseModalOptions): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState);
  const router = useRouter();

  const openModal = useCallback(() => {
    if (options?.redirectUrl && options?.checkAccess) {
      const isAccess = options.checkAccess();

      if (!isAccess) {
        router.push(options.redirectUrl);
        return;
      }
    }

    setIsOpen(true);
  }, [options, router]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, openModal, closeModal, toggleModal };
}
