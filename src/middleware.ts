// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // DEBUG: imprima o header "cookie" para ver todos os cookies que chegam
  console.log('🍪 Cookie header:', request.headers.get('cookie'))

  // leia apenas o cookie "session" que você setou no /api/auth/login
  const authCookie = request.cookies.get('session')
  const pathname = request.nextUrl.pathname

  // caminhos que podem ficar públicos (login, registro e API de auth)
  const isAuthPath =
    pathname === '/login' ||
    pathname === '/registro' ||
    pathname.startsWith('/api/auth/')

  // se não tiver session e não for rota de auth, redireciona para /login
  if (!authCookie && !isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // se já estiver logado e acessando /login ou /registro, manda para /
  if (authCookie && (pathname === '/login' || pathname === '/registro')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // tudo ok, deixa passar
  return NextResponse.next()
}

export const config = {
  matcher: [
    // aplica este middleware em todas as rotas, exceto estáticos e public
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
