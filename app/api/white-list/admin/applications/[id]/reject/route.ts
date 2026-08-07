import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/guards';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error, user } = await requireAdmin();
    if (error) return error;

    const { id } = await params;
    const { reviewComment } = await request.json();

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

    const updated = await prisma.whitelistApplication.update({
      where: { id },
      data: {
        status: 'REJECTED',
        reviewedAt: new Date(),
        reviewedById: user!.id,
        reviewComment: reviewComment ?? null,
      },
    });

    return NextResponse.json({
      message: `Application of ${application.minecraftNick} user declined`,
      application: updated,
    });
  } catch (err) {
    console.error('Failed to reject application:', err);
    return NextResponse.json({ error: 'Error rejecting application' }, { status: 500 });
  }
}
