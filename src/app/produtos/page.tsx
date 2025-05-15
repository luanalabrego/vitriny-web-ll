'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const STORAGE_BASE = 'https://storage.googleapis.com/vitriny-web.firebasestorage.app/';

interface Product {
  ean: string;
  descricao?: string;
  marca?: string;
  cor?: string;
  tamanho?: string;
  originalUrl?: string | null;
  imageUrl?: string;
  aprovacao?: string;
  observacao?: string;
  createdAt: string;   // usado só para filtro, não exibido
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    ean: '',
    marca: '',
    tamanho: '',
    cor: '',
    descricao: '',
    aprovacao: '',
    observacao: '',
    dateFrom: '',
    dateTo: '',
  });
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(console.error);
  }, []);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const safe = (s?: string) => (s ?? '').toLowerCase();

  const filtered = products.filter(p => {
    // filtro por data
    const created = new Date(p.createdAt);
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      if (created < from) return false;
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59);
      if (created > to) return false;
    }
    // demais filtros
    return (
      (!filters.ean       || p.ean.includes(filters.ean)) &&
      (!filters.marca     || safe(p.marca).includes(filters.marca.toLowerCase())) &&
      (!filters.tamanho   || safe(p.tamanho).includes(filters.tamanho.toLowerCase())) &&
      (!filters.cor       || safe(p.cor).includes(filters.cor.toLowerCase())) &&
      (!filters.descricao || safe(p.descricao).includes(filters.descricao.toLowerCase())) &&
      (!filters.aprovacao || safe(p.aprovacao).includes(filters.aprovacao.toLowerCase())) &&
      (!filters.observacao|| safe(p.observacao).includes(filters.observacao.toLowerCase()))
    );
  });

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
    XLSX.writeFile(wb, 'produtos.xlsx');
  };

  const resolveUrl = (url?: string | null) =>
    url?.startsWith('http') ? url : `${STORAGE_BASE}${url}`;

  const downloadZip = async () => {
    const zip = new JSZip();
    await Promise.all(filtered.map(async prod => {
      if (!prod.imageUrl) return;
      const url = resolveUrl(prod.imageUrl);
      const res = await fetch(url);
      if (!res.ok) return;
      const blob = await res.blob();
      const ext = url.split('.').pop() || 'jpg';
      zip.file(`${prod.ean}.${ext}`, blob);
    }));
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'fotos.zip');
  };

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <div className="space-x-2">
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📥 Exportar Excel
          </button>
          <button
            onClick={downloadZip}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            📦 Download Fotos
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-9 gap-2 mb-4">
        {(
          ['ean','marca','tamanho','cor','descricao','aprovacao','observacao','dateFrom','dateTo'] as const
        ).map(field => (
          <input
            key={field}
            type={field.startsWith('date') ? 'date' : 'text'}
            placeholder={
              field === 'aprovacao' ? 'Filtrar Aprovação'
              : field === 'dateFrom' ? 'Data de (início)'
              : field === 'dateTo'   ? 'Data até'
              : `Filtrar ${field}`
            }
            value={filters[field]}
            onChange={e => handleFilterChange(field, e.target.value)}
            className="border border-purple-300 p-1 rounded text-black"
          />
        ))}
      </div>

      {/* Table without outer border, only purple cell borders */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-black">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-purple-300 px-4 py-2">EAN</th>
              <th className="border border-purple-300 px-4 py-2">Marca</th>
              <th className="border border-purple-300 px-4 py-2">Tamanho</th>
              <th className="border border-purple-300 px-4 py-2">Cor</th>
              <th className="border border-purple-300 px-4 py-2">Descrição</th>
              <th className="border border-purple-300 px-4 py-2">Original</th>
              <th className="border border-purple-300 px-4 py-2">Ajustada</th>
              <th className="border border-purple-300 px-4 py-2">Aprovação</th>
              <th className="border border-purple-300 px-4 py-2">Observação</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(prod => (
              <tr key={prod.ean} className="hover:bg-gray-50">
                <td className="border border-purple-300 px-4 py-2">{prod.ean}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.marca || '-'}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.tamanho || '-'}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.cor || '-'}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.descricao || '-'}</td>
                <td className="border border-purple-300 px-4 py-2 text-center">
                  {prod.originalUrl
                    ? <img
                        src={resolveUrl(prod.originalUrl)}
                        className="h-16 object-cover rounded cursor-pointer"
                        onClick={() => setModalSrc(resolveUrl(prod.originalUrl))}
                      />
                    : '—'}
                </td>
                <td className="border border-purple-300 px-4 py-2 text-center">
                  {prod.imageUrl
                    ? <img
                        src={resolveUrl(prod.imageUrl)}
                        className="h-16 object-cover rounded cursor-pointer"
                        onClick={() => setModalSrc(resolveUrl(prod.imageUrl))}
                      />
                    : '—'}
                </td>
                <td className="border border-purple-300 px-4 py-2">{prod.aprovacao || '-'}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.observacao || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {Math.max(1, Math.ceil(filtered.length / itemsPerPage))}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filtered.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(filtered.length / itemsPerPage)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>

      {/* Modal */}
      {modalSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setModalSrc(null)}
        >
          <img
            src={modalSrc}
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
