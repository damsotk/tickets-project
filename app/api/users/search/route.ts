import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, checkRateLimit } from '@/lib/api/guards';
import { prisma } from '@/lib/prisma';

const MIN_QUERY_LENGTH = 3;
const MAX_QUERY_LENGTH = 100;
const MAX_RESULTS = 8;

export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'userSearch');
    if (limitError) return limitError;

    const query = request.nextUrl.searchParams.get('q')?.trim() ?? '';

    if (query.length < MIN_QUERY_LENGTH || query.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        {
          error: `Query must be between ${MIN_QUERY_LENGTH} and ${MAX_QUERY_LENGTH} characters`,
        },
        { status: 400 },
      );
    }

    const users = await prisma.user.findMany({
      where: {
        id: { not: user!.id },
        OR: [{ name: { contains: query, mode: 'insensitive' } }, { id: query }],
      },
      select: { id: true, name: true, avatar: true },
      orderBy: { name: 'asc' },
      take: MAX_RESULTS,
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
