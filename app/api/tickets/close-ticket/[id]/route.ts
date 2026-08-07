import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, checkRateLimit } from '@/lib/api/guards';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const { error, user } = await requireAuth();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'tickets');
    if (limitError) return limitError;

    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
      select: { id: true, userId: true, status: true },
    });

    if (!existingTicket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    if (existingTicket.status === 'CLOSED') {
      return NextResponse.json({ error: 'Ticket already closed' }, { status: 400 });
    }

    if (existingTicket.userId !== user!.id && user!.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You do not have permission to close this ticket' },
        { status: 403 },
      );
    }

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status: 'CLOSED', closedAt: new Date(), closedById: user!.id, updatedAt: new Date() },
      include: {
        user: { select: { id: true, name: true, email: true } },
        closedBy: { select: { id: true, name: true } },
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
