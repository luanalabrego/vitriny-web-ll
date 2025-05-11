// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Note que colocamos os nomes em lowercase para fazer a comparação case-insensitive
const PUBLIC_PATHS = [
  '/login',
  '/api/auth',
  '/favicon.ico',
  '/vitriny.png',
  '/watermark.png',
]

export function middleware(req: NextRequest) {
  // sempre converte pra lowercase antes de comparar
  const path = req.nextUrl.pathname.toLowerCase()

  // libera tudo que seja /_next/* ou que esteja listado em PUBLIC_PATHS
  if (path.startsWith('/_next/') || PUBLIC_PATHS.includes(path)) {
    return NextResponse.next()
  }

  // só redireciona quem não tiver sessão
  if (!req.cookies.get('session')?.value) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// aplica middleware em TODAS as rotas (exceto APIs e estáticos do próprio Next que começam com /_next/)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
