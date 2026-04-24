import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessTokenEdge } from './lib/auth';

const locales = ['ru', 'en', 'uk', 'by'];
const defaultLocale = 'en';

const protectedUserPaths = ['/discord-message', '/tickets', '/profile'];
const protectedAdminPaths = ['/admin/all-tickets', `/admin/logs`, `/admin/whitelist`];

function getLocale(request: NextRequest): string {
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale;
      }
    }
  }

  return defaultLocale;
}

function matchesProtectedPath(pathname: string, protectedPaths: string[]): boolean {
  const pathnameWithoutLocale = pathname.replace(/^\/(en|uk|by|ru)/, '');

  return protectedPaths.some((path) => {
    return pathnameWithoutLocale === path || pathnameWithoutLocale.startsWith(`${path}/`);
  });
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocale(request);

  const isUserProtectedPath = matchesProtectedPath(pathname, protectedUserPaths);
  const isAdminProtectedPath = matchesProtectedPath(pathname, protectedAdminPaths);

  if (isUserProtectedPath || isAdminProtectedPath) {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
    }
    const payload = await verifyAccessTokenEdge(token);

    if (!payload) {
      const response = NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    if (isAdminProtectedPath && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${locale}/`, request.url));
    }
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ttf|woff|woff2)).*)',
  ],
};
