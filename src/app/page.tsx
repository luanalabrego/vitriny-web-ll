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
  if (!authCookie) {
    redirect('/login')
  }

  // Parse do cookie para obter dados do usuário
  const user = JSON.parse(authCookie.value) as { uid: string; email: string }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
      <div className="relative w-48 h-12 sm:w-64 sm:h-16 md:w-80 md:h-20 lg:w-96 lg:h-24">
                  {/* Logo responsivo */}
          <div className="relative w-40 h-12 sm:w-60 sm:h-16 lg:w-72 lg:h-20">
            <Image
              src="/Vitriny.png"
              alt="Vitriny AI"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* Watermark (esconde em telas muito pequenas) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <Image
          src="/watermark.png"
          alt="Watermark background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Texto de boas-vindas */}
        <div className="text-center mb-12">
          <p className="text-purple-600 font-semibold text-2xl sm:text-3xl md:text-4xl">
            Bem-vindo, {user.email}!
          </p>
          <p className="mt-4 text-gray-700 text-base sm:text-lg">
            O Vitriny AI transforma imagens simples de produtos em artes fotográficas profissionais.
          </p>
        </div>

        {/* Grid de cartões responsiva */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/produtos/novo"
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-purple-600 transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <CameraIcon className="h-12 w-12 sm:h-16 sm:w-16" />
            <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold">
              Transformar Produto
            </h3>
            <p className="mt-2 text-center text-gray-600 text-sm sm:text-base">
              Envie imagens para gerar fotos de catálogo profissionais.
            </p>
          </Link>

          <Link
            href="/produtos"
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-purple-600 transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <PackageIcon className="h-12 w-12 sm:h-16 sm:w-16" />
            <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold">
              Produtos
            </h3>
            <p className="mt-2 text-center text-gray-600 text-sm sm:text-base">
              Gerencie e exporte seu catálogo de produtos.
            </p>
          </Link>

          <Link
            href="/login"
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-purple-600 transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <LogOutIcon className="h-12 w-12 sm:h-16 sm:w-16" />
            <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold">
              Sair
            </h3>
            <p className="mt-2 text-center text-gray-600 text-sm sm:text-base">
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
