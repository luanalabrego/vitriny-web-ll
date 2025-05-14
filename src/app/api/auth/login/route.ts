// src/app/api/auth/login/route.ts
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import admin from '@/lib/firebaseAdmin'   // ← use a instância única do seu lib/firebaseAdmin

export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token?: string }
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token é obrigatório.' },
        { status: 400 }
      )
    }

    // 1) valida o ID token (vai lançar se for inválido/expirado)
    await admin.auth().verifyIdToken(token)

    // 2) gera o session cookie (7 dias)
    const expiresIn = 7 * 24 * 60 * 60 * 1000  // milissegundos
    const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn })

    // 3) monta a resposta e seta o cookie chamado "session"
    const res = NextResponse.json({ success: true })
    res.cookies.set({
      name:    'session',               // ← o mesmo nome que você usa no /api/auth/me
      value:   sessionCookie,
      domain:  '.vitrinyweb.com.br',   // para cobrir www e sem www
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      path:     '/',
      maxAge:   expiresIn / 1000,       // em segundos
      sameSite: 'lax',
    })

    return res
  } catch (err: any) {
    console.error('[/api/auth/login] erro:', err)
    const isAuthError =
      err.code === 'auth/id-token-expired' ||
      err.code === 'auth/argument-error'
    return NextResponse.json(
      {
        success: false,
        message: isAuthError
          ? 'Token expirado ou inválido.'
          : 'Erro interno do servidor.'
      },
      { status: isAuthError ? 401 : 500 }
    )
  }
}
