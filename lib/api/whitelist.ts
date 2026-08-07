import { NextResponse } from 'next/server';

type WhitelistResult<T = any> = { ok: true; data: T } | { ok: false; response: NextResponse };

export async function callWhitelistServer<T = any>(
  init?: RequestInit,
  fallbackError = 'Error to connect Elium server',
): Promise<WhitelistResult<T>> {
  try {
    const res = await fetch(`${process.env.SERVER_API_FOR_WHITE_LIST}`, init);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        response: NextResponse.json({ error: data.error ?? fallbackError }, { status: res.status }),
      };
    }

    return { ok: true, data };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Cant connect to Elium server' }, { status: 502 }),
    };
  }
}
