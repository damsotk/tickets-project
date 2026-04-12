import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reviewedById, reviewComment } = body;

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

    const updated = await prisma.whitelistApplication.update({
      where: { id },
      data: {
        status: 'REJECTED',
        reviewedAt: new Date(),
        reviewedById: reviewedById ?? null,
        reviewComment: reviewComment ?? null,
      },
    });

    return NextResponse.json({
      message: `Application of ${application.minecraftNick} user declinied`,
      application: updated,
    });
  } catch (err) {
    console.error('Failed to reject application:', err);
    return NextResponse.json({ error: 'Error rejecting application' }, { status: 500 });
  }
}
