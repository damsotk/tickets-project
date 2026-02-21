'use client';
import { usePathname, useRouter } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLocale}${pathnameWithoutLocale || ''}`;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.push(newPath);
  };
  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <div className={styles.switcher}>
      <button
        onClick={() => changeLanguage('en')}
        className={currentLocale === 'en' ? styles.active : ''}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('uk')}
        className={currentLocale === 'uk' ? styles.active : ''}
      >
        UK
      </button>
    </div>
  );
}
