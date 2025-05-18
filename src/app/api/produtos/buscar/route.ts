// src/app/api/produtos/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prodId = Number(params.id);
  const produto = await prisma.product.findUnique({
    where: { id: prodId },
    select: {
      id: true,
      ean: true,
      marca: true,
      originalUrl: true,
      imageUrl: true,
      aprovacao: true,
      observacao: true,
      createdAt: true,
      descricao: true,
      cor: true,
      tamanho: true,
    },
  });
  if (!produto) {
    return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
  }
  return NextResponse.json(produto);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { aprovacao, observacao } = await request.json();
    const updated = await prisma.product.update({
      where: { id: Number(params.id) },
      data: { aprovacao, observacao },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error('[API PATCH /api/produtos/[id]] error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prodId = Number(params.id);

  // 1) Verifica existência
  const exists = await prisma.product.findUnique({
    where: { id: prodId },
    select: { id: true },
  });
  if (!exists) {
    return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
  }

  try {
    // 2) Deleta o registro
    await prisma.product.delete({
      where: { id: prodId },
    });
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    console.error('[API DELETE /api/produtos/[id]] error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
