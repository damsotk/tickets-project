import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type AuthUser = { id: string; role: string };

type TicketAccessResult<T> = { error: NextResponse; ticket: null } | { error: null; ticket: T };

export async function requireTicketAccess<T extends { userId: string }>(
  ticketId: string | null | undefined,
  user: AuthUser,
  select: Record<string, boolean>,
): Promise<TicketAccessResult<T>> {
  if (!ticketId) {
    return {
      error: NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 }),
      ticket: null,
    };
  }

  const ticket = (await prisma.ticket.findUnique({ where: { id: ticketId }, select })) as T | null;

  if (!ticket) {
    return {
      error: NextResponse.json({ error: 'Ticket not found' }, { status: 404 }),
      ticket: null,
    };
  }

  if (ticket.userId !== user.id && user.role !== 'ADMIN') {
    return { error: NextResponse.json({ error: 'Access denied' }, { status: 403 }), ticket: null };
  }

  return { error: null, ticket };
}
