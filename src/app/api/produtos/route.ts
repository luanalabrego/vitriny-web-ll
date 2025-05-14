// src/app/api/produtos/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import admin from '@/lib/firebaseAdmin'

// Extrai o UID da sessão ou retorna undefined (em vez de lançar)
async function getUid(request: Request): Promise<string | undefined> {
  const sessionCookie = cookies().get('session')?.value
  if (!sessionCookie) return undefined
  try {
    const { uid } = await admin.auth().verifySessionCookie(sessionCookie, true)
    return uid
  } catch {
    return undefined
  }
}

export async function GET(request: Request) {
  try {
    const uid = await getUid(request)
    if (!uid) {
      // sem sessão válida: não expomos erro, apenas devolvemos lista vazia
      return NextResponse.json([], { status: 200 })
    }

    const produtos = await prisma.product.findMany({
      where: { userId: uid },
      select: {
        id: true,
        ean: true,
        descricao: true,
        marca: true,
        cor: true,
        tamanho: true,
        imageUrl: true,
        originalUrl: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(produtos, { status: 200 })
  } catch (err: any) {
    console.error('[GET /api/produtos] erro inesperado:', err)
    return NextResponse.json(
      { error: 'Erro interno ao buscar produtos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const uid = await getUid(request)
    if (!uid) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

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

    // Use create se quiser sempre inserir; para evitar duplicatas, troque por upsert:
    const novoProduto = await prisma.product.create({
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

    return NextResponse.json(novoProduto, { status: 201 })
  } catch (err: any) {
    console.error('[POST /api/produtos] erro inesperado:', err)
    return NextResponse.json(
      { error: 'Erro interno ao criar produto' },
      { status: 500 }
    )
  }
}
