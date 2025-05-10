// src/app/api/produtos/gerar-imagem/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { bucket } from '@/lib/gcs';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('🏁 Iniciando /api/produtos/gerar-imagem');

    // 1) espera JSON com ean, fileName (upload-url), prompt e metadados
    const { ean, fileName, prompt, descricao, marca, cor, tamanho } =
      await request.json();

    if (!ean) {
      return NextResponse.json(
        { error: 'Campo `ean` obrigatório.' },
        { status: 400 }
      );
    }
    if (!fileName) {
      return NextResponse.json(
        { error: 'Campo `fileName` obrigatório.' },
        { status: 400 }
      );
    }

    // 2) baixa o original do GCS
    const origFile = bucket.file(fileName);
    const [origBuf] = await origFile.download();
    console.log('💾 Original baixado do GCS:', fileName);

    // 3) monta o FormData para o OpenAI
    const formData = new FormData();
    formData.append('image', new Blob([origBuf]), `${ean}-orig.png`);
    formData.append('prompt', prompt);
    formData.append('n', '1');
    formData.append('size', '1024x1536');
    // se precisar, adicione outros campos:
    // formData.append('model', 'gpt-image-1');
    // formData.append('quality', 'high');

    // 4) chama a API de edição de imagem
    const openaiRes = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      },
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

    // 5) processa a resposta e faz upload do edit no GCS
    const b64     = openaiJson.data[0].b64_json as string;
    const editBuf = Buffer.from(b64, 'base64');
    const outFile = bucket.file(`produtos/${ean}.png`);

    await outFile.save(editBuf, { contentType: 'image/png', resumable: false });
    await outFile.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/produtos/${ean}.png`;
    console.log('📤 Upload feito para Firebase Storage:', publicUrl);

    // 6) retorna a URL pública e os metadados
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
