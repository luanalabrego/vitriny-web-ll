// src/app/api/produtos/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import admin from '@/lib/firebaseAdmin'

// GET: lista apenas os produtos do usuário logado
export async function GET(request: Request) {
  const sessionCookie = cookies().get('session')?.value
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
    const uid = decoded.uid

    const produtos = await prisma.product.findMany({
      where: { userId: uid },
      select: {
        ean: true,
        descricao: true,
        marca: true,
        cor: true,
        tamanho: true,
        imageUrl: true,
        originalUrl: true
      }
    })

    return NextResponse.json(produtos, { status: 200 })
  } catch (err: any) {
    console.error('[API /api/produtos] GET auth error:', err)
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
}

// POST: cria um novo produto associado ao usuário logado
export async function POST(request: Request) {
  const sessionCookie = cookies().get('session')?.value
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

    const novoProduto = await prisma.product.create({
      data: {
        ean: ean.trim(),
        descricao,
        marca,
        cor,
        tamanho,
        imageUrl,
        originalUrl,
        userId: uid      // associa ao usuário
      }
    })

    return NextResponse.json(novoProduto, { status: 201 })
  } catch (err: any) {
    console.error('[API /api/produtos] POST error:', err)
    // Se for erro de autenticação, retornamos 401
    if (err.code === 'auth/argument-error' || err.code === 'auth/id-token-expired') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
