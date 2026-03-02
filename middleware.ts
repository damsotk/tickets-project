import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessTokenEdge } from './lib/auth';

const locales = ['en', 'uk'];
const defaultLocale = 'en';

const protectedPaths = ['/discord-message', '/tickets'];

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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocale(request);

  const isProtectedPath = protectedPaths.some((path) => pathname.includes(path));

  if (isProtectedPath) {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
    }

    const isValid = await verifyAccessTokenEdge(token);
    if (!isValid) {
      const response = NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
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
