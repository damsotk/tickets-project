'use client';

import type { ReactNode } from 'react';
import styles from '@/app/(styles)/profile-styles/transfer-coins.module.css';

interface ConfirmModalProps {
  title: string;
  children: ReactNode;
  warning?: string;
  cancelLabel: string;
  confirmLabel: string;
  sendingLabel: string;
  isSubmitting: boolean;
  onConfirm: () => void;
  onClose: () => void;
  variant?: 'gold' | 'neutral';
}

export default function ConfirmModal({
  title,
  children,
  warning,
  cancelLabel,
  confirmLabel,
  sendingLabel,
  isSubmitting,
  onConfirm,
  onClose,
  variant = 'gold',
}: ConfirmModalProps) {
  const isNeutral = variant === 'neutral';

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${isNeutral ? styles.modalNeutral : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.modalTitle}>{title}</h3>

        {children}

        {warning && <p className={styles.confirmWarning}>{warning}</p>}

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`${styles.submitButton} ${isNeutral ? styles.confirmButtonNeutral : ''}`}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? sendingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
