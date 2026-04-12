import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { state } = body;

    if (typeof state !== 'boolean') {
      return NextResponse.json({ error: 'You need send state (boolean)', status: 400 });
    }

    const res = await fetch(`${process.env.SERVER_API_FOR_WHITE_LIST}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error ?? 'Erro with on/off whitelist' },
        { status: res.status },
      );
    }

    return NextResponse.json({ message: data.message });
  } catch {}
}
