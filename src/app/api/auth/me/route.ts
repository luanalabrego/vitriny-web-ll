// src/app/api/auth/me/route.ts

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('vitriny_auth')
  if (!cookie) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }
  const user = JSON.parse(cookie.value)
  return NextResponse.json(user)
}
