import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, checkRateLimit } from '@/lib/api/guards';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'tickets');
    if (limitError) return limitError;

    const { category } = await request.json();
    const validCategories = ['complaint', 'lore', 'tech'];

    if (!category || !validCategories.includes(category.toLowerCase())) {
      return NextResponse.json({ error: 'Invalid ticket category' }, { status: 400 });
    }

    const categoryEnum = category.toUpperCase() as 'COMPLAINT' | 'LORE' | 'TECH';

    const dbUser = await prisma.user.findUnique({
      where: { id: user!.id },
      select: { id: true, name: true },
    });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existingTicket = await prisma.ticket.findFirst({
      where: { userId: dbUser.id, category: categoryEnum, status: { not: 'CLOSED' } },
      select: { id: true, title: true, category: true, status: true, createdAt: true },
    });

    if (existingTicket) {
      return NextResponse.json(
        {
          error: 'Ticket already exists',
          message: `You already have an open ticket in the "${category}" category. Please close it before creating a new one.`,
          existingTicket,
        },
        { status: 409 },
      );
    }

    const ticket = await prisma.ticket.create({
      data: { title: `${dbUser.name} ticket`, category: categoryEnum, userId: dbUser.id },
    });

    return NextResponse.json(
      {
        success: true,
        ticket: {
          id: ticket.id,
          title: ticket.title,
          category: ticket.category,
          createdAt: ticket.createdAt,
          updatedAt: ticket.updatedAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
