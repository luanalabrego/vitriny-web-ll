import { NextRequest, NextResponse } from 'next/server';

// Simulação de imagens para demonstração
const imagensDemo = [
  { id: 1, produto_id: 1, tipo_geracao: 'frente', caminho_original: '/uploads/demo1_original.jpg', caminho_processado: '/processed/demo1_processado.jpg', status: 'concluido', data_criacao: '2025-04-25' },
  { id: 2, produto_id: 1, tipo_geracao: 'costas', caminho_original: '/uploads/demo1_original_costas.jpg', caminho_processado: '/processed/demo1_processado_costas.jpg', status: 'concluido', data_criacao: '2025-04-25' },
  { id: 3, produto_id: 2, tipo_geracao: 'frente', caminho_original: '/uploads/demo2_original.jpg', caminho_processado: '/processed/demo2_processado.jpg', status: 'concluido', data_criacao: '2025-04-25' },
  { id: 4, produto_id: 3, tipo_geracao: 'frente', caminho_original: '/uploads/demo3_original.jpg', caminho_processado: '/processed/demo3_processado.jpg', status: 'concluido', data_criacao: '2025-04-24' },
  { id: 5, produto_id: 4, tipo_geracao: 'frente', caminho_original: '/uploads/demo4_original.jpg', caminho_processado: '/processed/demo4_processado.jpg', status: 'concluido', data_criacao: '2025-04-24' },
  { id: 6, produto_id: 5, tipo_geracao: 'frente', caminho_original: '/uploads/demo5_original.jpg', caminho_processado: '/processed/demo5_processado.jpg', status: 'concluido', data_criacao: '2025-04-23' },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const produtoId = searchParams.get('produto_id');
    
    if (!produtoId) {
      return NextResponse.json(
        { message: 'ID do produto é obrigatório' },
        { status: 400 }
      );
    }
    
    // Filtrar imagens do produto
    const imagens = imagensDemo.filter(img => img.produto_id.toString() === produtoId);
    
    return NextResponse.json({
      success: true,
      imagens: imagens.map(img => ({
        ...img,
        imagemOriginal: `/uploads/${img.caminho_original.split('/').pop()}`,
        imagemProcessada: `/processed/${img.caminho_processado.split('/').pop()}`
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar imagens do produto:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar imagens do produto' },
      { status: 500 }
    );
  }
}
