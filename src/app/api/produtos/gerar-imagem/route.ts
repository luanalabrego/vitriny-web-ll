// src/app/api/produtos/gerar-imagem/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const config = { api: { bodyParser: false } };

export async function POST(request: NextRequest) {
  try {
    console.log('🏁 Iniciando /api/produtos/gerar-imagem');

    // 1) Leia todo o formData
    const formData = await request.formData();
    console.log('📋 Campos recebidos:', Array.from(formData.keys()));

    // 2) Extraia metadados
    const ean = formData.get('ean')?.toString() || `${Date.now()}`;
    const descricao = formData.get('descricao')?.toString() || '';
    const marca = formData.get('marca')?.toString() || '';
    const cor = formData.get('cor')?.toString() || '';
    const tamanho = formData.get('tamanho')?.toString() || '';

    // 3) Extraia o blob da imagem original
    const imageBlob = formData.get('image');
    if (!(imageBlob instanceof Blob)) {
      return NextResponse.json({ error: 'Campo `image` obrigatório.' }, { status: 400 });
    }

    // 4) Salve a imagem original em /public/uploads/<ean>-orig.png
    const arrBuf = await imageBlob.arrayBuffer();
    const origBuffer = Buffer.from(arrBuf);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const origFilename = `${ean}-orig.png`;
    const origFilePath = path.join(uploadDir, origFilename);
    fs.writeFileSync(origFilePath, origBuffer);
    const originalUrl = `/uploads/${origFilename}`;
    console.log('💾 Original salva em:', origFilePath);

    // 5) Remova apenas os metadados antes de chamar a OpenAI
    ['ean','descricao','marca','cor','tamanho'].forEach(k => formData.delete(k));

    // 6) Chame a API de edição de imagem da OpenAI
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

    // 7) Decode e salve a imagem ajustada em /public/uploads/<ean>.png
    const b64 = openaiJson.data[0].b64_json as string;
    const buffer = Buffer.from(b64, 'base64');
    const filename = `${ean}.png`;
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    const imageUrl = `/uploads/${filename}`;
    console.log('💾 Ajustada salva em:', filePath);

    // 8) Retorne metadados, URL da ajustada e URL da original
    return NextResponse.json(
      { meta: { ean, descricao, marca, cor, tamanho }, url: imageUrl, originalUrl },
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
