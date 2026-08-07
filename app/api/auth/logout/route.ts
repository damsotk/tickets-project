import { NextRequest, NextResponse } from 'next/server';
import { isIpRateLimited } from '@/lib/api/guards';

export async function POST(request: NextRequest) {
  if (await isIpRateLimited(request, 'auth')) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}
