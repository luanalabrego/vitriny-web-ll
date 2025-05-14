// src/app/api/produtos/gerar-imagem/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { FormData } from 'undici'
import { Blob } from 'buffer'
import { bucket } from '@/lib/gcs'
import prisma from '@/lib/prisma'
import admin from '@/lib/firebaseAdmin'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // ————————————————
    // 1) Autenticação
    // ————————————————
    const allSession = cookies().getAll('session')
    const sessionCookie = allSession.length > 0
      ? allSession[allSession.length - 1].value
      : undefined

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    let uid: string
    try {
      const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
      uid = decoded.uid
    } catch (err) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // ————————————————
    // 2) Validação do payload
    // ————————————————
    const {
      ean,
      fileName,
      prompt,
      descricao = '',
      marca     = '',
      cor       = '',
      tamanho   = ''
    } = await request.json()

    if (!ean?.trim() || !fileName) {
      return NextResponse.json(
        { error: '`ean` e `fileName` são obrigatórios.' },
        { status: 400 }
      )
    }

    // ————————————————
    // 3) Baixa imagem original do GCS
    // ————————————————
    const origFile = bucket.file(fileName)
    const [origBuf] = await origFile.download()

    // ————————————————
    // 4) Chama API OpenAI de edição
    // ————————————————
    const key = process.env.OPENAI_API_KEY
    if (!key) {
      return NextResponse.json({ error: 'OPENAI_API_KEY não definida' }, { status: 500 })
    }

    const imageBlob = new Blob([origBuf], { type: 'image/png' })
    const formData = new FormData()
    formData.append('model', 'gpt-image-1')
    formData.append('image', imageBlob, `${ean}-orig.png`)
    formData.append('prompt', prompt)
    formData.append('n', '1')
    formData.append('size', '1024x1536')
    formData.append('quality', 'high')

    const openaiRes = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
      body: formData
    })
    const openaiJson = await openaiRes.json()

    if (!openaiRes.ok) {
      return NextResponse.json(
        { error: openaiJson.error?.message || JSON.stringify(openaiJson.error) },
        { status: openaiRes.status }
      )
    }

    // ————————————————
    // 5) Salva imagem editada no GCS
    // ————————————————
    const b64     = openaiJson.data[0].b64_json as string
    const editBuf = Buffer.from(b64, 'base64')
    const outFile = bucket.file(`produtos/${ean}.png`)
    await outFile.save(editBuf, { contentType: 'image/png', resumable: false })
    await outFile.makePublic()
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/produtos/${ean}.png`

    // ————————————————
    // 6) Registra no banco (vinculando userId)
    // ————————————————
    // Atenção: é preciso ter no seu schema Prisma uma
    // chave única composta em (ean, userId) para que upsert funcione:
    //
    // model Product {
    //   id           String @id @default(cuid())
    //   ean          String
    //   userId       String
    //   descricao    String
    //   marca        String
    //   cor          String
    //   tamanho      String
    //   imageUrl     String
    //   originalUrl  String?
    //
    //   @@unique([ean, userId])
    // }
    //

    const produto = await prisma.product.upsert({
      where: { ean_userId: { ean, userId: uid } },
      create: {
        ean:         ean.trim(),
        userId:      uid,
        descricao,
        marca,
        cor,
        tamanho,
        imageUrl:    publicUrl,
        originalUrl: null
      },
      update: {
        imageUrl: publicUrl,
        descricao,
        marca,
        cor,
        tamanho
      }
    })

    return NextResponse.json({ produto }, { status: 200 })
  } catch (err: any) {
    console.error('Erro em gerar-imagem:', err)
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    )
  }
}
