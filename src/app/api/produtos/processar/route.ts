import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Diretórios para armazenamento de imagens
const UPLOAD_DIR = '/home/ubuntu/vitriny-web/public/uploads';
const PROCESSED_DIR = '/home/ubuntu/vitriny-web/public/processed';

// Função para garantir que os diretórios existam
async function ensureDirExists(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Erro ao criar diretório ${dir}:`, error);
    throw error;
  }
}

// Função para salvar imagem do FormData
async function saveImage(file: File, dir: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Gerar nome único para o arquivo
  const uniqueId = uuidv4();
  const originalName = file.name;
  const extension = originalName.split('.').pop() || 'jpg';
  const fileName = `${uniqueId}.${extension}`;
  const filePath = join(dir, fileName);
  
  await writeFile(filePath, buffer);
  return filePath;
}

// Função para processar imagem com OpenAI
async function processImage(imagePath: string, tipoGeracao: string): Promise<string> {
  // Definir o prompt com base no tipo de geração
  let prompt = '';
  
  if (tipoGeracao === 'frente') {
    prompt = `Create a high-quality studio photo of a model wearing the exact same outfit as shown in the reference image.

The model should be standing naturally, facing the camera, with a casual and spontaneous pose (such as one hand on the hip, slight smile, or relaxed arms).

The background must be a clean, plain studio background (white or light gray), with soft, even lighting — no shadows or distractions.

Focus on accurately replicating the outfit's color, texture, and fit.

The final image should look professional and suitable for an e-commerce catalog, highlighting the clothing clearly and elegantly.`;
  } else if (tipoGeracao === 'costas') {
    prompt = `Create a high-quality studio photo of a model wearing the exact same outfit as shown in the reference image.

The model should be standing naturally, with her BACK TO THE CAMERA, showing the back view of the outfit.

The background must be a clean, plain studio background (white or light gray), with soft, even lighting — no shadows or distractions.

Focus on accurately replicating the outfit's color, texture, and fit from the back view.

The final image should look professional and suitable for an e-commerce catalog, highlighting the clothing clearly and elegantly from behind.`;
  }

  // Gerar nome para a imagem processada
  const fileName = imagePath.split('/').pop() || '';
  const processedFileName = `processed_${fileName}`;
  const processedPath = join(PROCESSED_DIR, processedFileName);
  
  // Simulação de processamento para desenvolvimento
  // Em produção, faria uma chamada real à API da OpenAI
  
  // Copiar a imagem original para simular o processamento
  try {
    // Aqui seria a chamada para a API da OpenAI
    // Por enquanto, apenas retornamos o caminho simulado
    return processedPath;
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Garantir que os diretórios existam
    await ensureDirExists(UPLOAD_DIR);
    await ensureDirExists(PROCESSED_DIR);
    
    const formData = await request.formData();
    const ean = formData.get('ean') as string;
    const descricao = formData.get('descricao') as string;
    const marca = formData.get('marca') as string;
    const cor = formData.get('cor') as string;
    const tamanho = formData.get('tamanho') as string;
    const tipoGeracao = formData.get('tipoGeracao') as string;
    const imagem = formData.get('imagem') as File;
    
    if (!imagem || !ean || !descricao || !marca || !cor || !tamanho || !tipoGeracao) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Salvar imagem original
    const imagePath = await saveImage(imagem, UPLOAD_DIR);
    
    // Processar imagem
    const processedImagePath = await processImage(imagePath, tipoGeracao);
    
    // Simulação de banco de dados para desenvolvimento
    // Em produção, salvaria no banco de dados real
    
    // Retornar sucesso com os caminhos das imagens
    return NextResponse.json({
      success: true,
      message: 'Produto processado com sucesso',
      data: {
        produtoId: Math.floor(Math.random() * 1000) + 1, // ID simulado
        imagemOriginal: `/uploads/${imagePath.split('/').pop()}`,
        imagemProcessada: `/processed/${processedImagePath.split('/').pop()}`
      }
    });
  } catch (error) {
    console.error('Erro ao processar produto:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
