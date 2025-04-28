// src/app/api/produtos/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET: lista produtos (SEM trazer imageUrl agora)
export async function GET(request: Request) {
  try {
    const produtos = await prisma.product.findMany({
      select: {
        ean: true,
        descricao: true,
        marca: true,
        cor: true,
        tamanho: true
        // NÃO trazemos imageUrl, nem originalUrl
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
      descricao,
      marca,
      cor,
      tamanho,
      imageUrl,
      originalUrl
    } = await request.json()

    if (!ean || !descricao || !marca || !cor || !tamanho || !imageUrl) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando.' },
        { status: 400 }
      )
    }

    const novoProduto = await prisma.product.create({
      data: {
        ean,
        descricao,
        marca,
        cor,
        tamanho,
        imageUrl,
        originalUrl: originalUrl || null
      }
    })

    return NextResponse.json(novoProduto, { status: 201 })
  } catch (err: any) {
    console.error('[API /api/produtos] POST error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
