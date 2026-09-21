'use client';

import Image from 'next/image';
import RecipientSearch from '@/app/(components)/profile-page/RecipientSearch';
import UserAvatar from '@/app/(components)/profile-page/UserAvatar';
import { useTransferCoins } from '@/app/(hooks)/profile-page-hooks/use-transfer-coins';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { formatShortId } from '@/utils/format-short-id';
import styles from '@/app/(styles)/profile-styles/transfer-coins.module.css';

interface TransferCoinsProps {
  balance: number;
  onTransferred: (newBalance: number) => void;
}

export default function TransferCoins({ balance, onTransferred }: TransferCoinsProps) {
  const { translate } = useTranslation();
  const t = translate.profile.transfer;

  const {
    recipient,
    amount,
    parsedAmount,
    isOverBalance,
    isConfirmOpen,
    isSubmitting,
    setRecipient,
    setAmount,
    openConfirm,
    closeConfirm,
    confirmTransfer,
  } = useTransferCoins({ balance, onSuccess: onTransferred });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openConfirm();
  };

  return (
    <div className={styles.transferSection}>
      <h2 className={styles.transferTitle}>{t.title}</h2>

      <form className={styles.transferForm} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>{t.recipientLabel}</span>
          <RecipientSearch selected={recipient} onSelect={setRecipient} disabled={isSubmitting} />
        </div>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t.amountLabel}</span>
          <input
            className={`${styles.input} ${isOverBalance ? styles.inputError : ''}`}
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t.amountPlaceholder}
            aria-invalid={isOverBalance}
          />
          {isOverBalance && (
            <span className={styles.fieldError} role="alert">
              {t.errors.insufficientFunds}
            </span>
          )}
        </label>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || isOverBalance}
        >
          {t.submit}
        </button>
      </form>

      {isConfirmOpen && recipient && (
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
                <span className={styles.confirmRecipient}>
                  <UserAvatar name={recipient.name} avatar={recipient.avatar} size={32} />
                  <span className={styles.recipientName}>{recipient.name}</span>
                  <span className={styles.recipientId}>{formatShortId(recipient.id)}</span>
                </span>
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
