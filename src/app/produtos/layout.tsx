'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Usuario } from '@/lib/auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me', { method: 'GET', credentials: 'include' })
      .then(async res => {
        if (!res.ok) throw new Error('Não autenticado')
        const user = await res.json()
        setUsuario(user)
      })
      .catch(() => {
        router.replace('/login')
      })

    fetch('/api/user/credits', { credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        setCredits(typeof json.credits === 'number' ? json.credits : 0)
      })
      .catch(() => setCredits(0))
  }, [router])

  const handleLogout = async () => {
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
      {/* NAV */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Logo */}
            <div className="flex justify-center sm:justify-start">
              <Image
                src="/Vitriny.png"
                alt="Vitriny Web"
                width={160}
                height={50}
                priority
              />
            </div>

            {/* Navegação e créditos */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm font-medium text-gray-600">
                <Link
                  href="/"
                  className="flex items-center gap-1 hover:text-purple-600 transition"
                >
                  <Image src="/icons/dashboard.png" alt="Dashboard" width={20} height={20} />
                  Dashboard
                </Link>

                <Link
                  href="/produtos"
                  className="flex items-center gap-1 hover:text-purple-600 transition"
                >
                  <Image src="/icons/produtos.png" alt="Produtos" width={20} height={20} />
                  Produtos
                </Link>

                <Link
                  href="/produtos/novo"
                  className="flex items-center gap-1 hover:text-purple-600 transition"
                >
                  <Image src="/icons/camera.png" alt="Transformar" width={20} height={20} />
                  Transformar Imagem
                </Link>
              </div>

              {/* Créditos */}
              <div className="flex justify-center sm:justify-start">
                <div className="inline-flex items-center bg-purple-600 text-white font-bold rounded-md px-3 py-1">
                  <span className="text-lg mr-1">🪙</span>
                  <span>Créditos: </span>
                  <span className="ml-1">
                    {credits !== null
                      ? credits.toString().padStart(4, '0')
                      : '----'}
                  </span>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="flex justify-center sm:justify-end">
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

      {/* Conteúdo */}
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t border-purple-300 py-4 text-center text-gray-700">
        <div className="text-xs text-gray-500">
          Powered by Labrego IA Soluções Digitais
        </div>
      </footer>
    </div>
  )
}
