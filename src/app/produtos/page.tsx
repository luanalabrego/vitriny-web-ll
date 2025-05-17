'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const STORAGE_BASE = 'https://storage.googleapis.com/vitriny-web.firebasestorage.app/';

interface Product {
  id: number;
  ean: string;
  marca?: string;
  imageUrl?: string;
  originalUrl?: string;
  aprovacao?: string;
  observacao?: string;
  createdAt: string;
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
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
<<<<<<< HEAD
    async function load() {
      try {
        const res = await fetch('/api/produtos', {
          credentials: 'include'
        });
        const text = await res.text();
        // tenta parsear JSON (array ou { error })
        const json = JSON.parse(text);
        if (!res.ok) {
          throw new Error(json.error || `Status ${res.status}`);
        }
        setProducts(json as Product[]);
      } catch (err: any) {
        console.error('Erro ao buscar produtos:', err);
        setError(err.message);
      }
    }
    load();
=======
    fetch('/api/produtos')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(console.error);
>>>>>>> ajustes-31493ef
  }, []);

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <p>Não foi possível carregar os produtos:</p>
        <pre>{error}</pre>
      </div>
    );
  }

  const handleFilterChange = (
    field: keyof typeof filters,
    value: string
  ) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

<<<<<<< HEAD
  const filtered = products.filter(p =>
    (!filters.ean      || p.ean.includes(filters.ean)) &&
    (!filters.marca    || p.marca?.toLowerCase().includes(filters.marca.toLowerCase())) &&
    (!filters.tamanho  || p.tamanho?.toLowerCase().includes(filters.tamanho.toLowerCase())) &&
    (!filters.cor      || p.cor?.toLowerCase().includes(filters.cor.toLowerCase())) &&
    (!filters.descricao|| p.descricao?.toLowerCase().includes(filters.descricao.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated  = filtered.slice(
=======
  const safe = (s?: string) => (s ?? '').toLowerCase();

  const localMidnight = (iso: string) => {
    const d = new Date(iso);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const parseLocalDate = (dateStr: string, endOfDay = false) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return endOfDay
      ? new Date(y, m - 1, d, 23, 59, 59)
      : new Date(y, m - 1, d, 0, 0, 0);
  };

  const filtered = products.filter(p => {
    const created = localMidnight(p.createdAt);
    if (filters.dateFrom) {
      const from = parseLocalDate(filters.dateFrom);
      if (created < from) return false;
    }
    if (filters.dateTo) {
      const to = parseLocalDate(filters.dateTo, true);
      if (created > to) return false;
    }
    return (
      (!filters.ean        || p.ean.includes(filters.ean)) &&
      (!filters.marca      || safe(p.marca).includes(filters.marca.toLowerCase())) &&
      (!filters.aprovacao  || safe(p.aprovacao).includes(filters.aprovacao.toLowerCase())) &&
      (!filters.observacao || safe(p.observacao).includes(filters.observacao.toLowerCase()))
    );
  });

  const paginated = filtered.slice(
>>>>>>> ajustes-31493ef
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
<<<<<<< HEAD
    url?.startsWith('http') ? url : url ? `${STORAGE_BASE}${url}` : '';

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📥 Exportar Excel
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {(Object.keys(filters) as (keyof typeof filters)[]).map(field => (
=======
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
    const datePart = new Date()
      .toLocaleDateString('pt-BR')
      .replace(/\//g, '-');
    const namePart = filters.aprovacao || datePart;
    saveAs(await zip.generateAsync({ type: 'blob' }), `${namePart}_${datePart}.zip`);
  };

  return (
    <div className="p-6 text-black">
      {/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
  <h1 className="text-2xl font-bold text-center sm:text-left">Lista de Produtos</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto">
    <button
      onClick={exportToExcel}
      className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      📥 Exportar Excel
    </button>
    <button
      onClick={downloadZip}
      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      📦 Download Fotos
    </button>
  </div>
</div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {(['ean','marca','aprovacao','observacao','dateFrom','dateTo'] as const).map(field => (
>>>>>>> ajustes-31493ef
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

      {/* Tabela */}
      <div className="overflow-x-auto">
<<<<<<< HEAD
        <table className="min-w-full table-auto border-collapse border border-purple-300">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-purple-300 px-4 py-2">EAN</th>
              <th className="border border-purple-300 px-4 py-2">Marca</th>
              <th className="border border-purple-300 px-4 py-2">Tamanho</th>
              <th className="border border-purple-300 px-4 py-2">Cor</th>
              <th className="border border-purple-300 px-4 py-2">Descrição</th>
              <th className="border border-purple-300 px-4 py-2">Original</th>
              <th className="border border-purple-300 px-4 py-2">Ajustada</th>
=======
        <table className="min-w-full table-auto border-collapse text-black text-xs sm:text-base">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">EAN</th>
              <th className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">Marca</th>
              <th className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">Original</th>
              <th className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">Ajustada</th>
              <th className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">Aprovação</th>
              <th className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">Observação</th>
>>>>>>> ajustes-31493ef
            </tr>
          </thead>
          <tbody>
            {paginated.map(prod => (
<<<<<<< HEAD
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{prod.ean}</td>
                <td className="border px-4 py-2">{prod.marca || '-'}</td>
                <td className="border px-4 py-2">{prod.tamanho || '-'}</td>
                <td className="border px-4 py-2">{prod.cor || '-'}</td>
                <td className="border px-4 py-2">{prod.descricao || '-'}</td>
                <td className="border px-4 py-2 text-center">
                  {prod.originalUrl ? (
                    <img
                      src={resolveUrl(prod.originalUrl)}
                      alt="Original"
                      className="h-24 object-cover rounded cursor-pointer"
                      onClick={() => setModalSrc(resolveUrl(prod.originalUrl))}
                    />
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  {prod.imageUrl ? (
                    <img
                      src={resolveUrl(prod.imageUrl)}
                      alt="Ajustada"
                      className="h-24 object-cover rounded cursor-pointer"
                      onClick={() => setModalSrc(resolveUrl(prod.imageUrl))}
                    />
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
=======
              <tr key={prod.ean} className="hover:bg-gray-50">
                <td className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">{prod.ean}</td>
                <td className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">{prod.marca || '-'}</td>
                <td className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2 text-center">
                  {prod.originalUrl
                    ? <img
                        src={resolveUrl(prod.originalUrl)}
                        className="h-12 sm:h-16 object-cover rounded cursor-pointer"
                        onClick={() => setModalSrc(resolveUrl(prod.originalUrl))}
                      />
                    : '—'}
                </td>
                <td className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2 text-center">
                  {prod.imageUrl
                    ? <img
                        src={resolveUrl(prod.imageUrl)}
                        className="h-12 sm:h-16 object-cover rounded cursor-pointer"
                        onClick={() => setModalSrc(resolveUrl(prod.imageUrl))}
                      />
                    : '—'}
>>>>>>> ajustes-31493ef
                </td>
                <td className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">{prod.aprovacao || '-'}</td>
                <td className="border border-purple-300 px-2 py-1 sm:px-4 sm:py-2">{prod.observacao || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<<<<<<< HEAD
      {/* Paginação */}
      <div className="flex justify-center items-center mt-4 space-x-2">
=======
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
>>>>>>> ajustes-31493ef
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="w-full sm:w-auto px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-1">
          Página {currentPage} de {Math.max(1, Math.ceil(filtered.length / itemsPerPage))}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filtered.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(filtered.length / itemsPerPage)}
          className="w-full sm:w-auto px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
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
