// src/app/api/produtos/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET: lista produtos (agora trazendo id, label e observacao)
export async function GET(request: Request) {
  try {
    const produtos = await prisma.product.findMany({
      select: {
        id: true,
        ean: true,
        descricao: true,
        marca: true,
        cor: true,
        tamanho: true,
        originalUrl: true,
        imageUrl: true,
        label: true,
        observacao: true,
      }
    })
    return NextResponse.json(produtos, { status: 200 })
  } catch (err: any) {
    console.error('[API /api/produtos] GET error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST: cria um novo produto (label e observacao ficam nulos)
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
        // label e observacao serão null por padrão
      }
    })

    return NextResponse.json(novoProduto, { status: 201 })
  } catch (err: any) {
    console.error('[API /api/produtos] POST error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
