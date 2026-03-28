import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rateLimiters } from '@/lib/rate-limit';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { success } = await rateLimiters.tickets.limit(payload.userId);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existingTicket = await prisma.ticket.findUnique({
      where: { id: id },
      select: {
        id: true,
        userId: true,
        status: true,
      },
    });

    if (!existingTicket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    if (existingTicket.status === 'CLOSED') {
      return NextResponse.json({ error: 'Ticket already closed' }, { status: 400 });
    }

    if (existingTicket.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You do not have permission to close this ticket' },
        { status: 403 },
      );
    }

    const ticket = await prisma.ticket.update({
      where: { id: id },
      data: {
        status: 'CLOSED',
        closedAt: new Date(),
        closedById: user.id,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        closedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        ticket: {
          id: ticket.id,
          title: ticket.title,
          category: ticket.category,
          status: ticket.status,
          closedAt: ticket.closedAt,
          closedBy: ticket.closedBy,
          createdAt: ticket.createdAt,
          updatedAt: ticket.updatedAt,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error closing ticket:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
