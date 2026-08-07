import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/guards';
import { callWhitelistServer } from '@/lib/api/whitelist';

export async function GET() {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const result = await callWhitelistServer({ cache: 'no-store' });
    if (!result.ok) return result.response;

    return NextResponse.json({
      players: result.data.players ?? [],
      state: result.data.state ?? false,
    });
  } catch {
    return NextResponse.json({ error: 'Error to connect Elium server' }, { status: 502 });
  }
}
