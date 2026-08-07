import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, checkRateLimit } from '@/lib/api/guards';
import { requireTicketAccess } from '@/lib/api/tickets';
import { prisma } from '@/lib/prisma';

const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 1;

export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'messages');
    if (limitError) return limitError;

    const { text, ticketId } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text must be a string' }, { status: 400 });
    }

    const trimmedText = text.trim();
    if (trimmedText.length < MIN_MESSAGE_LENGTH) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }
    if (trimmedText.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400 },
      );
    }

    const { error: ticketError, ticket } = await requireTicketAccess<{
      userId: string;
      status: string;
    }>(ticketId, user!, { userId: true, status: true });
    if (ticketError) return ticketError;

    if (ticket.status === 'CLOSED') {
      return NextResponse.json({ error: 'Cannot send message to closed ticket' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: { text, ticketId, authorId: user!.id },
      include: { author: { select: { id: true, name: true, avatar: true } } },
    });

    await prisma.ticket.update({ where: { id: ticketId }, data: { updatedAt: new Date() } });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
