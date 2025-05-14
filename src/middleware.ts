// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('🕵️‍♂️ cookies no middleware:', Array.from(request.cookies.entries()))
  // aqui você deve ler o cookie "session"
  const authCookie = request.cookies.get('session')
  const pathname = request.nextUrl.pathname

  const isAuthPath =
    pathname === '/login' ||
    pathname === '/registro' ||
    pathname.startsWith('/api/auth/')

  if (!authCookie && !isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authCookie && (pathname === '/login' || pathname === '/registro')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
