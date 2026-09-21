'use client';

import { useState } from 'react';
import UserAvatar from '@/app/(components)/profile-page/UserAvatar';
import { useUserSearch } from '@/app/(hooks)/profile-page-hooks/use-user-search';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { formatShortId } from '@/utils/format-short-id';
import type { UserSearchResult } from '@/types/user';
import styles from '@/app/(styles)/profile-styles/transfer-coins.module.css';

interface RecipientSearchProps {
  selected: UserSearchResult | null;
  onSelect: (user: UserSearchResult | null) => void;
  disabled?: boolean;
}

export default function RecipientSearch({ selected, onSelect, disabled }: RecipientSearchProps) {
  const { translate } = useTranslation();
  const t = translate.profile.transfer;

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const { results, isLoading, isQueryValid } = useUserSearch(query, !selected);
  const showDropdown = isOpen && isQueryValid;

  const selectUser = (user: UserSearchResult) => {
    onSelect(user);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectUser(results[highlightedIndex] ?? results[0]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (selected) {
    return (
      <div className={styles.selectedRecipient}>
        <UserAvatar name={selected.name} avatar={selected.avatar} size={28} />
        <span className={styles.recipientName}>{selected.name}</span>
        <span className={styles.recipientId}>{formatShortId(selected.id)}</span>
        <button
          type="button"
          className={styles.clearRecipient}
          onClick={() => onSelect(null)}
          disabled={disabled}
          aria-label={t.search.clear}
          title={t.search.clear}
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightedIndex(0);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        placeholder={t.recipientPlaceholder}
        maxLength={100}
        disabled={disabled}
        autoComplete="off"
      />

      {showDropdown && (
        <ul className={styles.dropdown} role="listbox">
          {isLoading && results.length === 0 && (
            <li className={styles.dropdownHint}>{t.search.loading}</li>
          )}

          {!isLoading && results.length === 0 && (
            <li className={styles.dropdownHint}>{t.search.noResults}</li>
          )}

          {results.map((user, index) => (
            <li
              key={user.id}
              role="option"
              aria-selected={index === highlightedIndex}
              className={`${styles.dropdownItem} ${
                index === highlightedIndex ? styles.dropdownItemActive : ''
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                selectUser(user);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <UserAvatar name={user.name} avatar={user.avatar} size={28} />
              <span className={styles.recipientName}>{user.name}</span>
              <span className={styles.recipientId}>{formatShortId(user.id)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
