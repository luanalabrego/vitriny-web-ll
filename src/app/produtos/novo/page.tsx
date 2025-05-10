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
  productType: string;
  result?: { url?: string; originalUrl?: string; error?: string; meta?: any };
  loading?: boolean;
}

export default function NovoProduto() {
  // Prompts específicos para cada tipo de produto
  const promptByType: Record<string, string> = {
    'Feminino': `
Create a high-quality studio photo of a female model wearing the exact same feminine outfit as shown in the reference image.
The model should be standing naturally, facing the camera, with a casual pose and a slight smile.
The background must be clean and plain (white or light gray), with soft, even lighting.
Focus on accurately showing the color, texture, and fit of the women's clothing.
  `.trim(),
    'Masculino': `
Create a high-quality studio photo of a male model wearing the exact same masculine outfit as shown in the reference image.
The model should be standing confidently, facing the camera, with relaxed arms.
Use a plain studio background (white or light gray) and soft, even lighting.
Emphasize the color, fabric texture, and tailored fit of the men's clothing.
  `.trim(),
    'Infantil feminino': `
Create a high-quality studio photo of a young girl model wearing the exact same children's outfit as shown in the reference image.
The child should be standing naturally, facing the camera, with a playful posture.
Use a plain background (white or light gray) and gentle, even lighting.
Highlight the color and comfort of the girls' clothing.
  `.trim(),
    'Infantil Masculino': `
Create a high-quality studio photo of a young boy model wearing the exact same children's outfit as shown in the reference image.
The child should be standing facing the camera, with a relaxed stance.
Use a neutral background (white or light gray) and soft lighting.
Focus on the durability and design details of the boys' clothing.
  `.trim(),
    'Calçado': `
Create a high-quality studio photo focusing on the exact footwear as shown in the reference image.
Place the shoes on a clean, flat surface against a plain white or light gray background.
Use soft, even lighting to eliminate shadows and highlight textures.
Emphasize the shape, material, and details of the shoes.
  `.trim(),
    'Bolsa': `
Create a high-quality studio photo of the handbag as shown in the reference image.
Show both a full shot and a close-up detail of the bag’s texture and hardware.
Use a plain white or light gray background with soft, even lighting.
Highlight the color, material, and fine details of the handbag.
  `.trim(),
  };

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
      tamanho: '',
      productType: 'Feminino', // valor padrão
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
        // 1) pede URL de upload
        const { uploadUrl, fileName } = await fetch(
          `/api/produtos/upload-url?ean=${encodeURIComponent(row.ean.trim())}`
        ).then(res => res.json());
        if (!uploadUrl || !fileName) throw new Error('Falha ao obter URL de upload');

        // 2) faz PUT do arquivo original
        const putRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: row.file
        });
        if (!putRes.ok) throw new Error(`Upload original falhou: ${putRes.status}`);

        // 2.1) torna o original público e obtém a URL simples
        const publishRes = await fetch('/api/produtos/publish-original', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName })
        });
        const publishJson = await publishRes.json();
        const originalUrl = publishJson.publicUrl;
        if (!originalUrl) throw new Error(publishJson.error || 'Falha ao tornar original público');

        // 3) escolhe prompt com base no tipo de produto
        const prompt = promptByType[row.productType] || promptByType['Feminino'];

        // 4) gera imagem ajustada
        const resImg = await fetch('/api/produtos/gerar-imagem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ean: row.ean.trim(),
            fileName,
            prompt,
            descricao: row.descricao,
            marca: row.marca,
            cor: row.cor,
            tamanho: row.tamanho
          })
        });
        const jsonImg = await resImg.json();
        if (!resImg.ok) throw new Error(jsonImg.error || 'Erro interno ao gerar imagem');

        const { url, meta } = jsonImg;

        // 5) atualiza estado visual
        setRows(prev =>
          prev.map(r =>
            r.id === row.id
              ? { ...r, loading: false, result: { url, originalUrl, meta } }
              : r
          )
        );

        // 6) persiste no banco
        if (url) {
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
              imageUrl: url
            })
          });
        }
      } catch (err: any) {
        setRows(prev =>
          prev.map(r =>
            r.id === row.id
              ? { ...r, loading: false, result: { error: err.message || 'Erro inesperado' } }
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
                    <th className="border border-white px-2 py-1">Foto</th>
                    <th className="border border-purple-300 px-2 py-1">Tipo</th>
                    <th className="border border-purple-300 px-2 py-1">EAN</th>
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Descrição</th>}
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Marca</th>}
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Cor</th>}
                    {showDetails && <th className="border border-purple-300 px-2 py-1">Tamanho</th>}
                    <th className="border border-purple-300 px-2 py-1">Status</th>
                    <th className="border border-purple-300 px-2 py-1">Foto ajustada</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border border-purple-300 p-2">
                        {row.preview && (
                          <img
                            src={row.preview}
                            alt="preview"
                            className="h-24 object-cover rounded cursor-pointer"
                            onClick={() => setModalImage(row.preview!)}
                          />
                        )}
                      </td>
                      <td className="border border-purple-300 p-2">
                        <select
                          value={row.productType}
                          onChange={e => handleFieldChange(row.id, 'productType', e.target.value)}
                          className="border rounded p-1 w-full bg-white"
                        >
                          <option>Feminino</option>
                          <option>Masculino</option>
                          <option>Infantil feminino</option>
                          <option>Infantil Masculino</option>
                          <option>Calçado</option>
                          <option>Bolsa</option>
                        </select>
                      </td>
                      <td className="border border-purple-300 p-2">
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
                        className={`border border-purple-300 p-2 text-center ${
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
                      <td className="border border-purple-300 p-2 text-center">
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
