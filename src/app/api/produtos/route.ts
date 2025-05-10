// src/app/api/produtos/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET: lista produtos (agora trazendo imageUrl e originalUrl)
export async function GET(request: Request) {
  try {
    const produtos = await prisma.product.findMany({
      select: {
        ean: true,
        descricao: true,
        marca: true,
        cor: true,
        tamanho: true,
        imageUrl: true,     // inclui a URL da imagem ajustada
        originalUrl: true   // inclui a URL da imagem original (opcional)
      }
    })
    return NextResponse.json(produtos, { status: 200 })
  } catch (err: any) {
    console.error('[API /api/produtos] GET error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST: cria um novo produto
export async function POST(request: Request) {
  try {
    const {
      ean,
      imageUrl,
      originalUrl = null,
      descricao   = '',
      marca       = '',
      cor         = '',
      tamanho     = ''
    } = await request.json()

    // valida apenas ean e imageUrl
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
        originalUrl
      }
    })

    return NextResponse.json(novoProduto, { status: 201 })
  } catch (err: any) {
    console.error('[API /api/produtos] POST error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
