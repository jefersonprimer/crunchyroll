import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'pt-br', 'es'],
  defaultLocale: 'en'
})

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Check if the path is login or register (with or without locale)
  if (pathname.match(/^\/(en|pt-br)?\/?(login|register)$/)) {
    // If user is logged in (has token), redirect to home
    if (token) {
      // Preserve the locale in the redirect
      const locale = pathname.split('/')[1] || 'en'
      const redirectUrl = new URL(`/${locale}`, request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Handle internationalization for other routes
  return intlMiddleware(request)
}

// Update matcher to include all routes that need middleware
export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - static files
    // - _next internal routes
    '/((?!api|_next|.*\\..*).*)',
    // Also match login and register routes specifically
    '/login',
    '/register',
    '/en/login',
    '/en/register',
    '/pt-br/login',
    '/pt-br/register'
  ]
} 