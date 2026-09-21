import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { TransferClient } from '@/utils/api-client/transfer-client';
import { useTranslation } from '@/app/(hooks)/use-translation';
import type { UserSearchResult } from '@/types/user';

const MIN_TRANSFER_AMOUNT = 1;

interface UseTransferCoinsOptions {
  balance: number;
  onSuccess: (newBalance: number) => void;
}

export function useTransferCoins({ balance, onSuccess }: UseTransferCoinsOptions) {
  const { translate } = useTranslation();
  const t = translate.profile.transfer;

  const [recipient, setRecipient] = useState<UserSearchResult | null>(null);
  const [amount, setAmount] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedAmount = Number(amount);
  const isOverBalance = amount !== '' && parsedAmount > balance;

  const validate = useCallback((): string | null => {
    if (!recipient) return t.errors.recipientRequired;
    if (!Number.isInteger(parsedAmount) || parsedAmount < MIN_TRANSFER_AMOUNT) {
      return t.errors.invalidAmount;
    }
    if (isOverBalance) return t.errors.insufficientFunds;
    return null;
  }, [recipient, parsedAmount, isOverBalance, t]);

  const openConfirm = useCallback(() => {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setIsConfirmOpen(true);
  }, [validate]);

  const closeConfirm = useCallback(() => {
    if (!isSubmitting) setIsConfirmOpen(false);
  }, [isSubmitting]);

  const confirmTransfer = useCallback(async () => {
    if (!recipient) return;

    setIsSubmitting(true);
    try {
      const data = await TransferClient.transferCoins(recipient.id, parsedAmount);
      onSuccess(data.balance);
      toast.success(t.success);
      setRecipient(null);
      setAmount('');
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  }, [recipient, parsedAmount, onSuccess, t]);

  return {
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
  };
}
