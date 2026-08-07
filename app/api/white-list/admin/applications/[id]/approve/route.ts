import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/guards';
import { callWhitelistServer } from '@/lib/api/whitelist';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error, user } = await requireAdmin();
    if (error) return error;

    const { id } = await params;

    const application = await prisma.whitelistApplication.findUnique({ where: { id } });
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    if (application.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'The application has already been processed.' },
        { status: 400 },
      );
    }

    const result = await callWhitelistServer(
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: application.minecraftNick }),
      },
      'Failed to add player to server',
    );
    if (!result.ok) return result.response;

    const updated = await prisma.whitelistApplication.update({
      where: { id },
      data: { status: 'APPROVED', reviewedAt: new Date(), reviewedById: user!.id },
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
