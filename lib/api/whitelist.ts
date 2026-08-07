import { NextResponse } from 'next/server';

type WhitelistResult<T = unknown> = { ok: true; data: T } | { ok: false; response: NextResponse };

export type WhitelistMessageResponse = { message: string };
export type WhitelistPlayersResponse = { players: string[]; state: boolean };

export async function callWhitelistServer<T = unknown>(
  init?: RequestInit,
  fallbackError = 'Error to connect Elium server',
): Promise<WhitelistResult<T>> {
  try {
    const res = await fetch(`${process.env.SERVER_API_FOR_WHITE_LIST}`, init);
    const data = (await res.json().catch(() => ({}))) as { error?: string } & Partial<T>;

    if (!res.ok) {
      return {
        ok: false,
        response: NextResponse.json({ error: data.error ?? fallbackError }, { status: res.status }),
      };
    }

    return { ok: true, data: data as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Cant connect to Elium server' }, { status: 502 }),
    };
  }
}
