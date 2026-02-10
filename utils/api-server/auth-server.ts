import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { User } from '@/types/user';

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  const payload = verifyAccessToken(accessToken);
  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      role: true,
    },
  });

  return user;
}
