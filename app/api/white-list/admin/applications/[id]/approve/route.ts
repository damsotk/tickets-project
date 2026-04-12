import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;

    const application = await prisma.whitelistApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'The application has already been processed.' },
        { status: 400 },
      );
    }

    const serverRes = await fetch(`${process.env.SERVER_API_FOR_WHITE_LIST}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: application.minecraftNick }),
    });

    if (!serverRes.ok) {
      const serverData = await serverRes.json();
      return NextResponse.json(
        { error: serverData.error ?? 'Failed to add player to server' },
        { status: serverRes.status },
      );
    }

    const updated = await prisma.whitelistApplication.update({
      where: { id },
      data: {
        status: 'APPROVED',
        reviewedAt: new Date(),
        reviewedById: user.id,
      },
    });

    return NextResponse.json({
      message: `Player ${application.minecraftNick} added to whitelist`,
      application: updated,
    });
  } catch (err) {
    console.error('Failed to approve application:', err);
    return NextResponse.json({ error: 'Error approving application' }, { status: 500 });
  }
}
