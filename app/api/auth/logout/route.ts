import { NextRequest, NextResponse } from 'next/server';
import { rateLimiters } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await rateLimiters.auth.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}
