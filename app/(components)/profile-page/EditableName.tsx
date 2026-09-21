'use client';

import { useRef } from 'react';
import ConfirmModal from '@/app/(components)/profile-page/ConfirmModal';
import { useChangeName } from '@/app/(hooks)/profile-page-hooks/use-change-name';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { MAX_NAME_LENGTH } from '@/constants/user_name_rules';
import styles from '@/app/(styles)/profile-styles/editable-name.module.css';

interface EditableNameProps {
  name: string;
  nameChangedAt: Date | string | null | undefined;
  className?: string;
  onChanged: (name: string, nameChangedAt: string) => void;
}

export default function EditableName({
  name,
  nameChangedAt,
  className,
  onChanged,
}: EditableNameProps) {
  const { translate } = useTranslation();
  const t = translate.profile.nameChange;
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isEditing,
    draft,
    trimmedDraft,
    isConfirmOpen,
    isSubmitting,
    setDraft,
    startEditing,
    cancelEditing,
    requestConfirm,
    closeConfirm,
    confirmChange,
  } = useChangeName({ name, nameChangedAt, onSuccess: onChanged });

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) cancelEditing();
  };

  const handleCloseConfirm = () => {
    closeConfirm();
    inputRef.current?.focus();
  };

  return (
    <>
      <h1 className={className}>
        {isEditing ? (
          <form
            className={styles.nameForm}
            onSubmit={(e) => {
              e.preventDefault();
              requestConfirm();
            }}
            onBlur={handleBlur}
          >
            <input
              ref={inputRef}
              className={styles.nameInput}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && cancelEditing()}
              maxLength={MAX_NAME_LENGTH}
              disabled={isSubmitting}
              autoFocus
              aria-label={t.inputLabel}
            />
            <button
              type="submit"
              className={styles.saveButton}
              onMouseDown={(e) => e.preventDefault()}
              disabled={isSubmitting}
              aria-label={t.save}
              title={t.save}
            >
              ✓
            </button>
          </form>
        ) : (
          <button
            type="button"
            className={styles.nameButton}
            onClick={startEditing}
            title={t.editHint}
          >
            {name}
            <span className={styles.editIcon} aria-hidden>
              ✎
            </span>
          </button>
        )}
      </h1>

      {isConfirmOpen && (
        <ConfirmModal
          title={t.confirm.title}
          warning={t.confirm.warning}
          cancelLabel={t.confirm.cancel}
          confirmLabel={t.confirm.submit}
          sendingLabel={t.confirm.sending}
          isSubmitting={isSubmitting}
          onConfirm={confirmChange}
          onClose={handleCloseConfirm}
          variant="neutral"
        >
          <p className={styles.confirmText}>
            {t.confirm.text} <span className={styles.confirmName}>{trimmedDraft}</span>?
          </p>
        </ConfirmModal>
      )}
    </>
  );
}
