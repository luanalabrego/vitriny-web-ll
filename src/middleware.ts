// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('vitriny_auth')
  const pathname = request.nextUrl.pathname

  // Quais caminhos DEVEM ficar acessíveis sem cookie:
  // - /login, /registro → páginas de auth
  // - rotas de API de auth: /api/auth/login, /api/auth/registro, /api/auth/logout
  const isAuthPath =
    pathname === '/login' ||
    pathname === '/registro' ||
    pathname.startsWith('/api/auth/')

  // Se não estiver autenticado e não for rota de auth, redireciona para /login
  if (!authCookie && !isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se estiver autenticado e for rota de auth (login/registro), manda para /
  if (authCookie && (pathname === '/login' || pathname === '/registro')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Caso contrário, permite seguir normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Aplica middleware em todas as rotas, exceto:
     * - _next/static (arquivos estáticos)
     * - _next/image  (otimização de imagens)
     * - favicon.ico
     * - pasta public
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
