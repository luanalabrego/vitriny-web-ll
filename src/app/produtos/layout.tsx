// src/app/(dashboard)/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Usuario } from '@/lib/auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me', { method: 'GET', credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error('Não autenticado')
        const user = await res.json()
        setUsuario(user)
      })
      .catch(() => {
        router.replace('/login')
      })
  }, [router])

  const handleLogout = async () => {
    // Chama o endpoint de logout e, em seguida, redireciona para a tela de login
    await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
    router.replace('/login')
  }

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navegação superior dentro do dashboard */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo estático */}
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Image
                  src="/Vitriny.png"
                  alt="Vitriny Web"
                  width={160}
                  height={50}
                  priority
                />
              </div>

              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-purple-600 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <Image
                  src="/icons/dashboard.png"
                  alt="Dashboard"
                  width={20}
                  height={20}
                  className="inline-block mr-1"
                />
                Dashboard
              </Link>

              <Link
                href="/produtos"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-purple-600 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <Image
                  src="/icons/produtos.png"
                  alt="Produtos"
                  width={20}
                  height={20}
                  className="inline-block mr-1"
                />
                Produtos
              </Link>

              <Link
                href="/produtos/novo"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-purple-600 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <Image
                  src="/icons/camera.png"
                  alt="Transformar Imagem"
                  width={20}
                  height={20}
                  className="inline-block mr-1"
                />
                Transformar Imagem
              </Link>
            </div>

            {/* Logout no canto superior direito */}
            <div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
              >
                🚪 Sair
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-300 py-4 text-center text-gray-700">
        <div className="text-xs text-gray-500">
          Powered by Labrego IA Soluções Digitais
        </div>
      </footer>
    </div>
  )
}
