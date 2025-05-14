// src/app/api/produtos/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import admin from '@/lib/firebaseAdmin'

// Auxiliar para ler e validar a sessão, retornando o UID ou lançando um NextResponse 401
async function getUidFromSession(request: Request): Promise<string> {
  // 1) Log do header de cookies bruto
  console.log('[API /api/produtos] Cookie header:', request.headers.get('cookie'))

  // 2) Leia o cookie "session"
  const sessionCookie = cookies().get('session')?.value
  console.log('[API /api/produtos] sessionCookie:', sessionCookie)

  if (!sessionCookie) {
    console.warn('[API /api/produtos] sem sessionCookie – retornando 401')
    throw new NextResponse(
      JSON.stringify({ error: 'Não autorizado' }),
      { status: 401 }
    )
  }

  try {
    // 3) Verifique o sessionCookie e extraia o UID
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
    console.log('[API /api/produtos] sessão válida, uid =', decoded.uid)
    return decoded.uid
  } catch (err: any) {
    console.error('[API /api/produtos] erro ao verificar sessão:', err)
    throw new NextResponse(
      JSON.stringify({ error: 'Não autorizado' }),
      { status: 401 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const uid = await getUidFromSession(request)

    // 4) Busque produtos do usuário no banco
    const produtos = await prisma.product.findMany({
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
    console.log(`[API /api/produtos] produtos retornados: ${produtos.length}`)

    return NextResponse.json(produtos, { status: 200 })
  } catch (err: any) {
    // Se a exceção for um NextResponse, retorne-a diretamente
    if (err instanceof NextResponse) return err

    console.error('[API /api/produtos] GET falhou inesperadamente:', err)
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const uid = await getUidFromSession(request)

    // Leia e valide o body
    const {
      ean,
      imageUrl,
      originalUrl = null,
      descricao   = '',
      marca       = '',
      cor         = '',
      tamanho     = ''
    } = await request.json()
    console.log('[API /api/produtos] body recebido:', { ean, imageUrl, originalUrl, descricao, marca, cor, tamanho })

    if (!ean?.trim() || !imageUrl) {
      console.warn('[API /api/produtos] campos obrigatórios faltando')
      return NextResponse.json(
        { error: 'Campos `ean` e `imageUrl` são obrigatórios.' },
        { status: 400 }
      )
    }

    // Crie o produto associado ao usuário
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
    console.log('[API /api/produtos] novo produto criado:', novoProduto.id)

    return NextResponse.json(novoProduto, { status: 201 })
  } catch (err: any) {
    if (err instanceof NextResponse) return err

    console.error('[API /api/produtos] POST falhou inesperadamente:', err)
    return NextResponse.json(
      { error: err.message || 'Erro interno no servidor' },
      { status: 500 }
    )
  }
}
