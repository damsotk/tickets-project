import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rateLimiters } from '@/lib/rate-limit';

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

    const body = await request.json();
    const { source, rpExperience, plans, minecraftNick, discordNick } = body;

    const errors: Record<string, string> = {};

    if (!source?.trim()) errors.source = 'required';
    if (!rpExperience?.trim()) errors.rpExperience = 'required';
    if (!minecraftNick?.trim()) errors.minecraftNick = 'required';
    if (!discordNick?.trim()) errors.discordNick = 'required';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    const existingApplication = await prisma.whitelistApplication.findFirst({
      where: {
        userId: user.id,
        status: 'PENDING',
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You already have a pending application' },
        { status: 409 },
      );
    }

    const application = await prisma.whitelistApplication.create({
      data: {
        source: source.trim(),
        rpExperience: rpExperience.trim(),
        plans: plans?.trim() || null,
        minecraftNick: minecraftNick.trim(),
        discordNick: discordNick.trim(),
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        application: {
          id: application.id,
          source: application.source,
          rpExperience: application.rpExperience,
          plans: application.plans,
          minecraftNick: application.minecraftNick,
          discordNick: application.discordNick,
          status: application.status,
          createdAt: application.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Whitelist POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const application = await prisma.whitelistApplication.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        source: true,
        rpExperience: true,
        plans: true,
        minecraftNick: true,
        discordNick: true,
        status: true,
        reviewComment: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error('Whitelist GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
