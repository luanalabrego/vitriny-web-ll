// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { autenticarUsuario, setAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token?: string }

    if (!token) {
      return NextResponse.json(
        { message: 'Token de autenticação é obrigatório' },
        { status: 400 }
      )
    }

    // 1) Verifica o ID token no Firebase Admin e obtém dados do usuário
    const usuario = await autenticarUsuario(token)

    // 2) Cria o cookie de sessão (JSON serializado ou JWT, conforme setAuthCookie)
    cookies().set({
      name: 'vitriny_auth',
      value: setAuthCookie(usuario),
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro no auth/login:', error)

    // Se o token expirou ou for inválido, devolve 401
    if (
      error.code === 'auth/id-token-expired' ||
      error.code === 'auth/argument-error' ||
      /expired/i.test(error.message)
    ) {
      return NextResponse.json(
        { message: 'Sessão expirada ou inválida. Faça login novamente.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: error.message || 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
