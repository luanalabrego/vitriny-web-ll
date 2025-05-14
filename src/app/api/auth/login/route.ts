// src/app/api/auth/login/route.ts
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as admin from 'firebase-admin'

// Variáveis de ambiente do Admin SDK
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY
} = process.env

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error('❌ Variáveis do Firebase Admin não definidas.')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token?: string }
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token é obrigatório.' },
        { status: 400 }
      )
    }

    // Verifica ID token (email, uid, exp, etc)
    await admin.auth().verifyIdToken(token)

    // Cria um session cookie de longa duração
    const expiresIn = 7 * 24 * 60 * 60 * 1000 // 7 dias em ms
    const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn })

    // Prepara a resposta com o cookie “session”
    const res = NextResponse.json({ success: true })
    res.cookies.set({
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: expiresIn / 1000,   // em segundos
      sameSite: 'strict',
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
