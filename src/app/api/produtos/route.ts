// src/app/api/produtos/route.ts
export const runtime = 'nodejs'  // ← garante ambiente Node.js

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import admin from '@/lib/firebaseAdmin'

export async function GET(request: Request) {
  // 1) log do header cru de cookies
  console.log('[API /api/produtos] Cookie header:', request.headers.get('cookie'))

  // 2) pegue todos os cookies "session" e escolha o último (mais recente)
  const allSession = cookies().getAll('session')
  const sessionCookie = allSession.length > 0
    ? allSession[allSession.length - 1].value
    : undefined

  console.log('[API /api/produtos] sessionCookie chosen:', sessionCookie)

  // 3) tente decodificar o UID, mas sem fazer 401
  let uid: string | undefined
  if (sessionCookie) {
    try {
      const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
      console.log('[API /api/produtos] sessão válida, uid =', decoded.uid)
      uid = decoded.uid
    } catch (err) {
      console.warn('[API /api/produtos] falha ao validar sessionCookie:', err.code || err)
    }
  } else {
    console.log('[API /api/produtos] sem sessionCookie – seguindo com lista vazia')
  }

  // 4) busque produtos só se tiver uid; senão retorna lista vazia
  const produtos = uid
    ? await prisma.product.findMany({
        where: { userId: uid },
        select: {
          ean: true,
          descricao: true,
          marca: true,
          cor: true,
          tamanho: true,
          imageUrl: true,
          originalUrl: true,
        },
      })
    : []

  console.log(`[API /api/produtos] retornando ${produtos.length} produto(s)`)

  return NextResponse.json(produtos)
}

export async function POST(request: Request) {
  // Mantém a criação protegida como antes:
  const allSession = cookies().getAll('session')
  const sessionCookie = allSession.length > 0
    ? allSession[allSession.length - 1].value
    : undefined

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
    const uid = decoded.uid

    const {
      ean,
      imageUrl,
      originalUrl = null,
      descricao   = '',
      marca       = '',
      cor         = '',
      tamanho     = ''
    } = await request.json()

    if (!ean?.trim() || !imageUrl) {
      return NextResponse.json(
        { error: 'Campos `ean` e `imageUrl` são obrigatórios.' },
        { status: 400 }
      )
    }

    const novo = await prisma.product.create({
      data: {
        ean: ean.trim(),
        descricao,
        marca,
        cor,
        tamanho,
        imageUrl,
        originalUrl,
        userId: uid,
      },
    })

    console.log('[API /api/produtos] novo produto criado:', novo.id)
    return NextResponse.json(novo, { status: 201 })
  } catch (err: any) {
    console.error('[API /api/produtos] POST falhou:', err)
    return NextResponse.json(
      { error: err.code?.includes('auth/') ? 'Não autorizado' : err.message },
      { status: err.code?.includes('auth/') ? 401 : 500 }
    )
  }
}
