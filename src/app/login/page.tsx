'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'  // ajuste o path se necessário

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
      // Autentica no Firebase
      await signInWithEmailAndPassword(auth, email.trim(), senha)
      // Se der certo, redireciona pra página inicial
      router.replace('/')
    } catch (firebaseError: any) {
      // Captura erro do Firebase e mostra mensagem amigável
      let mensagem = 'Ocorreu um erro ao fazer login.'
      if (firebaseError.code === 'auth/user-not-found') {
        mensagem = 'Usuário não encontrado.'
      } else if (firebaseError.code === 'auth/wrong-password') {
        mensagem = 'Senha incorreta.'
      } else if (firebaseError.code === 'auth/invalid-email') {
        mensagem = 'Formato de email inválido.'
      }
      setErro(mensagem)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/watermark.png"
          alt="Watermark background"
          fill
          className="object-cover opacity-25"
          priority
        />
      </div>

      <div className="relative z-10 bg-white rounded-lg shadow p-8 w-full max-w-md border-2 border-purple-600">
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
