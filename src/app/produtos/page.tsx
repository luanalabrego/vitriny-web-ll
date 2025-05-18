'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FileSpreadsheet, Archive } from 'lucide-react';

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
  const router = useRouter();
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ aprovacao: '', observacao: '' });
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(console.error);
  }, []);

  const startEdit = (prod: Product) => {
    setEditingId(prod.id);
    setEditValues({
      aprovacao: prod.aprovacao ?? '',
      observacao: prod.observacao ?? '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ aprovacao: '', observacao: '' });
  };

  const saveEdit = async (id: number) => {
    try {
      const res = await fetch(`/api/produtos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editValues),
      });
      if (!res.ok) throw new Error('Falha ao salvar');
      const updated: Product = await res.json();
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updated } : p))
      );
      setEditingId(null);
      alert('✅ Alterações salvas!');
    } catch (e) {
      console.error(e);
      alert('❌ Erro ao salvar alterações.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este produto?')) return;
    try {
      const res = await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir');
      setProducts(prev => prev.filter(p => p.id !== id));
      alert('✅ Produto excluído com sucesso!');
    } catch (e) {
      console.error(e);
      alert('❌ Erro ao excluir produto.');
    }
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const onChangeEdit = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    const datePart = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
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
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow inline-flex items-center gap-2 transition transform hover:scale-105 hover:bg-green-700"
          >
            <FileSpreadsheet className="h-5 w-5" />
            Exportar Excel
          </button>
          <button
            onClick={downloadZip}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow inline-flex items-center gap-2 transition transform hover:scale-105 hover:bg-blue-700"
          >
            <Archive className="h-5 w-5" />
            Download Fotos
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {(['ean', 'marca', 'aprovacao', 'observacao', 'dateFrom', 'dateTo'] as const).map(
          field => (
            <input
              key={field}
              type={field.startsWith('date') ? 'date' : 'text'}
              placeholder={
                field === 'aprovacao'
                  ? 'Filtrar Aprovação'
                  : field === 'dateFrom'
                  ? 'Data de...'
                  : field === 'dateTo'
                  ? 'Data até...'
                  : `Filtrar ${field.charAt(0).toUpperCase() + field.slice(1)}`
              }
              value={filters[field]}
              onChange={e => handleFilterChange(field, e.target.value)}
              className="border border-gray-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
          )
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {paginated.map(prod => (
          <div key={prod.id} className="bg-white rounded-lg border border-gray-200 shadow p-4">
            <p className="font-medium text-gray-800">EAN: {prod.ean}</p>
            <p className="text-gray-600">Marca: {prod.marca || '-'}</p>
            {prod.originalUrl && (
              <img
                src={resolveUrl(prod.originalUrl)}
                alt="Original"
                className="w-full h-40 object-cover rounded-xl shadow-md cursor-pointer my-2"
                onClick={() => setModalSrc(resolveUrl(prod.originalUrl))}
              />
            )}
            {prod.imageUrl && (
              <img
                src={resolveUrl(prod.imageUrl)}
                alt="Ajustada"
                className="w-full h-40 object-cover rounded-xl shadow-md cursor-pointer mb-2"
                onClick={() => setModalSrc(resolveUrl(prod.imageUrl))}
              />
            )}

            {editingId === prod.id ? (
              <>
                <select
      name="aprovacao"
      value={editValues.aprovacao}
      onChange={onChangeEdit}
      className="w-full border rounded px-2 py-1 mb-2"
    >
      <option value="" disabled>Selecione...</option>
      <option value="Aprovado">Aprovado</option>
      <option value="Reprovado">Reprovado</option>
      <option value="Retoque Designer">Retoque Designer</option>
      <option value="Refazer foto">Refazer foto</option>
    </select>
                <textarea
                  name="observacao"
                  value={editValues.observacao}
                  onChange={onChangeEdit}
                  placeholder="Observação"
                  className="w-full border rounded px-2 py-1 mb-2"
                  rows={3}
                />
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => saveEdit(prod.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-800">Aprovação: {prod.aprovacao || '-'}</p>
                <p className="text-gray-800">Observação: {prod.observacao || '-'}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => startEdit(prod)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-black text-xs sm:text-base">
          <thead>
            <tr className="bg-white text-purple-700">
              <th className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">EAN</th>
              <th className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">Marca</th>
              <th className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">Original</th>
              <th className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">Ajustada</th>
              <th className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">Aprovação</th>
              <th className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">Observação</th>
              <th className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(prod => (
              <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">{prod.ean}</td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">{prod.marca || '-'}</td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-center">
                  {prod.originalUrl ? (
                    <img
                      src={resolveUrl(prod.originalUrl)}
                      alt="Original"
                      className="h-12 sm:h-16 object-cover rounded-xl shadow-md cursor-pointer"
                      onClick={() => setModalSrc(resolveUrl(prod.originalUrl))}
                    />
                  ) : '—'}
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-center">
                  {prod.imageUrl ? (
                    <img
                      src={resolveUrl(prod.imageUrl)}
                      alt="Ajustada"
                      className="h-12 sm:h-16 object-cover rounded-xl shadow-md cursor-pointer"
                      onClick={() => setModalSrc(resolveUrl(prod.imageUrl))}
                    />
                  ) : '—'}
                </td>
                <td className="border px-2 py-1">
  {editingId === prod.id ? (
    <select
      name="aprovacao"
      value={editValues.aprovacao}
      onChange={onChangeEdit}
      className="w-full border rounded px-1 py-1"
    >
      <option value="" disabled>Selecione...</option>
      <option value="Aprovado">Aprovado</option>
      <option value="Reprovado">Reprovado</option>
      <option value="Retoque Designer">Retoque Designer</option>
      <option value="Refazer foto">Refazer foto</option>
    </select>
  ) : (
    prod.aprovacao || '-'
  )}
</td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">
                  {editingId === prod.id ? (
                    <textarea
                      name="observacao"
                      value={editValues.observacao}
                      onChange={onChangeEdit}
                      className="w-full border rounded px-1 py-1"
                      rows={2}
                    />
                  ) : (
                    prod.observacao || '-'
                  )}
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 flex gap-2">
                  {editingId === prod.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(prod.id)}
                        className="px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(prod)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="w-full sm:w-auto px-3 py-1 bg-gray-200 rounded-lg shadow transition transform hover:scale-105 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-1">
          Página {currentPage} de {Math.max(1, Math.ceil(filtered.length / itemsPerPage))}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filtered.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(filtered.length / itemsPerPage)}
          className="w-full sm:w-auto px-3 py-1 bg-gray-200 rounded-lg shadow transition transform hover:scale-105 disabled:opacity-50"
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
