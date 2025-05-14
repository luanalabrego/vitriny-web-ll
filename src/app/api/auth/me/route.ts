// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import admin from '@/lib/firebaseAdmin'

export async function GET() {
  // 1) pegue o cookie “session” exato
  const sessionCookie = cookies().get('session')?.value
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    // 2) valide o cookie e extraia o UID
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
    // 3) busque os dados do usuário no Firebase
    const userRecord = await admin.auth().getUser(decoded.uid)

    // 4) retorne 200 com o objeto de usuário
    return NextResponse.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName
    })
  } catch (err) {
    console.error('[/api/auth/me] autenticação falhou:', err)
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }
}
