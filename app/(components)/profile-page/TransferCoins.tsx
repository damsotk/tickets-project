'use client';

import Image from 'next/image';
import { useTransferCoins } from '@/app/(hooks)/profile-page-hooks/use-transfer-coins';
import { useTranslation } from '@/app/(hooks)/use-translation';
import styles from '@/app/(styles)/profile-styles/transfer-coins.module.css';

interface TransferCoinsProps {
  userId: string;
  balance: number;
  onTransferred: (newBalance: number) => void;
}

export default function TransferCoins({ userId, balance, onTransferred }: TransferCoinsProps) {
  const { translate } = useTranslation();
  const t = translate.profile.transfer;

  const {
    recipientId,
    amount,
    parsedAmount,
    trimmedRecipientId,
    isConfirmOpen,
    isSubmitting,
    setRecipientId,
    setAmount,
    openConfirm,
    closeConfirm,
    confirmTransfer,
  } = useTransferCoins({ userId, balance, onSuccess: onTransferred });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openConfirm();
  };

  return (
    <div className={styles.transferSection}>
      <h2 className={styles.transferTitle}>{t.title}</h2>

      <form className={styles.transferForm} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t.recipientLabel}</span>
          <input
            className={styles.input}
            type="text"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            placeholder={t.recipientPlaceholder}
            maxLength={50}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t.amountLabel}</span>
          <input
            className={styles.input}
            type="number"
            inputMode="numeric"
            min={1}
            max={balance}
            step={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t.amountPlaceholder}
          />
        </label>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {t.submit}
        </button>
      </form>

      {isConfirmOpen && (
        <div className={styles.modalOverlay} onClick={closeConfirm}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{t.confirm.title}</h3>

            <div className={styles.confirmDetails}>
              <div className={styles.confirmRow}>
                <span className={styles.fieldLabel}>{t.confirm.amount}</span>
                <span className={styles.confirmAmount}>
                  {parsedAmount.toLocaleString('en-US')}
                  <Image src="/icons/custom_gold_ingot.png" alt="" width={18} height={18} />
                </span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.fieldLabel}>{t.confirm.recipient}</span>
                <span className={styles.confirmValue}>{trimmedRecipientId}</span>
              </div>
            </div>

            <p className={styles.confirmWarning}>{t.confirm.warning}</p>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={closeConfirm}
                disabled={isSubmitting}
              >
                {t.confirm.cancel}
              </button>
              <button
                type="button"
                className={styles.submitButton}
                onClick={confirmTransfer}
                disabled={isSubmitting}
              >
                {isSubmitting ? t.confirm.sending : t.confirm.submit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
