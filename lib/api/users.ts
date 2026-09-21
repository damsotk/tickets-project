import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NAME_CHANGE_COOLDOWN_MS } from '@/constants/user_name_rules';
import { getNextNameChangeAt } from '@/utils/validate-user-name';

type ChangedName = { name: string; nameChangedAt: Date | null };

type ChangeNameResult = { error: NextResponse; user: null } | { error: null; user: ChangedName };

function cooldownError(nextChangeAt: Date) {
  return NextResponse.json(
    { error: 'Name can only be changed once a week', nextChangeAt },
    { status: 429 },
  );
}

export async function changeUserName(userId: string, name: string): Promise<ChangeNameResult> {
  const current = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, nameChangedAt: true },
  });

  if (!current) {
    return { error: NextResponse.json({ error: 'User not found' }, { status: 404 }), user: null };
  }

  if (current.name === name) {
    return {
      error: NextResponse.json(
        { error: 'New name must differ from the current one' },
        { status: 400 },
      ),
      user: null,
    };
  }

  const nextChangeAt = getNextNameChangeAt(current.nameChangedAt, NAME_CHANGE_COOLDOWN_MS);
  if (nextChangeAt) return { error: cooldownError(nextChangeAt), user: null };

  const now = new Date();
  const cutoff = new Date(now.getTime() - NAME_CHANGE_COOLDOWN_MS);

  const { count } = await prisma.user.updateMany({
    where: {
      id: userId,
      OR: [{ nameChangedAt: null }, { nameChangedAt: { lte: cutoff } }],
    },
    data: { name, nameChangedAt: now },
  });

  if (count === 0) {
    const latest = await prisma.user.findUnique({
      where: { id: userId },
      select: { nameChangedAt: true },
    });
    const latestNextChangeAt =
      getNextNameChangeAt(latest?.nameChangedAt, NAME_CHANGE_COOLDOWN_MS) ??
      new Date(now.getTime() + NAME_CHANGE_COOLDOWN_MS);
    return { error: cooldownError(latestNextChangeAt), user: null };
  }

  return { error: null, user: { name, nameChangedAt: now } };
}
