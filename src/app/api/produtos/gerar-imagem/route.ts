// src/app/api/produtos/gerar-imagem/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FormData } from 'undici';
import { Blob } from 'buffer';
import { bucket } from '@/lib/gcs';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json({ error: 'OPENAI_API_KEY não definida' }, { status: 500 });
    }

    const { ean, fileName, prompt, descricao, marca, cor, tamanho } = await request.json();
    if (!ean || !fileName) {
      return NextResponse.json(
        { error: '`ean` e `fileName` são obrigatórios.' },
        { status: 400 }
      );
    }

    // 1) baixa o original do GCS
    const origFile = bucket.file(fileName);
    const [origBuf] = await origFile.download();

    // 2) prepara FormData com undici, convertendo Buffer em Blob
    const imageBlob = new Blob([origBuf], { type: 'image/png' });
    const formData = new FormData();
    formData.append('model', 'gpt-image-1');
    formData.append('image', imageBlob, `${ean}-orig.png`);
    formData.append('prompt', prompt);
    formData.append('n', '1');
    formData.append('size', '1024x1536');
    formData.append('quality', 'high');  // <— define qualidade alta

    // 3) chama a API de edição de imagem
    const openaiRes = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
      body: formData
    });
    const openaiJson = await openaiRes.json();
    if (!openaiRes.ok) {
      return NextResponse.json(
        { error: openaiJson.error?.message || JSON.stringify(openaiJson.error) },
        { status: openaiRes.status }
      );
    }

    // 4) processa e salva no GCS
    const b64 = openaiJson.data[0].b64_json as string;
    const editBuf = Buffer.from(b64, 'base64');
    const outFile = bucket.file(`produtos/${ean}.png`);
    await outFile.save(editBuf, { contentType: 'image/png', resumable: false });
    await outFile.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/produtos/${ean}.png`;

    // 5) retorna meta + url
    return NextResponse.json(
      { meta: { ean, prompt, descricao, marca, cor, tamanho }, url: publicUrl },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Erro em gerar-imagem:', err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
