// src/app/api/user/decrement-credits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // 1) pega o cookie de sessão
  const session = request.cookies.get('vitriny_auth')?.value;
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { uid } = JSON.parse(session);

  try {
    const userRef = admin.firestore().collection('users').doc(uid);

    // 2) transaction para garantir decremento atômico
    await admin.firestore().runTransaction(async tx => {
      const doc = await tx.get(userRef);
      const current = (doc.data()?.credits as number) ?? 0;
      if (current <= 0) {
        throw new Error('Sem créditos suficientes');
      }
      tx.update(userRef, { credits: current - 1 });
    });

    // 3) retorna novo saldo
    const updated = await userRef.get();
    return NextResponse.json({ credits: updated.data()?.credits ?? 0 });
  } catch (err: any) {
    console.error('Erro ao decrementar créditos:', err);
    const message = err.message === 'Sem créditos suficientes'
      ? err.message
      : 'Erro interno';
    const status = err.message === 'Sem créditos suficientes' ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
