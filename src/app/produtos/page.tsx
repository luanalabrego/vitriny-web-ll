'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const STORAGE_BASE = 'https://storage.googleapis.com/vitriny-web.firebasestorage.app/';

interface Product {
  ean: string;
  descricao?: string;
  marca?: string;
  cor?: string;
  tamanho?: string;
  originalUrl?: string | null;
  imageUrl?: string;
  label?: string;
  observacao?: string;
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    ean: '',
    marca: '',
    tamanho: '',
    cor: '',
    descricao: '',
    label: '',
    observacao: ''
  });
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      });
  }, []);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const filtered = products.filter(p =>
    (!filters.ean      || p.ean.includes(filters.ean)) &&
    (!filters.marca    || p.marca?.toLowerCase().includes(filters.marca.toLowerCase())) &&
    (!filters.tamanho  || p.tamanho?.toLowerCase().includes(filters.tamanho.toLowerCase())) &&
    (!filters.cor      || p.cor?.toLowerCase().includes(filters.cor.toLowerCase())) &&
    (!filters.descricao|| p.descricao?.toLowerCase().includes(filters.descricao.toLowerCase())) &&
    (!filters.label    || p.label === filters.label) &&
    (!filters.observacao || p.observacao?.toLowerCase().includes(filters.observacao.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
    XLSX.writeFile(wb, 'produtos.xlsx');
  };

  const resolveUrl = (url?: string | null) =>
    url
      ? url.startsWith('http')
        ? url
        : `${STORAGE_BASE}${url}`
      : '';

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-flex items-center"
        >
          📥 Exportar Excel
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {(['ean','marca','tamanho','cor','descricao','label','observacao'] as const).map(field => (
          <input
            key={field}
            placeholder={`Filtrar ${field}`}
            value={filters[field]}
            onChange={e => handleFilterChange(field, e.target.value)}
            className="border border-purple-300 p-1 rounded text-black"
          />
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-purple-300 text-black">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-purple-300 px-4 py-2">EAN</th>
              <th className="border border-purple-300 px-4 py-2">Marca</th>
              <th className="border border-purple-300 px-4 py-2">Tamanho</th>
              <th className="border border-purple-300 px-4 py-2">Cor</th>
              <th className="border border-purple-300 px-4 py-2">Descrição</th>
              <th className="border border-purple-300 px-4 py-2">Foto Original</th>
              <th className="border border-purple-300 px-4 py-2">Ajustada</th>
              <th className="border border-purple-300 px-4 py-2">Label</th>
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

                {/* Foto Original */}
                <td className="border border-purple-300 px-4 py-2 text-center">
                  {prod.originalUrl ? (
                    <img
                      src={resolveUrl(prod.originalUrl)}
                      alt="Original"
                      className="h-24 object-cover rounded cursor-pointer inline-block"
                      onClick={() => setModalSrc(resolveUrl(prod.originalUrl))}
                    />
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>

                {/* Foto Ajustada */}
                <td className="border border-purple-300 px-4 py-2 text-center">
                  {prod.imageUrl ? (
                    <img
                      src={resolveUrl(prod.imageUrl)}
                      alt="Ajustada"
                      className="h-24 object-cover rounded cursor-pointer inline-block"
                      onClick={() => setModalSrc(resolveUrl(prod.imageUrl))}
                    />
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>

                <td className="border border-purple-300 px-4 py-2">{prod.label || '-'}</td>
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
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
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
            alt="Ampliado"
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
