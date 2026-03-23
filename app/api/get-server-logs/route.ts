import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const REQUEST_TIMEOUT = 10000;

interface MinecraftLogsResponse {
  page: number;
  totalPages: number;
  totalLogs: number;
  count: number;
  logs: string[];
}

interface MinecraftErrorResponse {
  error: string;
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { role: true },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const player = searchParams.get('player');
    const category = searchParams.get('category');
    const page = searchParams.get('page') || '1';

    const pageNum = parseInt(page, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
    }

    if (!player && !category) {
      return NextResponse.json(
        { error: 'Player or category parameter is required' },
        { status: 400 },
      );
    }

    if (player) {
      const playerNameRegex = /^[a-zA-Z0-9_]{3,16}$/;
      if (!playerNameRegex.test(player)) {
        return NextResponse.json({ error: 'Invalid player name format' }, { status: 400 });
      }
    }

    const serverApiUrl = process.env.SERVER_API_FOR_LOGS;
    if (!serverApiUrl) {
      console.error('SERVER_API_FOR_LOGS environment variable is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const minecraftApiUrl = new URL(serverApiUrl);
    if (player) minecraftApiUrl.searchParams.set('player', player);
    if (category) minecraftApiUrl.searchParams.set('category', category);
    minecraftApiUrl.searchParams.set('page', pageNum.toString());

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    let response: Response;
    try {
      response = await fetch(minecraftApiUrl.toString(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
        cache: 'no-store',
      });
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Minecraft server is not responding.' },
          { status: 504 },
        );
      }
      throw fetchError;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      if (response.status === 404) {
        const errorData: MinecraftErrorResponse = await response.json();
        return NextResponse.json(
          { error: errorData.error || 'Resource not found' },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { error: `Minecraft API error: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data: MinecraftLogsResponse = await response.json();

    if (!data.logs || !Array.isArray(data.logs)) {
      return NextResponse.json(
        { error: 'Invalid response format from Minecraft API' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      page: data.page,
      totalPages: data.totalPages,
      totalLogs: data.totalLogs,
      count: data.count,
      logs: data.logs,
    });
  } catch (error) {
    console.error('Logs API Error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON response from server' }, { status: 502 });
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json({ error: 'Unable to connect to Minecraft server' }, { status: 503 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
