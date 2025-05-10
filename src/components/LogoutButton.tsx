// src/components/LogoutButton.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    })
    router.replace('/login')
  }

  return (
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
  )
}
