// src/app/api/produtos/gerar-imagem/route.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

export const runtime = 'nodejs'
export const config = { api: { bodyParser: false } }

export async function POST(request: NextRequest) {
  try {
    console.log('🏁 Iniciando /api/produtos/gerar-imagem')

    // 1) Leia todo o formData
    const formData = await request.formData()
    console.log('📋 Campos recebidos:', Array.from(formData.keys()))

    // 2) Extraia metadados
    const ean        = formData.get('ean')?.toString() ?? `${Date.now()}`
    const descricao = formData.get('descricao')?.toString() ?? ''
    const marca     = formData.get('marca')?.toString() ?? ''
    const cor       = formData.get('cor')?.toString() ?? ''
    const tamanho   = formData.get('tamanho')?.toString() ?? ''

    // 3) Extraia o blob da imagem original
    const imageBlob = formData.get('image')
    if (!(imageBlob instanceof Blob)) {
      return NextResponse.json({ error: 'Campo `image` obrigatório.' }, { status: 400 })
    }

    // 4) Converta em Buffer e salve em /tmp
    const arrBuf     = await imageBlob.arrayBuffer()
    const origBuffer = Buffer.from(arrBuf)
    const uploadDir  = os.tmpdir()
    const origName   = `${ean}-orig.png`
    const origPath   = path.join(uploadDir, origName)
    await fs.writeFile(origPath, origBuffer)
    console.log('💾 Original salva em (tmp):', origPath)

    // 5) Limpe metadados do formData antes de enviar à OpenAI
    ;['ean','descricao','marca','cor','tamanho'].forEach(k => formData.delete(k))

    // 6) Chame a API de edição de imagem da OpenAI
    const openaiRes  = await fetch('https://api.openai.com/v1/images/edits', {
      method:  'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY!}` },
      body:    formData
    })
    const openaiJson = await openaiRes.json()
    if (!openaiRes.ok) {
      console.error('❌ OpenAI error:', openaiJson)
      return NextResponse.json(
        { error: openaiJson.error?.message || JSON.stringify(openaiJson.error) },
        { status: openaiRes.status }
      )
    }
    console.log('✅ OpenAI respondeu com sucesso')

    // 7) Decode e salve a imagem ajustada em /tmp
    const b64      = openaiJson.data[0].b64_json as string
    const editBuf  = Buffer.from(b64, 'base64')
    const editName = `${ean}.png`
    const editPath = path.join(uploadDir, editName)
    await fs.writeFile(editPath, editBuf)
    console.log('💾 Ajustada salva em (tmp):', editPath)

    // 8) Retorne tudo como campos esperados pelo front-end
    const originalDataURL = `data:image/png;base64,${origBuffer.toString('base64')}`
    const editedDataURL   = `data:image/png;base64,${editBuf.toString('base64')}`

    return NextResponse.json({
      meta: { ean, descricao, marca, cor, tamanho },
      originalUrl: originalDataURL,
      url: editedDataURL
    }, { status: 200 })

  } catch (err: any) {
    console.error('🔥 Exceção em gerar-imagem:', err)
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    )
  }
}
