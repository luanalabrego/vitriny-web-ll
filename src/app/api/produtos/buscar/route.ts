import { NextRequest, NextResponse } from 'next/server';

// Produtos de demonstração para desenvolvimento
const produtosDemo = [
  { id: 1, ean: '7891234567890', descricao: 'Vestido preto curto com alças removíveis', marca: 'Fashion BR', cor: 'Preto', tamanho: 'M', data_criacao: '2025-04-25', empresa_id: 1, total_imagens: 2 },
  { id: 2, ean: '7891234567891', descricao: 'Calça jeans skinny com rasgos', marca: 'Fashion BR', cor: 'Azul', tamanho: '38', data_criacao: '2025-04-25', empresa_id: 1, total_imagens: 1 },
  { id: 3, ean: '7891234567892', descricao: 'Blusa de algodão com estampa floral', marca: 'Elegance', cor: 'Branco', tamanho: 'P', data_criacao: '2025-04-24', empresa_id: 1, total_imagens: 1 },
  { id: 4, ean: '7891234567893', descricao: 'Jaqueta de couro sintético', marca: 'Urban Style', cor: 'Marrom', tamanho: 'G', data_criacao: '2025-04-24', empresa_id: 1, total_imagens: 1 },
  { id: 5, ean: '7891234567894', descricao: 'Saia midi plissada', marca: 'Elegance', cor: 'Verde', tamanho: 'M', data_criacao: '2025-04-23', empresa_id: 1, total_imagens: 1 },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campo = searchParams.get('campo') || 'ean';
    const termo = searchParams.get('termo') || '';
    const empresaId = searchParams.get('empresa_id') || '1'; // Valor padrão para demonstração
    
    // Filtrar produtos com base nos parâmetros de busca
    let resultados = produtosDemo;
    
    if (termo) {
      resultados = produtosDemo.filter(produto => {
        const valor = produto[campo as keyof typeof produto];
        return typeof valor === 'string' && valor.toLowerCase().includes(termo.toLowerCase());
      });
    }
    
    // Filtrar por empresa
    resultados = resultados.filter(produto => produto.empresa_id.toString() === empresaId);
    
    return NextResponse.json({
      success: true,
      produtos: resultados
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}
