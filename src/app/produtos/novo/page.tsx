'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

interface Row {
  id: number;
  file: File | null;
  preview: string | null;
  ean: string;
  descricao: string;
  marca: string;
  cor: string;
  tamanho: string;
  productType: string;
  result?: { url?: string; originalUrl?: string; error?: string; meta?: any };
  loading?: boolean;
}

export default function NovoProduto() {
  const [credits, setCredits] = useState<number>(0);
  const [rows, setRows] = useState<Row[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/user/credits', { credentials: 'include' })
      .then(res => res.json())
      .then(json => setCredits(json.credits ?? 0))
      .catch(() => console.error('Não foi possível ler créditos'));
  }, []);

  const promptByType: Record<string, string> = {
    'Feminino': `
Create an ultra–high-resolution studio photo of a female fashion model wearing the exact same outfit as shown in the reference image...
    `.trim(),
    'Masculino': `
Create an ultra–high-resolution studio photo of a male fashion model wearing the exact same outfit as shown in the reference image...
    `.trim(),
    'Infantil feminino': `
Create an ultra–high-resolution studio photo of a young girl model wearing the exact same outfit as shown in the reference image...
    `.trim(),
    'Infantil Masculino': `
Create an ultra–high-resolution studio photo of a young boy model wearing the exact same outfit as shown in the reference image...
    `.trim(),
    'Calçado': `
Generate an ultra–high-resolution studio photograph of the reference footwear only...
    `.trim(),
    'Bolsa': `
Create an ultra–high-resolution product photo focusing exclusively on the handbag shown in the reference image...
    `.trim(),
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newRows = Array.from(files).map((file, idx) => {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      return {
        id: Date.now() + idx,
        file,
        preview: URL.createObjectURL(file),
        ean: nameWithoutExt,
        descricao: '',
        marca: '',
        cor: '',
        tamanho: '',
        productType: 'Feminino',
      };
    });
    setRows(prev => [...prev, ...newRows]);
    e.target.value = '';
  };

  const clearSelection = () => {
    setRows([]);
  };

  const handleFieldChange = (
    id: number,
    field: keyof Omit<Row, 'id' | 'file' | 'preview' | 'result' | 'loading'>,
    value: string
  ) => {
    setRows(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rows.length > credits) {
      alert(`Você precisa de ${rows.length} créditos, mas tem apenas ${credits}.`);
      return;
    }
    if (rows.some(r => !r.ean.trim())) {
      alert('Preencha o EAN em cada linha antes de enviar.');
      return;
    }

    setRows(prev => prev.map(r => ({ ...r, loading: true, result: undefined })));

    await Promise.all(
      rows.map(async row => {
        try {
          const { uploadUrl, fileName } = await fetch(
            `/api/produtos/upload-url?ean=${encodeURIComponent(row.ean.trim())}`
          ).then(res => res.json());

          const putRes = await fetch(uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/octet-stream' },
            body: row.file,
          });
          if (!putRes.ok) throw new Error('Upload original falhou');

          const publishJson = await fetch('/api/produtos/publish-original', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName }),
          }).then(res => res.json());
          const originalUrl = publishJson.publicUrl;
          if (!originalUrl) throw new Error('Falha ao tornar original público');

          const prompt = promptByType[row.productType] || promptByType['Feminino'];
          const { url, meta } = await fetch('/api/produtos/gerar-imagem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ean: row.ean.trim(),
              fileName,
              prompt,
              descricao: row.descricao,
              marca: row.marca,
              cor: row.cor,
              tamanho: row.tamanho,
            }),
          }).then(res => res.json());
          if (!url) throw new Error('Erro ao gerar imagem');

          const decJson = await fetch('/api/user/decrement-credits', {
            method: 'POST',
          }).then(res => res.json());
          if (decJson.credits !== undefined) setCredits(decJson.credits);

          await fetch('/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ean: row.ean.trim(),
              descricao: row.descricao,
              marca: row.marca,
              cor: row.cor,
              tamanho: row.tamanho,
              originalUrl,
              imageUrl: url,
            }),
          });

          setRows(prev =>
            prev.map(r =>
              r.id === row.id
                ? { ...r, loading: false, result: { url, originalUrl, meta } }
                : r
            )
          );
        } catch (err: any) {
          setRows(prev =>
            prev.map(r =>
              r.id === row.id
                ? { ...r, loading: false, result: { error: err.message } }
                : r
            )
          );
        }
      })
    );
  };

  const canSubmit =
    rows.length > 0 &&
    rows.every(r => r.ean.trim()) &&
    !rows.some(r => r.loading) &&
    credits >= rows.length;

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-6">
        {/* Upload Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 justify-center transform hover:scale-105 transition"
          >
            📷 Tirar Foto
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 justify-center transform hover:scale-105 transition"
          >
            🖼️ Selecionar Imagens
          </button>
          <button
            type="button"
            onClick={clearSelection}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 justify-center transform hover:scale-105 transition"
          >
            🧹 Limpar Seleção
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
            {/* Toggle details */}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 text-sm text-blue-600 underline"
            >
              {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
            </button>

            {/* Tabela desktop */}
            <div className="hidden md:block overflow-x-auto mt-6 rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full border-collapse">
                <thead className="bg-white">
                  <tr className="text-purple-700 font-semibold">
                  <th className="px-4 py-3 text-left border border-gray-200">Foto</th>
                    <th className="px-4 py-3 text-left border border-gray-200">Tipo</th>
                    <th className="px-4 py-3 text-left border border-gray-200">EAN</th>
                    {showDetails && (
                      <th className="px-4 py-3 text-left border border-gray-200">
                        Descrição
                      </th>
                    )}
                    {showDetails && (
                      <th className="px-4 py-3 text-left border border-gray-200">
                        Marca
                      </th>
                    )}
                    {showDetails && (
                      <th className="px-4 py-3 text-left border border-gray-200">
                        Cor
                      </th>
                    )}
                    {showDetails && (
                      <th className="px-4 py-3 text-left border border-gray-200">
                        Tamanho
                      </th>
                    )}
                    <th className="px-4 py-3 text-center border border-gray-200">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center border border-gray-200">
                      Foto Ajustada
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {rows.map(row => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2 border border-gray-200">
                        <img
                          src={row.preview!}
                          alt="preview"
                          className="h-16 w-16 rounded-xl shadow-md object-cover cursor-pointer"
                          onClick={() => setModalImage(row.preview!)}
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        <select
                          value={row.productType}
                          onChange={e => handleFieldChange(row.id, 'productType', e.target.value)}
                          className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          <option>Feminino</option>
                          <option>Masculino</option>
                          <option>Infantil feminino</option>
                          <option>Infantil Masculino</option>
                          <option>Calçado</option>
                          <option>Bolsa</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        <input
                          value={row.ean}
                          onChange={e => handleFieldChange(row.id, 'ean', e.target.value)}
                          className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          required
                        />
                      </td>
                      {showDetails && (
                        <td className="px-4 py-2 border border-gray-200">
                          <input
                            value={row.descricao}
                            onChange={e => handleFieldChange(row.id, 'descricao', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="px-4 py-2 border border-gray-200">
                          <input
                            value={row.marca}
                            onChange={e => handleFieldChange(row.id, 'marca', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="px-4 py-2 border border-gray-200">
                          <input
                            value={row.cor}
                            onChange={e => handleFieldChange(row.id, 'cor', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="px-4 py-2 border border-gray-200">
                          <input
                            value={row.tamanho}
                            onChange={e => handleFieldChange(row.id, 'tamanho', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      <td className="px-4 py-2 text-center border border-gray-200">
                        {row.loading
                          ? (
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-t-purple-600 rounded-full"></span>
                          )
                          : row.result?.url
                            ? '✅'
                            : row.result?.error
                              ? '❌'
                              : '-'}
                      </td>
                      <td className="px-4 py-2 text-center border border-gray-200">
                        {row.result?.url && (
                          <img
                            src={row.result.url}
                            alt="ajustada"
                            className="h-16 w-16 rounded-xl shadow-md object-cover cursor-pointer"
                            onClick={() => setModalImage(row.result!.url!)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards mobile */}
            <div className="md:hidden grid grid-cols-1 gap-4 mt-6">
              {rows.map(row => (
                <div
                  key={row.id}
                  className="p-4 rounded-lg shadow bg-white border border-gray-200"
                >
                  <img
                    src={row.preview!}
                    alt="preview"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <p className="text-base font-semibold text-gray-800">
                    Tipo: {row.productType}
                  </p>
                  <p className="text-sm text-gray-600">EAN: {row.ean}</p>
                  {showDetails && (
                    <>
                      <p className="text-sm text-gray-600">
                        Descrição: {row.descricao}
                      </p>
                      <p className="text-sm text-gray-600">
                        Marca: {row.marca}
                      </p>
                      <p className="text-sm text-gray-600">Cor: {row.cor}</p>
                      <p className="text-sm text-gray-600">
                        Tamanho: {row.tamanho}
                      </p>
                    </>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    Status:{' '}
                    {row.loading ? '…' : row.result?.url ? 'OK' : '-'}
                  </p>
                </div>
              ))}
            </div>

            {/* Botões de ação */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                disabled={!canSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transform hover:scale-105 transition disabled:opacity-50"
              >
                Enviar Todas
              </button>
            </div>
          </>
        )}
      </form>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Ampliado"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
