import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { category } = body;

    const validCategories = ['complaint', 'lore', 'tech'];

    if (!category || !validCategories.includes(category.toLowerCase())) {
      return NextResponse.json({ error: 'Invalid ticket category' }, { status: 400 });
    }

    const categoryEnum = category.toUpperCase() as 'COMPLAINT' | 'LORE' | 'TECH';

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existingTicket = await prisma.ticket.findFirst({
      where: {
        userId: user.id,
        category: categoryEnum,
        status: {
          not: 'CLOSED',
        },
      },
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        createdAt: true,
      },
    });

    if (existingTicket) {
      return NextResponse.json(
        {
          error: 'Ticket already exists',
          message: `You already have an open ticket in the "${category}" category. Please close it before creating a new one.`,
          existingTicket: {
            id: existingTicket.id,
            title: existingTicket.title,
            category: existingTicket.category,
            status: existingTicket.status,
            createdAt: existingTicket.createdAt,
          },
        },
        { status: 409 },
      );
    }

    const ticket = await prisma.ticket.create({
      data: {
        title: `${user.name} ticket`,
        category: categoryEnum,
        userId: user.id,
      },
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
