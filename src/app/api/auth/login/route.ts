import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { autenticarUsuario, setAuthCookie } from '@/lib/auth';
import type { LoginCredentials } from '@/lib/auth';

// Simulação do banco de dados para desenvolvimento
const usuariosDemo = [
  {
    id: 1,
    nome: 'Admin',
    email: 'admin@vitriny.com',
    senha: '$2a$10$JGLPVTAFUMQHHQUQm0QXpOvhvGiD.jS3hQRrIaQMaRLhFzS/X0oMu', // admin123
    empresa_id: 1,
    empresa_nome: 'Empresa Demonstração'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json() as LoginCredentials;
    
    if (!email || !senha) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Simulação de autenticação para desenvolvimento
    const usuario = usuariosDemo.find(u => u.email === email);
    
    if (!usuario) {
      return NextResponse.json(
        { message: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Em produção, verificaria a senha com bcrypt
    // Por enquanto, aceitamos qualquer senha para o usuário demo
    
    // Definir cookie de autenticação
    cookies().set({
      name: 'vitriny_auth',
      value: JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        empresa_id: usuario.empresa_id,
        empresa_nome: usuario.empresa_nome
      }),
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
