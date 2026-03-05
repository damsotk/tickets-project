'use client';
import styles from '@/app/(styles)/header.module.css';
import { useLanguageSwitcher } from '../(hooks)/use-language-switcher';
import { AVAILABLE_LANGUAGES } from '@/constants/available_translations_language';

export default function LanguageSwitcher() {
  const { isOpen, dropdownRef, currentLocale, currentLanguage, changeLanguage, toggleDropdown } =
    useLanguageSwitcher();

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.triggerButton}
        onClick={() => toggleDropdown()}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={styles.languageCode}>{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span>Select Language</span>
          </div>
          <div className={styles.languageList}>
            {AVAILABLE_LANGUAGES.map((language) => (
              <button
                key={language.code}
                className={`${styles.languageItem} ${
                  currentLocale === language.code ? styles.active : ''
                }`}
                onClick={() => changeLanguage(language.code)}
              >
                <span className={styles.languageName}>{language.name}</span>
                {currentLocale === language.code && (
                  <svg
                    className={styles.checkmark}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
