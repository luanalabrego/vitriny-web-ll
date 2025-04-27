// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Usuario } from '@/lib/auth';

export default function HomePage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Não autenticado');
        return res.json();
      })
      .then((user: Usuario) => setUsuario(user))
      .catch(() => router.replace('/login'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    router.replace('/login');
  };

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      {/* Bloco 1: Logo com fundo branco */}
      <header className="bg-white py-6 flex justify-center">
        <Image src="/Vitriny.png" alt="Vitriny Web" width={200} height={60} priority />
      </header>

      {/* Bloco 2: Descrição + Módulos com watermark */}
      <section className="relative flex-grow">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/watermark.png"
            alt="Watermark background"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-purple-600 text-center mb-8">
            <strong>
              Aplicativo de IA moldado para transformar imagens simples de produtos em artes
              fotográficas feitas por estúdios profissionais com a melhor qualidade.
            </strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/produtos/novo"
              className="bg-white rounded-lg shadow p-6 hover:bg-gray-50"
            >
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/camera.png"
                  alt="Transformar Produto"
                  width={48}
                  height={48}
                />
                <h2 className="mt-4 text-lg font-semibold text-purple-600">Transformar Produto</h2>
                <p className="mt-2 text-sm text-purple-600 text-center">
                  Envie imagens para gerar fotos de catálogo profissionais.
                </p>
              </div>
            </Link>
            <Link href="/produtos" className="bg-white rounded-lg shadow p-6 hover:bg-gray-50">
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/produtos.png"
                  alt="Produtos"
                  width={48}
                  height={48}
                />
                <h2 className="mt-4 text-lg font-semibold text-purple-600">Produtos</h2>
                <p className="mt-2 text-sm text-purple-600 text-center">
                  Gerencie e exporte seu catálogo de produtos.
                </p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 w-full"
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl">🚪</span>
                <h2 className="mt-4 text-lg font-semibold text-purple-600">Sair</h2>
                <p className="mt-2 text-sm text-purple-600 text-center">
                  Encerrar sessão e voltar ao login.
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Bloco 3: Footer */}
      <footer className="bg-white border-t border-purple-300 py-4 text-center text-gray-500 text-xs">
        Powered by Labrego IA Soluções Digitais
      </footer>
    </div>
  );
}
