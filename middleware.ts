// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/login',
  '/api/auth',
  '/favicon.ico',
]

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.toLowerCase()

  // 1) Tudo que esteja na pasta _next  
  // 2) Rotas públicas definidas em PUBLIC_PATHS  
  // 3) Qualquer rota que contenha um ponto (extensão de arquivo)
  if (
    path.startsWith('/_next/') ||
    PUBLIC_PATHS.includes(path) ||
    path.includes('.')       // << ignora png, svg, css, js, etc.
  ) {
    return NextResponse.next()
  }

  // Se não tiver cookie de sessão, manda pro /login
  if (!req.cookies.get('session')?.value) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // aplica em todas as rotas, exceto api, estáticos do Next e favicon
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
