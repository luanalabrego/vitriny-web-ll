// src/app/api/produtos/[id]/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { aprovacao, observacao } = await request.json()

    const updated = await prisma.product.update({
      where: { id: Number(params.id) },
      data: { aprovacao, observacao }
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    console.error('[API PATCH /api/produtos/[id]] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: Number(params.id) }
    })
    return new NextResponse(null, { status: 204 })
  } catch (err: any) {
    console.error('[API DELETE /api/produtos/[id]] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
