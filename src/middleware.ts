// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Defina seus locales e o locale padrão
const locales = ['en', 'pt-br', 'es'];
const defaultLocale = 'en';

// Crie o middleware de internacionalização com seus locales
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  // Se você tiver uma estratégia de prefixo, configure aqui.
  // Por exemplo, `localePrefix: 'always'` para `/en/about` ou `/about` (se defaultLocale não tiver prefixo)
  // Normalmente, `always` é bom para consistência.
  localePrefix: 'always' 
});

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Lógica de Redirecionamento para Login/Registro
  // Verifica se o caminho atual (sem o locale) é 'login' ou 'register'
  // Usamos `pathname.startsWith` para lidar com /en/login, /pt-br/register, etc.
  const isAuthRoute = pathname.endsWith('/login') || pathname.endsWith('/register');

  if (isAuthRoute) {
    // Se o usuário está logado (tem token), redireciona para a home
    if (token) {
      // Determine o locale atual para redirecionar corretamente
      // O next-intl middleware já deveria ter resolvido isso,
      // mas podemos extraí-lo da URL se necessário.
      // Uma forma robusta é usar o `NextResponse.redirect` com o path de retorno do intlMiddleware.
      
      // Para garantir que o locale esteja correto no redirecionamento:
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
    // Se não está logado, permite o acesso às páginas de login/registro
    // O intlMiddleware abaixo cuidará do tratamento do locale para essas páginas
  }

  // 2. Processa a requisição através do middleware de internacionalização
  // Este middleware lida com a detecção do locale, redirecionamentos e reescritas para o locale correto.
  return intlMiddleware(request);
}

// ---

export const config = {
  // O matcher agora é mais simples e abrangente, cobrindo todas as rotas
  // que precisam de processamento pelo middleware (incluindo login/register).
  matcher: [
    // 1. Matches todas as rotas de nível superior (exceto arquivos estáticos, API, etc.)
    //    Isso inclui rotas sem locale prefix, que serão tratadas pelo next-intl
    //    Ex: '/', '/about', '/login'
    '/',
    '/(es|en|pt-br)/:path*', // Matches todas as rotas com prefixo de locale
    // Exclui especificamente rotas de API, arquivos estáticos e arquivos com extensão
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};