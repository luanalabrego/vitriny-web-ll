// src/app/login/page.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login')
      }

      router.replace('/')
    } catch (err: any) {
      setErro(err.message || 'Ocorreu um erro ao fazer login')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50">
      {/* Watermark de fundo (mesma da página principal) */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/watermark.png"
          alt="Watermark background"
          fill
          className="object-cover opacity-25"
          priority
        />
      </div>

      {/* Card de login */}
      <div className="relative z-10 bg-white rounded-lg shadow p-8 w-full max-w-md border-2 border-purple-600">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/Vitriny.png"
            alt="Vitriny Web"
            width={160}
            height={50}
            priority
          />
        </div>

        <p className="text-gray-600 mb-6 text-center">
          Faça login na sua conta
        </p>

        {erro && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{erro}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="senha" className="sr-only">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              placeholder="Senha"
              className="w-full px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem conta?{' '}
          <Link href="/registro" className="text-purple-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
