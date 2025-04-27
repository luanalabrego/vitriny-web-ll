import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Diretórios para armazenamento de imagens
const UPLOAD_DIR = '/home/ubuntu/vitriny-web/public/uploads';
const PROCESSED_DIR = '/home/ubuntu/vitriny-web/public/processed';
const DOWNLOAD_DIR = '/home/ubuntu/vitriny-web/public/downloads';

// Função para garantir que os diretórios existam
async function ensureDirExists(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Erro ao criar diretório ${dir}:`, error);
    throw error;
  }
}

// Simulação de produtos para demonstração
const produtosDemo = [
  { id: 1, ean: '7891234567890', descricao: 'Vestido preto curto com alças removíveis', marca: 'Fashion BR', cor: 'Preto', tamanho: 'M', data_criacao: '2025-04-25', empresa_id: 1 },
  { id: 2, ean: '7891234567891', descricao: 'Calça jeans skinny com rasgos', marca: 'Fashion BR', cor: 'Azul', tamanho: '38', data_criacao: '2025-04-25', empresa_id: 1 },
  { id: 3, ean: '7891234567892', descricao: 'Blusa de algodão com estampa floral', marca: 'Elegance', cor: 'Branco', tamanho: 'P', data_criacao: '2025-04-24', empresa_id: 1 },
  { id: 4, ean: '7891234567893', descricao: 'Jaqueta de couro sintético', marca: 'Urban Style', cor: 'Marrom', tamanho: 'G', data_criacao: '2025-04-24', empresa_id: 1 },
  { id: 5, ean: '7891234567894', descricao: 'Saia midi plissada', marca: 'Elegance', cor: 'Verde', tamanho: 'M', data_criacao: '2025-04-23', empresa_id: 1 },
];

// Simulação de imagens para demonstração
const imagensDemo = [
  { id: 1, produto_id: 1, tipo_geracao: 'frente', caminho_original: '/uploads/demo1_original.jpg', caminho_processado: '/processed/demo1_processado.jpg', status: 'concluido', data_criacao: '2025-04-25' },
  { id: 2, produto_id: 1, tipo_geracao: 'costas', caminho_original: '/uploads/demo1_original_costas.jpg', caminho_processado: '/processed/demo1_processado_costas.jpg', status: 'concluido', data_criacao: '2025-04-25' },
  { id: 3, produto_id: 2, tipo_geracao: 'frente', caminho_original: '/uploads/demo2_original.jpg', caminho_processado: '/processed/demo2_processado.jpg', status: 'concluido', data_criacao: '2025-04-25' },
  { id: 4, produto_id: 3, tipo_geracao: 'frente', caminho_original: '/uploads/demo3_original.jpg', caminho_processado: '/processed/demo3_processado.jpg', status: 'concluido', data_criacao: '2025-04-24' },
  { id: 5, produto_id: 4, tipo_geracao: 'frente', caminho_original: '/uploads/demo4_original.jpg', caminho_processado: '/processed/demo4_processado.jpg', status: 'concluido', data_criacao: '2025-04-24' },
  { id: 6, produto_id: 5, tipo_geracao: 'frente', caminho_original: '/uploads/demo5_original.jpg', caminho_processado: '/processed/demo5_processado.jpg', status: 'concluido', data_criacao: '2025-04-23' },
];

export async function POST(request: NextRequest) {
  try {
    // Garantir que os diretórios existam
    await ensureDirExists(DOWNLOAD_DIR);
    
    const { produtoIds } = await request.json();
    
    if (!produtoIds || !Array.isArray(produtoIds) || produtoIds.length === 0) {
      return NextResponse.json(
        { message: 'É necessário selecionar pelo menos um produto' },
        { status: 400 }
      );
    }
    
    // Simulação de download para desenvolvimento
    // Em produção, criaria um arquivo ZIP real com as imagens
    
    // Gerar nome único para o arquivo ZIP simulado
    const zipFileName = `produtos_${uuidv4()}.zip`;
    
    return NextResponse.json({
      success: true,
      downloadUrl: `/downloads/${zipFileName}`,
      message: `Download preparado para ${produtoIds.length} produtos`
    });
  } catch (error) {
    console.error('Erro ao gerar download:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar arquivo para download' },
      { status: 500 }
    );
  }
}
