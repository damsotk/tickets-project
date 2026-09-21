import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { UserClient } from '@/utils/api-client/user-client';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { NAME_CHANGE_COOLDOWN_MS } from '@/constants/user_name_rules';
import { validateUserName, getNextNameChangeAt } from '@/utils/validate-user-name';
import { formatDate } from '@/utils/format-date';

interface UseChangeNameOptions {
  name: string;
  nameChangedAt: Date | string | null | undefined;
  onSuccess: (name: string, nameChangedAt: string) => void;
}

export function useChangeName({ name, nameChangedAt, onSuccess }: UseChangeNameOptions) {
  const { translate } = useTranslation();
  const t = translate.profile.nameChange;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedDraft = draft.trim();

  const startEditing = useCallback(() => {
    const nextChangeAt = getNextNameChangeAt(nameChangedAt, NAME_CHANGE_COOLDOWN_MS);
    if (nextChangeAt) {
      toast.error(t.cooldown.replace('{date}', formatDate(nextChangeAt.toISOString())));
      return;
    }
    setDraft(name);
    setIsEditing(true);
  }, [name, nameChangedAt, t]);

  const cancelEditing = useCallback(() => {
    if (isConfirmOpen || isSubmitting) return;
    setIsEditing(false);
    setDraft(name);
  }, [isConfirmOpen, isSubmitting, name]);

  const requestConfirm = useCallback(() => {
    if (trimmedDraft === name) {
      setIsEditing(false);
      return;
    }

    const error = validateUserName(trimmedDraft);
    if (error) {
      toast.error(t.errors[error]);
      return;
    }

    setIsConfirmOpen(true);
  }, [trimmedDraft, name, t]);

  const closeConfirm = useCallback(() => {
    if (!isSubmitting) setIsConfirmOpen(false);
  }, [isSubmitting]);

  const confirmChange = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const data = await UserClient.changeName(trimmedDraft);
      onSuccess(data.user.name, data.user.nameChangedAt);
      toast.success(t.success);
      setIsConfirmOpen(false);
      setIsEditing(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  }, [trimmedDraft, onSuccess, t]);

  return {
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
  };
}
