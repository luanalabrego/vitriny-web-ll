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

// Função para salvar imagens do FormData
async function saveImages(files: File[], dir: string): Promise<string[]> {
  const filePaths = [];
  
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Gerar nome único para o arquivo
    const uniqueId = uuidv4();
    const originalName = file.name;
    const extension = originalName.split('.').pop() || 'jpg';
    const fileName = `${uniqueId}.${extension}`;
    const filePath = join(dir, fileName);
    
    await writeFile(filePath, buffer);
    filePaths.push(filePath);
  }
  
  return filePaths;
}

// Função para processar imagens com OpenAI
async function processImages(imagePaths: string[], tipoGeracao: string): Promise<string[]> {
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

  const processedPaths = [];
  
  for (const imagePath of imagePaths) {
    // Gerar nome para a imagem processada
    const fileName = imagePath.split('/').pop() || '';
    const processedFileName = `processed_${fileName}`;
    const processedPath = join(PROCESSED_DIR, processedFileName);
    
    // Simulação de processamento para desenvolvimento
    // Em produção, faria uma chamada real à API da OpenAI
    processedPaths.push(processedPath);
  }
  
  return processedPaths;
}

export async function POST(request: NextRequest) {
  try {
    // Garantir que os diretórios existam
    await ensureDirExists(UPLOAD_DIR);
    await ensureDirExists(PROCESSED_DIR);
    
    const formData = await request.formData();
    const ean = formData.get('ean') as string;
    const marca = formData.get('marca') as string;
    const cor = formData.get('cor') as string;
    const tamanho = formData.get('tamanho') as string;
    const tipoGeracao = formData.get('tipoGeracao') as string;
    
    // Obter todas as imagens do FormData
    const imagensFormData = formData.getAll('imagens') as File[];
    
    if (imagensFormData.length === 0 || !ean || !marca || !cor || !tamanho || !tipoGeracao) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Salvar imagens originais
    const imagePaths = await saveImages(imagensFormData, UPLOAD_DIR);
    
    // Processar imagens
    const processedImagePaths = await processImages(imagePaths, tipoGeracao);
    
    // Simulação de banco de dados para desenvolvimento
    // Em produção, salvaria no banco de dados real
    
    // Preparar resultados
    const resultados = [];
    
    for (let i = 0; i < imagePaths.length; i++) {
      const imagemOriginal = imagePaths[i];
      const imagemProcessada = processedImagePaths[i];
      
      resultados.push({
        imagemOriginal: `/uploads/${imagemOriginal.split('/').pop()}`,
        imagemProcessada: `/processed/${imagemProcessada.split('/').pop()}`
      });
    }
    
    // Retornar sucesso com os caminhos das imagens
    return NextResponse.json({
      success: true,
      message: `${imagePaths.length} imagens processadas com sucesso`,
      data: {
        produtoId: Math.floor(Math.random() * 1000) + 1, // ID simulado
        resultados
      }
    });
  } catch (error) {
    console.error('Erro ao processar imagens em massa:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
