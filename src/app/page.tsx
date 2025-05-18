// src/app/page.tsx

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Camera as CameraIcon,
  Box as PackageIcon,
  LogOut as LogOutIcon,
} from 'lucide-react'

export default function HomePage() {
  // Protege a rota no servidor
  const cookieStore = cookies()
  const authCookie = cookieStore.get('vitriny_auth')
  if (!authCookie) redirect('/login')

  // Parse do cookie para obter dados do usuário
  const user = JSON.parse(authCookie.value) as { uid: string; email: string }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <Image
              src="/Vitriny.png"
              alt="Vitriny AI"
              width={250}
              height={80}
              priority
            />
          </div>
          {/* Menu */}
          <nav className="w-full md:w-1/2 mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row items-center justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-8 text-purple-600 font-medium">
              <li>
                <Link
                  href="/produtos/novo"
                  className="flex items-center gap-2 hover:text-purple-800 transition"
                >
                  <CameraIcon className="h-5 w-5" />
                  Transformar
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos"
                  className="flex items-center gap-2 hover:text-purple-800 transition"
                >
                  <PackageIcon className="h-5 w-5" />
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="flex items-center gap-2 hover:text-purple-800 transition"
                >
                  <LogOutIcon className="h-5 w-5" />
                  Sair
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/watermark.png"
          alt="Watermark background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Welcome & Cards */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Welcome Text */}
        <div className="text-center mb-12">
          <p className="text-purple-600 text-3xl font-semibold">
            Bem-vindo, {user.email}!
          </p>
          <p className="mt-4 text-gray-700">
            O Vitriny AI transforma imagens simples de produtos em artes fotográficas profissionais.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            href="/produtos/novo"
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-purple-600 transition transform hover:scale-105 hover:shadow-2xl"
          >
            <CameraIcon className="h-16 w-16" />
            <h3 className="mt-6 text-xl font-semibold">Transformar Produto</h3>
            <p className="mt-2 text-center text-gray-600">
              Envie imagens para gerar fotos de catálogo profissionais.
            </p>
          </Link>

          <Link
            href="/produtos"
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-purple-600 transition transform hover:scale-105 hover:shadow-2xl"
          >
            <PackageIcon className="h-16 w-16" />
            <h3 className="mt-6 text-xl font-semibold">Produtos</h3>
            <p className="mt-2 text-center text-gray-600">
              Gerencie e exporte seu catálogo de produtos.
            </p>
          </Link>

          <Link
            href="/login"
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-purple-600 transition transform hover:scale-105 hover:shadow-2xl"
          >
            <LogOutIcon className="h-16 w-16" />
            <h3 className="mt-6 text-xl font-semibold">Sair</h3>
            <p className="mt-2 text-center text-gray-600">
              Encerrar sessão e voltar ao login.
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-300 py-4 text-center text-gray-500 text-xs">
        Powered by Labrego IA Soluções Digitais
      </footer>
    </div>
  )
}
