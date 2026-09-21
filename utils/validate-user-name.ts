import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from '@/constants/user_name_rules';

export type UserNameError = 'required' | 'tooShort' | 'tooLong' | 'spaces';

export function validateUserName(name: string): UserNameError | null {
  if (!name.trim()) return 'required';
  if (/\s/.test(name)) return 'spaces';
  if (name.length < MIN_NAME_LENGTH) return 'tooShort';
  if (name.length > MAX_NAME_LENGTH) return 'tooLong';
  return null;
}

export function getNextNameChangeAt(
  nameChangedAt: Date | string | null | undefined,
  cooldownMs: number,
): Date | null {
  if (!nameChangedAt) return null;
  const next = new Date(new Date(nameChangedAt).getTime() + cooldownMs);
  return next.getTime() > Date.now() ? next : null;
}
