import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/guards';
import { callWhitelistServer } from '@/lib/api/whitelist';

export async function PUT(request: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { player } = await request.json();
    if (!player || typeof player !== 'string') {
      return NextResponse.json({ error: 'Need to write a nickname of user' }, { status: 400 });
    }

    const result = await callWhitelistServer(
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player }),
      },
      'Error during add user',
    );
    if (!result.ok) return result.response;

    return NextResponse.json({ message: result.data.message });
  } catch {
    return NextResponse.json({ error: 'Cant connect to Elium server' }, { status: 502 });
  }
}
