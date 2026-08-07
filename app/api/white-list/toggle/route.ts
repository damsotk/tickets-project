import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/guards';
import { callWhitelistServer, WhitelistMessageResponse } from '@/lib/api/whitelist';

export async function PUT(request: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { state } = await request.json();
    if (typeof state !== 'boolean') {
      return NextResponse.json({ error: 'You need send state (boolean)' }, { status: 400 });
    }

    const result = await callWhitelistServer<WhitelistMessageResponse>(
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      },
      'Error with on/off whitelist',
    );
    if (!result.ok) return result.response;

    return NextResponse.json({ message: result.data.message });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
