'use client'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Camera as CameraIcon, Box as PackageIcon } from 'lucide-react'
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
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white py-6 flex justify-center shadow">
        <Image
          src="/Vitriny.png"
          alt="Vitriny Web"
          width={200}
          height={60}
          priority
        />
      </header>

      {/* Conteúdo principal */}
      <section className="flex-grow relative">
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
          <p className="text-purple-600 text-center mb-8 font-semibold">
            Bem-vindo, {user.email}! O Vitriny AI transforma imagens simples de produtos em artes fotográficas profissionais.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/produtos/novo"
              className="bg-white rounded-lg shadow-lg p-6 w-full transition transform hover:scale-105 hover:bg-gray-50"
            >
              <div className="flex flex-col items-center text-center text-purple-600">
                <CameraIcon className="h-12 w-12" />
                <h2 className="mt-4 text-lg font-semibold">Transformar Produto</h2>
                <p className="mt-2 text-sm">
                  Envie imagens para gerar fotos de catálogo profissionais.
                </p>
              </div>
            </Link>

            <Link
              href="/produtos"
              className="bg-white rounded-lg shadow-lg p-6 w-full transition transform hover:scale-105 hover:bg-gray-50"
            >
              <div className="flex flex-col items-center text-center text-purple-600">
                <PackageIcon className="h-12 w-12" />
                <h2 className="mt-4 text-lg font-semibold">Produtos</h2>
                <p className="mt-2 text-sm">
                  Gerencie e exporte seu catálogo de produtos.
                </p>
              </div>
            </Link>

            <div className="bg-white rounded-lg shadow-lg p-6 w-full transition transform hover:scale-105 hover:bg-gray-50 flex items-center justify-center">
              <LogoutButton />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-300 py-4 text-center text-gray-500 text-xs">
        Powered by Labrego IA Soluções Digitais
      </footer>
    </div>
  )
}
