import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rateLimiters } from '@/lib/rate-limit';

type AuthUser = { id: string; role: string };

type AuthResult = { error: NextResponse; user: null } | { error: null; user: AuthUser };

async function resolveUser(): Promise<AuthResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
      user: null,
    };
  }

  const payload = verifyAccessToken(accessToken);
  if (!payload) {
    return { error: NextResponse.json({ error: 'Invalid token' }, { status: 401 }), user: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, role: true },
  });

  if (!user) {
    return { error: NextResponse.json({ error: 'User not found' }, { status: 404 }), user: null };
  }

  return { error: null, user };
}

export async function requireAuth(): Promise<AuthResult> {
  return resolveUser();
}

export async function requireAdmin(): Promise<AuthResult> {
  const result = await resolveUser();
  if (result.error) return result;

  if (result.user.role !== 'ADMIN') {
    return {
      error: NextResponse.json({ error: 'Admin access required' }, { status: 403 }),
      user: null,
    };
  }

  return result;
}

export async function checkRateLimit(
  userId: string,
  limiterKey: keyof typeof rateLimiters,
): Promise<NextResponse | null> {
  const { success } = await rateLimiters[limiterKey].limit(userId);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }
  return null;
}

export function isIpRateLimited(
  request: Request,
  limiterKey: keyof typeof rateLimiters,
): Promise<boolean> {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  return rateLimiters[limiterKey].limit(ip).then(({ success }) => !success);
}
