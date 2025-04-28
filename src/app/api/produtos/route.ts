// src/app/api/produtos/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'  // ajuste o caminho se necessário

export async function GET() {
  try {
    const produtos = await prisma.product.findMany()
    return NextResponse.json(produtos)
  } catch (err: any) {
    console.error('[API /api/produtos] error:', err)
    return NextResponse.json(
      { error: err.message, stack: err.stack },
      { status: 500 }
    )
  }
}
