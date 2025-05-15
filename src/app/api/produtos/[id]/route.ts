// src/app/api/produtos/[id]/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { label, observacao } = await request.json()

    const updated = await prisma.product.update({
      where: { id: Number(params.id) },
      data: { label, observacao }
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    console.error('[API /api/produtos/[id]] PATCH error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
