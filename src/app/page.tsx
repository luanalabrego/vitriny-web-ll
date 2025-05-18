'use client';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Camera as CameraIcon, Box as PackageIcon, LogOut } from 'lucide-react';

export default function HomePage() {
  // Protege a rota no servidor
  const cookieStore = cookies();
  const authCookie = cookieStore.get('vitriny_auth');
  if (!authCookie) {
    redirect('/login');
  }

  // Parse do cookie para obter dados do usuário
  const user = JSON.parse(authCookie.value) as { uid: string; email: string };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-4 sm:px-6 lg:px-8">
          {/* Logo (meia tela à esquerda) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <Image
              src="/Vitriny.png"
              alt="Vitriny AI"
              width={250}
              height={80}
              priority
            />
          </div>
          {/* Menu (meia tela à direita) */}
          <nav className="w-full md:w-1/2 mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row items-center justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-8 text-purple-600 font-medium">
              <li>
                <Link
                  href="/produtos/novo"
                  className="flex items-center gap-2 hover:text-purple-800 transition"
                >
                  <CameraIcon className="h-5 w-5" />
                  <span>Transformar</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos"
                  className="flex items-center gap-2 hover:text-purple-800 transition"
                >
                  <PackageIcon className="h-5 w-5" />
                  <span>Produtos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="flex items-center gap-2 hover:text-purple-800 transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <section className="relative flex-grow">
        {/* Marca d'água */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/watermark.png"
            alt="Watermark background"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>

        {/* Boas-vindas */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <p className="text-purple-600 text-2xl font-semibold">
            Bem-vindo, {user.email}!  
          </p>
          <p className="mt-4 text-gray-700">
            O Vitriny AI transforma imagens simples de produtos em artes fotográficas profissionais.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-300 py-4 text-center text-gray-500 text-xs">
        Powered by Labrego IA Soluções Digitais
      </footer>
    </div>
  );
}
