import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.SERVER_API_FOR_WHITE_LIST}`, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: 'Error to connect Elium server' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ players: data.players ?? [], state: data.state ?? false });
  } catch {
    return NextResponse.json({ error: 'Error to connect Elium server', status: 502 });
  }
}
