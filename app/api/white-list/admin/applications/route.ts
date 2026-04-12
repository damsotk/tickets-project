import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const applications = await prisma.whitelistApplication.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ applications });
  } catch (err) {
    console.error('Failed to fetch applications:', err);
    return NextResponse.json({ error: 'Failed to load applications' }, { status: 500 });
  }
}
