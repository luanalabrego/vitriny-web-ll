// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/login',
  '/api/auth',
  '/favicon.ico',
  '/Vitriny.png',
  '/watermark.png',
  '/_next/',     // tudo que comece com /_next/ (incluindo /_next/image)
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // se for rota pública, deixa passar
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // caso contrário, verifica cookie de sessão
  const token = req.cookies.get('session')?.value
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
