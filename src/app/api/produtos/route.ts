// src/app/api/produtos/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const produtos = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(produtos);
  } catch (err: any) {
    console.error('Erro GET /api/produtos:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { ean, descricao, marca, cor, tamanho, imageUrl, originalUrl } = await request.json();
    if (!ean || !descricao || !marca || !cor || !tamanho || !imageUrl || !originalUrl) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios: ean, descricao, marca, cor, tamanho, imageUrl, originalUrl' },
        { status: 400 }
      );
    }

    const produto = await prisma.product.create({
      data: { ean, descricao, marca, cor, tamanho, imageUrl, originalUrl }
    });

    return NextResponse.json(produto, { status: 201 });
  } catch (err: any) {
    console.error('Erro POST /api/produtos:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
