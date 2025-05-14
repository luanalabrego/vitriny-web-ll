import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import admin from '@/lib/firebaseAdmin'

export async function GET() {
  // Pegue o cookie de sessão (ou troque 'session' por 'vitriny_auth' se for esse o nome)
  const sessionCookie = cookies().get('session')?.value
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    // Verifica o cookie e extrai o UID
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
    // Busca o registro completo do usuário no Admin
    const userRecord = await admin.auth().getUser(decoded.uid)

    // Monte o objeto que seu front precisa
    const user = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName
    }

    return NextResponse.json(user)
  } catch (err) {
    console.error('[/api/auth/me] erro de autenticação:', err)
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }
}
