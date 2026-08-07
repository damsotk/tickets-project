import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/guards';
import { requireTicketAccess } from '@/lib/api/tickets';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const ticketId = searchParams.get('ticketId');

    const { error: ticketError } = await requireTicketAccess(ticketId, user!, { userId: true });
    if (ticketError) return ticketError;

    const messages = await prisma.message.findMany({
      where: { ticketId: ticketId! },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        text: true,
        authorId: true,
        createdAt: true,
        author: { select: { id: true, name: true, role: true } },
      },
    });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
