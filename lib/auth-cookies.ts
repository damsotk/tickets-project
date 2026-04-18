import type { NextResponse } from 'next/server';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '@/lib/auth';

export function setAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  const isProd = process.env.NODE_ENV === 'production';

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_TTL,
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_TOKEN_TTL,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
}
