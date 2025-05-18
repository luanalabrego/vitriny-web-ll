'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/icons/Logo'
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
          <div className="w-[160px] h-auto">
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 1214 300" fill="none">
    <g fill="#7C3AED">
      <path d="M198.3 220.5H85.8L57.9 298H0L107.7 7.5H176.1L288 298H230.1L198.3 220.5ZM100.5 175.2H183.3L142.2 64.8L100.5 175.2Z"/>
      <path d="M391.5 230.7H294.6V182.7H391.5V230.7Z"/>
      <path d="M568.8 215.7H457.8L440.4 298H386.4L468.3 7.5H558L642.6 298H586.5L568.8 215.7ZM470.1 170.1H556.2L513.6 57.3L470.1 170.1Z"/>
      <path d="M724.8 298H672.9V7.5H724.8V298Z"/>
      <path d="M808.2 298H756.3V7.5H808.2V298Z"/>
      <path d="M949.2 123.6C949.2 168.9 934.8 204.3 906.3 229.5C877.8 254.7 837.9 267.3 786.3 267.3H762.3V217.2H783.3C815.1 217.2 839.4 208.2 856.2 190.2C873 172.2 881.1 148.8 880.5 120C881.1 90.6 873 67.5 856.2 50.4C839.4 33.3 815.1 24.3 783.3 24.3H762.3V-25.8H786.3C837.9 -25.8 877.8 -13.2 906.3 11.4C934.8 36 949.2 71.4 949.2 123.6Z"/>
      <path d="M1167.6 298H1042.2L1015.8 217.2H955.5L945.3 298H891L927.6 7.5H1027.4L1122.6 298H1167.6ZM1012.7 173.1H1078.2L1046.4 71.4L1012.7 173.1Z"/>
    </g>
  </svg>
</div>

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
