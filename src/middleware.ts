import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as i18n from '@/i18n/constant';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const locale = searchParams.get(i18n.key);

  if (locale) {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete(i18n.key);

    const newUrl = new URL(
      `${pathname}${
        newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''
      }`,
      request.url
    );

    const response = NextResponse.redirect(newUrl);

    if (i18n.list.includes(locale)) {
      response.cookies.set(i18n.key, locale, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
    }

    return response;
  }

  return NextResponse.next();
}
