// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Defina seus locales e o locale padrão
const locales = ['en', 'pt-br'];
const defaultLocale = 'pt-br';

// Crie o middleware de internacionalização com seus locales
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' 
});

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Lógica de Redirecionamento para Login/Registro
  const isAuthRoute = pathname.endsWith('/login') || pathname.endsWith('/register');

  if (isAuthRoute && token) {
    // Determine o locale atual para redirecionar corretamente
    let currentLocale = defaultLocale;
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}/`)) {
        currentLocale = locale;
        break;
      }
    }
    
    // Redireciona para a home do locale atual
    const redirectUrl = new URL(`/${currentLocale}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Processa a requisição através do middleware de internacionalização
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(en|pt-br)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};