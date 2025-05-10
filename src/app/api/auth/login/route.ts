// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Inicializa o Firebase Admin (usa as credenciais do service account)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      // private key precisa manter as quebras de linha corretas
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })
}

const adminAuth = getAuth()

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (!token) {
      return NextResponse.json(
        { message: 'O campo "token" é obrigatório.' },
        { status: 400 }
      )
    }

    // 1) Verifica e decodifica o ID token do Firebase
    const decoded = await adminAuth.verifyIdToken(token)

    // 2) Cria um session cookie com validade de 5 dias
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 dias em ms
    const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn })

    // 3) Retorna a resposta setando o cookie de sessão
    const res = NextResponse.json({ status: 'sucesso' })
    res.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn / 1000,
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
