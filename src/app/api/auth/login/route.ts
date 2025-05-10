// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

/**
 * Inicializa o Firebase Admin usando o JSON completo de service account
 * armazenado em FIREBASE_SERVICE_ACCOUNT (Vercel env var).
 */
if (!getApps().length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT!
  )

  initializeApp({
    credential: cert(serviceAccount),
  })
}

const adminAuth = getAuth()

export async function POST(req: Request) {
  try {
    // 1) Extrai o token do corpo
    const { token } = await req.json()
    if (!token) {
      return NextResponse.json(
        { message: 'O campo "token" é obrigatório.' },
        { status: 400 }
      )
    }

    // 2) Verifica o ID token (opcional, mas recomendado)
    await adminAuth.verifyIdToken(token)

    // 3) Cria o session cookie (valendo 5 dias)
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // ms
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    })

    // 4) Retorna a resposta setando o cookie
    const res = NextResponse.json({ status: 'sucesso' })
    res.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn / 1000, // em segundos
      path: '/',
    })

    return res
  } catch (error: any) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { message: 'Falha ao criar sessão de login.' },
      { status: 500 }
    )
  }
}
