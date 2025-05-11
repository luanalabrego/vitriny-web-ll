// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/login',
  '/api/auth',
  '/favicon.ico',
]

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname.toLowerCase()

  // libera tudo em /_next/ e rotas públicas
  if (
    pathname.startsWith('/_next/') ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return NextResponse.next()
  }

  // se não tiver sessão, redireciona
  if (!req.cookies.get('session')?.value) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // só aplica o middleware a rotas sem extensão de arquivo
  matcher: [
    // negativa: api, _next/static, _next/image, favicon.ico e QUALQUER caminho que contenha "." (extensão)
    '/((?!api|_next/static|_next/image|favicon.ico|\\..*).*)'
  ]
}
