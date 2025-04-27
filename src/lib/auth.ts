import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { D1Database } from '@cloudflare/workers-types';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  empresa_id: number;
  empresa_nome?: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(senha, hash);
}

export async function hashSenha(senha: string): Promise<string> {
  return await bcrypt.hash(senha, 10);
}

export async function autenticarUsuario(
  db: D1Database,
  credentials: LoginCredentials
): Promise<Usuario | null> {
  const { email, senha } = credentials;

  try {
    const result = await db
      .prepare(
        `SELECT u.id, u.nome, u.email, u.senha, u.empresa_id, e.nome as empresa_nome 
         FROM usuarios u
         JOIN empresas e ON u.empresa_id = e.id
         WHERE u.email = ?`
      )
      .bind(email)
      .first();

    if (!result) {
      return null;
    }

    const senhaValida = await verificarSenha(senha, result.senha as string);
    if (!senhaValida) {
      return null;
    }

    // Não retornar a senha no objeto de usuário
    const { senha: _, ...usuario } = result as any;
    return usuario as Usuario;
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return null;
  }
}

export function setAuthCookie(usuario: Usuario) {
  // Não armazenar informações sensíveis no cookie
  const userData = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    empresa_id: usuario.empresa_id,
    empresa_nome: usuario.empresa_nome
  };

  cookies().set({
    name: 'vitriny_auth',
    value: JSON.stringify(userData),
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
  });
}

export function getAuthUser(): Usuario | null {
  const authCookie = cookies().get('vitriny_auth');
  
  if (!authCookie) {
    return null;
  }

  try {
    return JSON.parse(authCookie.value) as Usuario;
  } catch {
    return null;
  }
}

export function clearAuthCookie() {
  cookies().delete('vitriny_auth');
}

export function requireAuth(request: NextRequest) {
  const authCookie = request.cookies.get('vitriny_auth');
  
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    JSON.parse(authCookie.value);
    return null; // Usuário autenticado, continuar
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
