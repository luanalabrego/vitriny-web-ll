// src/lib/auth.ts
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Usuário autenticado, conforme gravado no cookie de sessão
 */
export interface Usuario {
  /** ID do usuário no Firebase (uid) */
  uid: string
  /** Email do usuário */
  email: string
}

/**
 * Define o cookie de sessão HTTP-only
 * @param res NextResponse onde o cookie será anexado
 * @param user Dados do usuário a serem serializados
 */
export function setAuthCookie(res: NextResponse, user: Usuario) {
  res.cookies.set({
    name: 'vitriny_auth',
    value: JSON.stringify(user),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })
}

/**
 * Lê o cookie de sessão no contexto atual (Server Component ou API Route)
 * @returns O objeto Usuario ou null se não autenticado / inválido
 */
export function getAuthUser(): Usuario | null {
  const store = cookies()
  const cookie = store.get('vitriny_auth')
  if (!cookie) return null
  try {
    return JSON.parse(cookie.value) as Usuario
  } catch {
    return null
  }
}

/**
 * Remove o cookie de sessão. Se fornecido um NextResponse, apaga no response;
 * caso contrário, apaga do contexto atual.
 */
export function clearAuthCookie(res?: NextResponse) {
  if (res) {
    res.cookies.delete('vitriny_auth')
  } else {
    cookies().delete('vitriny_auth')
  }
}

/**
 * Middleware helper para proteger rotas do App Router.
 * Redireciona para /login se não estiver autenticado.
 * @param request NextRequest da rota
 * @returns null se autenticado, ou NextResponse.redirect se não estiver
 */
export function requireAuth(request: NextRequest): NextResponse | null {
  const cookie = request.cookies.get('vitriny_auth')
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  try {
    JSON.parse(cookie.value)
    return null
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}