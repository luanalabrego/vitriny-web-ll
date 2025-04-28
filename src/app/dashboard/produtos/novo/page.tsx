// src/app/(dashboard)/produtos/novo/page.tsx
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
  result?: { url?: string; originalUrl?: string; error?: string; meta?: any };
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Adiciona múltiplas imagens
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

  // Limpa seleção de imagens
  const clearSelection = () => {
    setRows([]);
  };

  // Atualiza campos de texto
  const handleFieldChange = (
    id: number,
    field: keyof Omit<Row, 'id' | 'file' | 'preview' | 'result' | 'loading'>,
    value: string
  ) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Submissão: valida, gera imagem e salva produto
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    const invalid = rows.filter(r => !r.ean || !r.descricao || !r.marca || !r.cor || !r.tamanho);
    if (invalid.length > 0) {
      alert('Preencha todos os campos em cada linha antes de enviar.');
      return;
    }

    const updated = [...rows];
    for (let i = 0; i < updated.length; i++) {
      const row = updated[i];
      row.loading = true;
      setRows([...updated]);

      // Chama a API de gerar-imagem
      const formImg = new FormData();
      formImg.append('ean', row.ean);
      formImg.append('descricao', row.descricao);
      formImg.append('marca', row.marca);
      formImg.append('cor', row.cor);
      formImg.append('tamanho', row.tamanho);
      if (row.file) formImg.append('image', row.file);
      formImg.append('prompt', promptImage);
      formImg.append('model', 'gpt-image-1');
      formImg.append('n', '1');
      formImg.append('size', '1024x1536');
      formImg.append('quality', 'low');

      const resImg = await fetch('/api/produtos/gerar-imagem', { method: 'POST', body: formImg });
      const jsonImg = await resImg.json();
      row.loading = false;

      if (!resImg.ok) {
        row.result = { error: jsonImg.error || 'Erro interno' };
        setRows([...updated]);
        continue;
      }

      const { url, originalUrl, meta } = jsonImg;
      row.result = { url, originalUrl, meta };
      setRows([...updated]);

      // Salva no banco
      await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ean: row.ean,
          descricao: row.descricao,
          marca: row.marca,
          cor: row.cor,
          tamanho: row.tamanho,
          imageUrl: url,
          originalUrl
        })
      });
    }
  };

  // Habilita botão se tudo preenchido e sem loading
  const canSubmit = rows.length > 0 && rows.every(r => r.ean && r.descricao && r.marca && r.cor && r.tamanho) && !rows.some(r => r.loading);

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
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-purple-300 text-black">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border border-white px-2 py-1">Preview</th>
                  <th className="border border-purple-300 px-2 py-1">EAN*</th>
                  <th className="border border-purple-300 px-2 py-1">Descrição</th>
                  <th className="border border-purple-300 px-2 py-1">Marca</th>
                  <th className="border border-purple-300 px-2 py-1">Cor</th>
                  <th className="border border-purple-300 px-2 py-1">Tamanho</th>
                  <th className="border border-purple-300 px-2 py-1">Status</th>
                  <th className="border border-purple-300 px-2 py-1">Foto Original</th>
                  <th className="border border-purple-300 px-2 py-1">Foto Ajustada</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-purple-300 p-2">{row.preview && <img src={row.preview} alt="preview" className="h-24 object-cover rounded" />}</td>
                    <td className="border border-purple-300 p-2">
                      <input
                        value={row.ean}
                        onChange={e => handleFieldChange(row.id, 'ean', e.target.value)}
                        className="border rounded p-1 w-full"
                        required
                      />
                    </td>
                    <td className="border border-purple-300 p-2">
                      <input
                        value={row.descricao}
                        onChange={e => handleFieldChange(row.id, 'descricao', e.target.value)}
                        className="border rounded p-1 w-full"
                        required
                      />
                    </td>
                    <td className="border border-purple-300 p-2">
                      <input
                        value={row.marca}
                        onChange={e => handleFieldChange(row.id, 'marca', e.target.value)}
                        className="border rounded p-1 w-full"
                        required
                      />
                    </td>
                    <td className="border border-purple-300 p-2">
                      <input
                        value={row.cor}
                        onChange={e => handleFieldChange(row.id, 'cor', e.target.value)}
                        className="border rounded p-1 w-full"
                        required
                      />
                    </td>
                    <td className="border border-purple-300 p-2">
                      <input
                        value={row.tamanho}
                        onChange={e => handleFieldChange(row.id, 'tamanho', e.target.value)}
                        className="border rounded p-1 w-full"
                        required
                      />
                    </td>
                    <td className="border border-purple-300 p-2 text-center">{row.loading ? 'Gerando...' : (row.result?.url ? 'OK' : '-')}</td>
                    <td className="border border-purple-300 p-2">{row.result?.originalUrl && <img src={row.result.originalUrl} alt="original" className="h-24 object-cover rounded cursor-pointer" onClick={() => setModalImage(row.result!.originalUrl!)} />}</td>
                    <td className="border border-purple-300 p-2">{row.result?.url && <img src={row.result.url} alt="ajustada" className="h-24 object-cover rounded cursor-pointer" onClick={() => setModalImage(row.result!.url!)} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Ampliado" className="max-h-[90%] max-w-[90%] rounded shadow-lg" />
        </div>
      )}
    </>
  );
}
