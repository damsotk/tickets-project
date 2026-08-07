import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, checkRateLimit } from '@/lib/api/guards';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'tickets');
    if (limitError) return limitError;

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
      where: { userId: user!.id, status: 'PENDING' },
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
        userId: user!.id,
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
    const { error, user } = await requireAuth();
    if (error) return error;

    const application = await prisma.whitelistApplication.findFirst({
      where: { userId: user!.id },
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
