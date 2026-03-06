import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Ticket } from '@/types/tickets';

export async function getTicketsCurrentUser(): Promise<Ticket[] | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  const payload = verifyAccessToken(accessToken);
  if (!payload) {
    return null;
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: payload.userId,
    },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      status: true,
    },
  });

  return tickets.map((ticket) => ({
    ...ticket,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  }));
}

export async function getAllTicketsForAdmin(): Promise<Ticket[] | null> {
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
    select: { role: true },
  });

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const tickets = await prisma.ticket.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      status: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return tickets.map((ticket) => ({
    ...ticket,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  }));
}
