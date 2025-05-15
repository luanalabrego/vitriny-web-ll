'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const STORAGE_BASE = 'https://storage.googleapis.com/vitriny-web.firebasestorage.app/';

interface Product {
  ean: string;
  marca?: string;
  imageUrl?: string;
  aprovacao?: string;
  observacao?: string;
  createdAt: string;
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    ean: '',
    marca: '',
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

  // cria Date local sem considerar hora UTC
  const localMidnight = (iso: string) => {
    const d = new Date(iso);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };
  // parse YYYY-MM-DD para Date local, opcional final do dia
  const parseLocalDate = (dateStr: string, endOfDay = false) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return endOfDay
      ? new Date(y, m - 1, d, 23, 59, 59)
      : new Date(y, m - 1, d, 0, 0, 0);
  };

  const filtered = products.filter(p => {
    // filter por data usando somente a data local de createdAt
    const created = localMidnight(p.createdAt);
    if (filters.dateFrom) {
      const from = parseLocalDate(filters.dateFrom);
      if (created < from) return false;
    }
    if (filters.dateTo) {
      const to = parseLocalDate(filters.dateTo, true);
      if (created > to) return false;
    }
    // demais filtros
    return (
      (!filters.ean       || p.ean.includes(filters.ean)) &&
      (!filters.marca     || safe(p.marca).includes(filters.marca.toLowerCase())) &&
      (!filters.aprovacao || safe(p.aprovacao).includes(filters.aprovacao.toLowerCase())) &&
      (!filters.observacao|| safe(p.observacao).includes(filters.observacao.toLowerCase()))
    );
  });

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    await Promise.all(
      filtered.map(async prod => {
        if (!prod.imageUrl) return;
        const url = resolveUrl(prod.imageUrl);
        const res = await fetch(url);
        if (!res.ok) return;
        const blob = await res.blob();
        const ext = url.split('.').pop() || 'jpg';
        zip.file(`${prod.ean}.${ext}`, blob);
      })
    );
    const blob = await zip.generateAsync({ type: 'blob' });
    const datePart = new Date()
      .toLocaleDateString('pt-BR')
      .replace(/\//g, '-');
    const namePart = filters.aprovacao
      ? filters.aprovacao
      : datePart;
    saveAs(blob, `${namePart}_${datePart}.zip`);
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
      <div className="grid grid-cols-6 gap-2 mb-4">
        {(['ean','marca','aprovacao','observacao','dateFrom','dateTo'] as const).map(field => (
          <input
            key={field}
            type={field.startsWith('date') ? 'date' : 'text'}
            placeholder={
              field === 'aprovacao' ? 'Filtrar Aprovação'
                : field === 'dateFrom' ? 'Data de...'
                : field === 'dateTo'   ? 'Data até...'
                : `Filtrar ${field}`
            }
            value={filters[field]}
            onChange={e => handleFilterChange(field, e.target.value)}
            className="border border-purple-300 p-1 rounded text-black"
          />
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-black">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-purple-300 px-4 py-2">EAN</th>
              <th className="border border-purple-300 px-4 py-2">Marca</th>
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
        <span>
          Página {currentPage} de {Math.max(1, Math.ceil(filtered.length / itemsPerPage))}
        </span>
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
