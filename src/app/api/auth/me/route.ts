// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import admin from '@/lib/firebaseAdmin'

export async function GET() {
  // 1) pega o cookie de sessão — use o mesmo nome que seu /api/auth/login define
  const sessionCookie = cookies().get('vitriny_auth')?.value
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    // 2) valida o cookie e extrai o UID
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
    // 3) busca dados do usuário no Firebase
    const userRecord = await admin.auth().getUser(decoded.uid)

    // 4) devolve 200 com um objeto mínimo que seu layout precisa
    return NextResponse.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName
    })
  } catch (err) {
    console.error('[/api/auth/me] erro de autenticação:', err)
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }
}
