// src/app/api/produtos/gerar-imagem/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { bucket } from '@/lib/gcs';

export const runtime = 'nodejs';
export const config = { api: { bodyParser: false } };

export async function POST(request: NextRequest) {
  try {
    console.log('🏁 Iniciando /api/produtos/gerar-imagem');

    const formData = await request.formData();
    console.log('📋 Campos recebidos:', Array.from(formData.keys()));

    // 1) ean é obrigatório
    const eanRaw = formData.get('ean')?.toString().trim();
    if (!eanRaw) {
      return NextResponse.json(
        { error: 'Campo `ean` obrigatório.' },
        { status: 400 }
      );
    }
    const ean = eanRaw;

    // 2) prompt opcional
    const prompt = formData.get('prompt')?.toString() ?? '';

    // 3) outros campos opcionais
    const descricao = formData.get('descricao')?.toString() ?? '';
    const marca     = formData.get('marca')?.toString()     ?? '';
    const cor       = formData.get('cor')?.toString()       ?? '';
    const tamanho   = formData.get('tamanho')?.toString()   ?? '';

    // 4) imagem obrigatória no campo `image`
    const imageBlob = formData.get('image');
    if (!(imageBlob instanceof Blob)) {
      return NextResponse.json(
        { error: 'Campo `image` obrigatório.' },
        { status: 400 }
      );
    }

    // 5) salva original em tmp
    const arrBuf   = await imageBlob.arrayBuffer();
    const origBuf  = Buffer.from(arrBuf);
    const uploadDir = os.tmpdir();
    const origName = `${ean}-orig.png`;
    const origPath = path.join(uploadDir, origName);
    await fs.writeFile(origPath, origBuf);
    console.log('💾 Original salva em (tmp):', origPath);

    // 6) remove apenas os metadados, mantém `prompt` e `image`
    ['ean', 'descricao', 'marca', 'cor', 'tamanho'].forEach(key => formData.delete(key));

    // 7) garante que o blob em `image` venha com nome de arquivo
    formData.set('image', imageBlob, origName);

    // 8) chama a API de edição de imagem
    const openaiRes = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY!}` },
      body: formData
    });
    const openaiJson = await openaiRes.json();
    if (!openaiRes.ok) {
      console.error('❌ OpenAI error:', openaiJson);
      return NextResponse.json(
        { error: openaiJson.error?.message || JSON.stringify(openaiJson.error) },
        { status: openaiRes.status }
      );
    }
    console.log('✅ OpenAI respondeu com sucesso');

    // 9) processa a resposta e faz upload
    const b64     = openaiJson.data[0].b64_json as string;
    const editBuf = Buffer.from(b64, 'base64');
    const file    = bucket.file(`produtos/${ean}.png`);

    await file.save(editBuf, { contentType: 'image/png', resumable: false });
    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/produtos/${ean}.png`;
    console.log('📤 Upload feito para Firebase Storage');
    console.log('🔗 URL pública:', publicUrl);

    // 10) retorna a meta incluindo o prompt
    return NextResponse.json(
      {
        meta: { ean, prompt, descricao, marca, cor, tamanho },
        url: publicUrl
      },
      { status: 200 }
    );

  } catch (err: any) {
    console.error('🔥 Exceção em gerar-imagem:', err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
