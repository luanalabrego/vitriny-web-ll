// src/app/api/user/credits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import admin from '../../../../lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  // 1) pega o cookie de sessão
  const session = request.cookies.get('vitriny_auth')?.value;
  console.log('→ Sessão raw:', session);

  if (!session) {
    console.log('→ Nenhuma sessão encontrada, retornando 401');
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  let uid: string;
  try {
    uid = JSON.parse(session).uid;
    console.log('→ UID lido:', uid);
  } catch (e) {
    console.error('→ Erro ao parsear sessão:', e);
    return NextResponse.json({ error: 'Sessão inválida' }, { status: 400 });
  }

  try {
    // 2) busca o documento do usuário
    const snap = await admin.firestore().collection('users').doc(uid).get();
    console.log('→ snap.exists?', snap.exists, 'data:', snap.data());

    const data = snap.data();
    return NextResponse.json({ credits: data?.credits ?? 0 });
  } catch (err) {
    console.error('Erro ao ler créditos:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
