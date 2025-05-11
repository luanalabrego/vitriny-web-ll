// src/app/api/user/credits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  // 1) pega o cookie de sessão
  const session = request.cookies.get('vitriny_auth')?.value;
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { uid } = JSON.parse(session);

  try {
    // 2) busca o documento do usuário
    const snap = await admin.firestore().collection('users').doc(uid).get();
    const data = snap.data();
    return NextResponse.json({ credits: data?.credits ?? 0 });
  } catch (err) {
    console.error('Erro ao ler créditos:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
