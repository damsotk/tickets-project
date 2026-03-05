import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { AVAILABLE_LANGUAGES } from '@/constants/available_translations_language';

export function useLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = pathname.split('/')[1] || 'en';
  const currentLanguage =
    AVAILABLE_LANGUAGES.find((lang) => lang.code === currentLocale) || AVAILABLE_LANGUAGES[0];

  const changeLanguage = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLocale}${pathnameWithoutLocale || ''}`;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return {
    isOpen,
    dropdownRef,
    currentLocale,
    currentLanguage,
    changeLanguage,
    toggleDropdown,
  };
}
