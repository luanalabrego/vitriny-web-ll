'use client';

import { useState, useRef, FormEvent } from 'react';

interface Row {
  id: number;
  file: File | null;
  preview: string | null;
  ean: string;
  descricao: string;
  marca: string;
  cor: string;
  tamanho: string;
  result?: { url?: string; error?: string; meta?: any };
  loading?: boolean;
}

export default function NovoProduto() {
  const promptImage = `
Create a high-quality studio photo of a model wearing the exact same outfit as shown in the reference image.

The model should be standing naturally, facing the camera, with a casual and spontaneous pose (such as one hand on the hip, slight smile, or relaxed arms).

The background must be a clean, plain studio background (white or light gray), with soft, even lighting — no shadows or distractions.

Focus on accurately replicating the outfit’s color, texture, and fit.

The final image should look professional and suitable for an e-commerce catalog, highlighting the clothing clearly and elegantly.
  `.trim();

  const [rows, setRows] = useState<Row[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newRows = Array.from(files).map((file, idx) => ({
      id: Date.now() + idx,
      file,
      preview: URL.createObjectURL(file),
      ean: '',
      descricao: '',
      marca: '',
      cor: '',
      tamanho: ''
    }));
    setRows(prev => [...prev, ...newRows]);
    e.target.value = '';
  };

  const clearSelection = () => setRows([]);

  const handleFieldChange = (
    id: number,
    field: keyof Omit<Row, 'id' | 'file' | 'preview' | 'result' | 'loading'>,
    value: string
  ) => {
    setRows(rows.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rows.some(r => !r.ean.trim())) {
      alert('Preencha o EAN em cada linha antes de enviar.');
      return;
    }
    setRows(rows.map(r => ({ ...r, loading: true, result: undefined })));

    const tasks = rows.map(row => (async () => {
      try {
        const { uploadUrl, fileName } = await fetch(
          `/api/produtos/upload-url?ean=${encodeURIComponent(row.ean.trim())}`
        ).then(res => res.json());
        if (!uploadUrl || !fileName) throw new Error('Falha ao obter URL de upload');

        const putRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: row.file
        });
        if (!putRes.ok) throw new Error(`Upload falhou: ${putRes.status}`);

        const resImg = await fetch('/api/produtos/gerar-imagem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ean: row.ean.trim(),
            fileName,
            prompt: promptImage,
            descricao: row.descricao,
            marca: row.marca,
            cor: row.cor,
            tamanho: row.tamanho
          })
        });
        const jsonImg = await resImg.json();
        if (!resImg.ok) throw new Error(jsonImg.error || 'Erro interno');

        setRows(prev =>
          prev.map(r =>
            r.id === row.id
              ? { ...r, loading: false, result: { url: jsonImg.url, meta: jsonImg.meta } }
              : r
          )
        );

        if (jsonImg.url) {
          await fetch('/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ean: row.ean.trim(),
              descricao: row.descricao,
              marca: row.marca,
              cor: row.cor,
              tamanho: row.tamanho,
              imageUrl: jsonImg.url
            })
          });
        }
      } catch (err: any) {
        setRows(prev =>
          prev.map(r =>
            r.id === row.id
              ? { ...r, loading: false, result: { error: err.message } }
              : r
          )
        );
      }
    })());

    await Promise.all(tasks);
  };

  const canSubmit =
    rows.length > 0 &&
    rows.every(r => r.ean.trim()) &&
    !rows.some(r => r.loading);

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 text-black">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-flex items-center"
          >
            📷 Tirar Foto
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center"
          >
            📁 Selecionar Imagens
          </button>
          <button
            type="button"
            onClick={clearSelection}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 inline-flex items-center"
          >
            🗑️ Limpar Seleção
          </button>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={cameraInputRef}
            onChange={handleFiles}
            className="hidden"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFiles}
            className="hidden"
          />
        </div>

        {rows.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="mb-2 text-blue-600 underline"
            >
              {showDetails ? 'Ver menos' : 'Ver mais'}
            </button>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-purple-300 text-black">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    {/* Foto: 50% width */}
                    <th className="border border-white px-2 py-1 w-1/2">Foto</th>
                    {/* EAN: fixed 17ch */}
                    <th className="border border-purple-300 px-2 py-1 w-[17ch]">EAN</th>
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Descrição</th>}
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Marca</th>}
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Cor</th>}
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Tamanho</th>}
                    {/* Status: 30% width */}
                    <th className="border border-purple-300 px-2 py-1 w-[30%]">Status</th>
                    {/* Foto ajustada: 60% width */}
                    <th className="border border-purple-300 px-2 py-1 w-[60%]">Foto ajustada</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border border-purple-300 p-2 w-1/2">
                        {row.preview && (
                          <img
                            src={row.preview}
                            alt="preview"
                            className="h-24 object-cover rounded cursor-pointer"
                            onClick={() => setModalImage(row.preview!)}
                          />
                        )}
                      </td>
                      <td className="border border-purple-300 p-2 w-[17ch]">
                        <input
                          value={row.ean}
                          onChange={e => handleFieldChange(row.id, 'ean', e.target.value)}
                          className="border rounded p-1 w-full"
                          required
                        />
                      </td>
                      {showDetails && (
                        <td className="border border-purple-300 p-2">
                          <input
                            value={row.descricao}
                            onChange={e => handleFieldChange(row.id, 'descricao', e.target.value)}
                            className="border rounded p-1 w-full"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="border border-purple-300 p-2">
                          <input
                            value={row.marca}
                            onChange={e => handleFieldChange(row.id, 'marca', e.target.value)}
                            className="border rounded p-1 w-full"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="border border-purple-300 p-2">
                          <input
                            value={row.cor}
                            onChange={e => handleFieldChange(row.id, 'cor', e.target.value)}
                            className="border rounded p-1 w-full"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="border border-purple-300 p-2">
                          <input
                            value={row.tamanho}
                            onChange={e => handleFieldChange(row.id, 'tamanho', e.target.value)}
                            className="border rounded p-1 w-full"
                          />
                        </td>
                      )}
                      <td
                        className={`border border-purple-300 p-2 text-center w-[30%] ${
                          row.result?.url ? 'bg-green-500 text-white font-bold' : ''
                        }`}
                      >
                        {row.loading
                          ? 'Gerando...'
                          : row.result?.error
                          ? 'Erro'
                          : row.result?.url
                          ? 'OK'
                          : '-'}
                      </td>
                      <td className="border border-purple-300 p-2 w-[60%]">
                        {row.result?.url && (
                          <img
                            src={row.result.url}
                            alt="ajustada"
                            className="h-24 object-cover rounded cursor-pointer"
                            onClick={() => setModalImage(row.result!.url!)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Enviar Todas
        </button>
      </form>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Ampliado"
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
}
