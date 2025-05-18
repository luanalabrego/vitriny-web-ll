// src/app/page.tsx

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Camera as CameraIcon, Box as PackageIcon, LogOut as LogOutIcon } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'

export default function HomePage() {
  // Protege a rota no servidor
  const cookieStore = cookies()
  const authCookie = cookieStore.get('vitriny_auth')
  if (!authCookie) {
    redirect('/login')
  }

  // Parse do cookie para obter dados do usuário
  const user = JSON.parse(authCookie.value) as { uid: string; email: string }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex justify-center py-8 px-4 sm:px-6 lg:px-8">
          <Image
            src="/Vitriny.png"
            alt="Vitriny AI"
            width={250}
            height={80}
            priority
          />
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

          <div className="bg-white rounded-2xl shadow-xl p-8 flex justify-center transition transform hover:scale-105 hover:shadow-2xl">
            <LogoutButton className="flex flex-col items-center text-purple-600 space-y-4">
              <LogOutIcon className="h-16 w-16" />
              <h3 className="text-xl font-semibold">Sair</h3>
              <p className="text-center text-gray-600">
                Encerrar sessão e voltar ao login.
              </p>
            </LogoutButton>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-300 py-4 text-center text-gray-500 text-xs">
        Powered by Labrego IA Soluções Digitais
      </footer>
    </div>
  )
}
