// src/app/login/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  // Ao montar, verifica se já existe sessão ativa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User already logged in, redirecting to /')
        router.push('/')
      }
    })
    return unsubscribe
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      // Login no Firebase Auth
      const cred = await signInWithEmailAndPassword(auth, email.trim(), senha)
      console.log('Firebase signInWithEmailAndPassword successful:', cred.user.uid)

      // Pega ID token JWT
      const idToken = await cred.user.getIdToken()
      console.log('Obtained ID token')

      // Envia ao API para criar cookie de sessão
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token: idToken }),
      })
      console.log('API /auth/login response:', res.status)

      if (!res.ok) {
        const errorBody = await res.text()
        console.error('Error response body:', errorBody)
        throw new Error('Não foi possível criar sessão no servidor.')
      }

      // Redireciona para o dashboard (raiz)
      console.log('Redirecting to /')
      router.push('/')
    } catch (fError: any) {
      console.error('Auth error:', fError.code, fError.message)
      let msg = 'Ocorreu um erro ao fazer login.'
      switch (fError.code) {
        case 'auth/user-not-found':
          msg = 'Usuário não encontrado.'
          break
        case 'auth/invalid-email':
          msg = 'Formato de e-mail inválido.'
          break
        case 'auth/wrong-password':
        case 'INVALID_LOGIN_CREDENTIALS':
        case 'auth/invalid-login-credentials':
          msg = 'E-mail ou senha incorretos.'
          break
        case 'auth/user-disabled':
          msg = 'Esta conta foi desativada.'
          break
        case 'auth/operation-not-allowed':
          msg = 'Login por e-mail/senha não está habilitado. Ative em Firebase Console → Authentication → Sign-in Method.'
          break
      }
      setErro(msg)
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
          <Image src="/Vitriny.png" alt="Vitriny Web" width={160} height={50} priority />
        </div>
        <p className="text-gray-600 mb-6 text-center">Faça login na sua conta</p>
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
