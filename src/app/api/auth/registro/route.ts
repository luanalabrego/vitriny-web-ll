import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hashSenha } from '@/lib/auth';

// Simulação do banco de dados para desenvolvimento
const usuariosDemo = [
  {
    id: 1,
    nome: 'Admin',
    email: 'admin@vitriny.com',
    senha: '$2a$10$JGLPVTAFUMQHHQUQm0QXpOvhvGiD.jS3hQRrIaQMaRLhFzS/X0oMu', // admin123
    empresa_id: 1
  }
];

const empresasDemo = [
  {
    id: 1,
    nome: 'Empresa Demonstração'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { nome, email, senha, empresa_id } = await request.json();
    
    if (!nome || !email || !senha || !empresa_id) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se o email já está em uso
    const usuarioExistente = usuariosDemo.find(u => u.email === email);

    if (usuarioExistente) {
      return NextResponse.json(
        { message: 'Este email já está em uso' },
        { status: 400 }
      );
    }

    // Verificar se a empresa existe
    const empresaExistente = empresasDemo.find(e => e.id === empresa_id);

    if (!empresaExistente) {
      return NextResponse.json(
        { message: 'Empresa não encontrada' },
        { status: 400 }
      );
    }

    // Em produção, faria hash da senha e salvaria no banco de dados
    // Por enquanto, apenas simulamos o sucesso

    return NextResponse.json({ 
      success: true,
      message: 'Usuário criado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
