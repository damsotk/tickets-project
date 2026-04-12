import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { player } = body;

    if (!player || typeof player !== 'string') {
      return NextResponse.json({ error: 'Need to write a nickname of user', status: 400 });
    }

    const res = await fetch(`${process.env.SERVER_API_FOR_WHITE_LIST}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error ?? 'Error during add user' },
        { status: res.status },
      );
    }

    return NextResponse.json({ message: data.message });
  } catch {
    return NextResponse.json({ error: 'Cant connect to Elium server' }, { status: 502 });
  }
}
