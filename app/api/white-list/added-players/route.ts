import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const res = await fetch(`${process.env.SERVER_API_FOR_WHITE_LIST}`, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: 'Error to connect Elium server' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ players: data.players ?? [], state: data.state ?? false });
  } catch {
    return NextResponse.json({ error: 'Error to connect Elium server' }, { status: 502 });
  }
}
