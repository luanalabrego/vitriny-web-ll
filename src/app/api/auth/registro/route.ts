// src/app/api/auth/registro/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Ajuste para caminho relativo correto até o helper do Admin SDK
import admin from '../../../../lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { nome, email, senha, empresa_id } = await request.json();

    // Validação básica
    if (!nome || !email || !senha || !empresa_id) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // 1) Cria usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email.trim(),
      password: senha,
      displayName: nome.trim(),
    });

    // 2) Cria documento no Firestore com saldo inicial de créditos
    await admin
      .firestore()
      .collection('users')
      .doc(userRecord.uid)
      .set({
        nome: nome.trim(),
        email: email.trim(),
        empresa_id,
        credits: 10, // saldo inicial
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    // 3) Retorna sucesso
    return NextResponse.json({
      success: true,
      message: 'Usuário criado com sucesso!',
    });
  } catch (err: any) {
    console.error('Erro ao registrar usuário:', err);

    // Email já em uso
    if (err.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { message: 'Este email já está em uso.' },
        { status: 400 }
      );
    }

    // Outros erros
    return NextResponse.json(
      { message: 'Erro interno ao registrar usuário.' },
      { status: 500 }
    );
  }
}
