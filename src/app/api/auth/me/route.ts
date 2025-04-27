// src/app/api/auth/me/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const usuario = getAuthUser()
  if (!usuario) {
    return NextResponse.json(
      { error: 'Não autenticado' },
      { status: 401 }
    )
  }
  return NextResponse.json(usuario)
}
