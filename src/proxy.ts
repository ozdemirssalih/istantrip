import { NextResponse, type NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

const locales = ['tr', 'en', 'ar', 'ru'] as const;
const defaultLocale = 'tr';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const headers = { 'accept-language': acceptLanguage };
  let languages: string[] = [];
  try {
    languages = new Negotiator({ headers }).languages();
  } catch {
    languages = [defaultLocale];
  }
  try {
    return match(languages, locales as unknown as string[], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard admin routes (login page & logout excepted)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin/logout') return;
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!verifySessionToken(token)) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return;
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
