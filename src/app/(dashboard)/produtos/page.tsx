// src/app/(dashboard)/produtos/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as XLSX from 'xlsx';

interface Product {
  ean: string;
  descricao: string;
  marca: string;
  cor: string;
  tamanho: string;
  originalUrl?: string;
  imageUrl: string;
  createdAt: string;
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    ean: '', marca: '', tamanho: '', cor: '', descricao: ''
  });
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data
  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  // Filter handler
  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  // Apply filters
  const filtered = products.filter(p =>
    (!filters.ean || p.ean.includes(filters.ean)) &&
    (!filters.marca || p.marca.toLowerCase().includes(filters.marca.toLowerCase())) &&
    (!filters.tamanho || p.tamanho.toLowerCase().includes(filters.tamanho.toLowerCase())) &&
    (!filters.cor || p.cor.toLowerCase().includes(filters.cor.toLowerCase())) &&
    (!filters.descricao || p.descricao.toLowerCase().includes(filters.descricao.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filtered.map(({ createdAt, ...rest }) => rest)
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
    XLSX.writeFile(wb, 'produtos.xlsx');
  };

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
      <div className="grid grid-cols-5 gap-2 mb-4">
        {(['ean','marca','tamanho','cor','descricao'] as const).map(field => (
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
              <th className="border border-purple-300 px-4 py-2">Original</th>
              <th className="border border-purple-300 px-4 py-2">Ajustada</th>
              <th className="border border-purple-300 px-4 py-2">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(prod => (
              <tr key={prod.ean} className="hover:bg-gray-50">
                <td className="border border-purple-300 px-4 py-2">{prod.ean}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.marca}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.tamanho}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.cor}</td>
                <td className="border border-purple-300 px-4 py-2">{prod.descricao}</td>
                <td className="border border-purple-300 px-4 py-2">
                  {prod.originalUrl && (
                    <Image
                      src={prod.originalUrl}
                      alt="Original"
                      width={64}
                      height={64}
                      className="object-cover rounded cursor-pointer"
                      onClick={() => setModalSrc(prod.originalUrl!)}
                    />
                  )}
                </td>
                <td className="border border-purple-300 px-4 py-2">
                  {prod.imageUrl && (
                    <Image
                      src={prod.imageUrl}
                      alt="Ajustada"
                      width={64}
                      height={96}
                      className="object-cover rounded cursor-pointer"
                      onClick={() => setModalSrc(prod.imageUrl)}
                    />
                  )}
                </td>
                <td className="border border-purple-300 px-4 py-2">{new Date(prod.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Próximo</button>
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
