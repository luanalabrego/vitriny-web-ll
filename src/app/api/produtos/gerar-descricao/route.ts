// src/app/api/produtos/gerar-descricao/route.ts

import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';
import Jimp from 'jimp';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const formData = await request.formData();
  const imageBlob = formData.get('image');

  if (!(imageBlob instanceof Blob)) {
    return NextResponse.json(
      { error: 'Arquivo de imagem obrigatório.' },
      { status: 400 }
    );
  }

  // Converte a imagem para Buffer
  const arrayBuffer = await imageBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Usa Jimp para calcular cor dominante
  const image = await Jimp.read(buffer);
  const small = image.resize(1, 1);
  const hex = small.getPixelColor(0, 0);
  const { r, g, b } = Jimp.intToRGBA(hex);
  const cor = `rgb(${r}, ${g}, ${b})`;

  // Descrição placeholder
  const descricao = '(preencher)';

  return NextResponse.json({ cor, descricao });
}
