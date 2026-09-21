import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { TransferClient } from '@/utils/api-client/transfer-client';
import { useTranslation } from '@/app/(hooks)/use-translation';

const MIN_TRANSFER_AMOUNT = 1;

interface UseTransferCoinsOptions {
  userId: string;
  balance: number;
  onSuccess: (newBalance: number) => void;
}

export function useTransferCoins({ userId, balance, onSuccess }: UseTransferCoinsOptions) {
  const { translate } = useTranslation();
  const t = translate.profile.transfer;

  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedAmount = Number(amount);
  const trimmedRecipientId = recipientId.trim();

  const validate = useCallback((): string | null => {
    if (!trimmedRecipientId) return t.errors.recipientRequired;
    if (trimmedRecipientId === userId) return t.errors.selfTransfer;
    if (!Number.isInteger(parsedAmount) || parsedAmount < MIN_TRANSFER_AMOUNT) {
      return t.errors.invalidAmount;
    }
    if (parsedAmount > balance) return t.errors.insufficientFunds;
    return null;
  }, [trimmedRecipientId, userId, parsedAmount, balance, t]);

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
    setIsSubmitting(true);
    try {
      const data = await TransferClient.transferCoins(trimmedRecipientId, parsedAmount);
      onSuccess(data.balance);
      toast.success(t.success);
      setRecipientId('');
      setAmount('');
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  }, [trimmedRecipientId, parsedAmount, onSuccess, t]);

  return {
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
  };
}
