// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import admin from 'firebase-admin'

// Garantindo que as variáveis de ambiente existam
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY
} = process.env

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error(
    'Variáveis de ambiente do Firebase Admin (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) não estão definidas.'
  )
}

// Só inicializa uma vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // no .env, privateKey deve ter as quebras de linha como \\n
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token?: string }

    if (!token) {
      return NextResponse.json(
        { message: 'Token de autenticação é obrigatório' },
        { status: 400 }
      )
    }

    // Verifica ID token e obtém payload (uid, email, claims...)
    const decoded = await admin.auth().verifyIdToken(token)

    // Cria cookie de sessão com o payload serializado
    cookies().set({
      name: 'vitriny_auth',
      value: JSON.stringify(decoded),
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Erro no auth/login:', err)

    const isAuthError =
      err.code === 'auth/id-token-expired' ||
      err.code === 'auth/argument-error' ||
      /expired/i.test(err.message)

    return NextResponse.json(
      { message: isAuthError
          ? 'Sessão expirada ou inválida. Faça login novamente.'
          : err.message || 'Erro interno do servidor'
      },
      { status: isAuthError ? 401 : 500 }
    )
  }
}
