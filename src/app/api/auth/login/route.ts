// src/app/api/auth/login/route.ts
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as admin from 'firebase-admin'

// Extrai e valida variáveis de ambiente
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY
} = process.env

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error(
    'Variáveis de ambiente do Firebase Admin não definidas: ' +
    'FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY são obrigatórias.'
  )
}

// Inicializa o Admin SDK apenas uma vez
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
        { success: false, message: 'Token de autenticação é obrigatório.' },
        { status: 400 }
      )
    }

    // Verifica o ID token e obtém o payload (uid, email, iat, exp, etc)
    const decoded = await admin.auth().verifyIdToken(token)

    // Cria a resposta JSON
    const response = NextResponse.json({ success: true })

    // Define o cookie de sessão
    response.cookies.set({
      name: 'vitriny_auth',
      value: JSON.stringify({ uid: decoded.uid, email: decoded.email }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return response
  } catch (err: any) {
    console.error('Erro em /api/auth/login:', err)

    const isAuthError =
      err.code === 'auth/id-token-expired' ||
      err.code === 'auth/argument-error' ||
      /expired/i.test(err.message)

    return NextResponse.json(
      {
        success: false,
        message: isAuthError
          ? 'Sessão expirada ou inválida. Faça login novamente.'
          : err.message || 'Erro interno do servidor.',
      },
      { status: isAuthError ? 401 : 500 }
    )
  }
}
