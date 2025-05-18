'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Coins,
  LogOut,
  Menu,
  X,
  Home,
  Box as PackageIcon,
  Camera as CameraIcon,
} from 'lucide-react'
import type { Usuario } from '@/lib/auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
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

  const formattedCredits = credits !== null ? credits.toString().padStart(4, '0') : '----'

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAV */}
      <nav className="bg-white shadow-sm rounded-lg border border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="Vitriny AI" className="w-[160px] h-auto" />
          </div>

          {/* Mobile credits + hamburger */}
          <div className="flex items-center gap-2 sm:hidden">
            <div className="inline-flex items-center gap-1 bg-purple-600 text-white font-bold rounded-lg px-2 py-1">
              <Coins className="h-5 w-5" />
              <span>{formattedCredits}</span>
            </div>
            <button
              className="inline-flex items-center p-2 rounded-lg hover:bg-gray-100 text-purple-600"
              onClick={() => setMenuOpen(open => !open)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop links, credits and logout */}
          <div className="hidden sm:flex sm:items-center sm:justify-between w-full gap-4">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-gray-100 text-purple-600"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="/produtos"
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-gray-100 text-purple-600"
              >
                <PackageIcon className="h-5 w-5" />
                Produtos
              </Link>

              <Link
                href="/produtos/novo"
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-gray-100 text-purple-600"
              >
                <CameraIcon className="h-5 w-5" />
                Transformar Imagem
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-purple-600 text-white font-bold rounded-lg shadow transition transform hover:scale-105 px-3 py-1">
                <Coins className="h-5 w-5" />
                <span>Créditos:</span>
                <span className="ml-1">{formattedCredits}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow transition transform hover:scale-105 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 text-purple-600" />
                <span className="text-purple-600">Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4 text-purple-600">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-gray-100"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/produtos"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-gray-100"
              >
                <PackageIcon className="h-5 w-5" />
                Produtos
              </Link>
              <Link
                href="/produtos/novo"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-gray-100"
              >
                <CameraIcon className="h-5 w-5" />
                Transformar Imagem
              </Link>
            </div>

            <button
              onClick={() => { setMenuOpen(false); handleLogout() }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-white rounded-lg shadow transition transform hover:scale-105 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5 text-purple-600" />
              <span className="text-purple-600">Sair</span>
            </button>
          </div>
        )}
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
