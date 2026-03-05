import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/(hooks)/use-translation';
import useUser from '@/contexts/UserContext';
import { logout } from '@/app/(actions)/auth-actions';

export function useHeader() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { translate, locale } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    closeMobileMenu();
    router.refresh();
  };

  const handleLogin = () => {
    closeMobileMenu();
    router.push(`/${locale}/auth`);
  };

  const handleTicketsClick = () => {
    closeMobileMenu();
    router.push(`/${locale}/tickets`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return {
    user,
    translated: translate.home.header,
    isMobileMenuOpen,
    mobileMenuRef,
    handleLogout,
    handleLogin,
    handleTicketsClick,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
