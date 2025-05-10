// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import admin from 'firebase-admin'

// Inicializa o admin SDK apenas uma vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // a chave privada costuma ter que substituir as quebras de linha:
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

    // Verifica o ID token no Firebase e retorna o payload
    const decoded = await admin.auth().verifyIdToken(token)

    // Cria o cookie de sessão com os dados retornados
    cookies().set({
      name: 'vitriny_auth',
      value: JSON.stringify(decoded),  // ou use seu setAuthCookie(decoded)
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Erro no auth/login:', err)
    const status =
      err.code === 'auth/id-token-expired' ||
      err.code === 'auth/argument-error'
        ? 401
        : 500

    return NextResponse.json(
      { message: err.message || 'Erro interno do servidor' },
      { status }
    )
  }
}
