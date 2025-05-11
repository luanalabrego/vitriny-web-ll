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
Create an ultra–high-resolution studio photo  of a female fashion model wearing the exact same outfit as shown in the reference image.

Composition & Pose:
– Full-body shot, model centered and facing slightly off-axis (10–15°) for a dynamic look.  
– One hand resting naturally on the hip, with a subtle weight shift to emphasize the silhouette.  
– Soft expression: gentle smile and confident gaze, without looking forced.

Background & Lighting:
– Plain, uniform background (white or light gray) with no harsh shadows.  
– Soft, diffused lighting using a key light and fill light to highlight fabric texture.  
– No distractions or props in the scene.

Clothing Details:
– Accurate replication of colors, patterns, and fabric textures.  
– Logos, labels, and stitching positioned exactly as in the reference, with no blurring or cropping.  
– Natural folds and drapes of the fabric visible to showcase fit and movement.

Styling & Post-processing:
– Editorial style: clean look, crisp focus on the garment.  
– No compression artifacts or digital noise.  
– Subtle color grading to ensure absolute fidelity to the real item.

Reference image will be provided alongside. Ensure maximum fidelity to the garment’s details, shape, and branding.
  `.trim(),
    'Masculino': `
Create an ultra–high-resolution studio photo of a male fashion model wearing the exact same outfit as shown in the reference image.

Composition & Pose:
– Full-body or three-quarter shot, model centered and turned slightly off-axis (10–15°) for a dynamic yet natural stance.  
– Arms relaxed—one hand casually in a pocket or both arms naturally at the sides.  
– Subtle weight shift on one leg to convey confidence and ease.  
– Eyes focused directly on the camera, with a calm, assured expression.

Background & Lighting:
– Plain, uniform background (white or light gray) with zero distractions.  
– Soft, diffused lighting using a key light and fill light to highlight fabric drape and texture.  
– No harsh shadows or reflective hotspots.

Clothing Details:
– Exact match of color, pattern, and weave of the fabric.  
– Logos, labels, and stitching rendered crisply and placed precisely as in the reference.  
– Visible tailoring details (lapels, seams, hems) and natural folds to showcase fit and movement.

Styling & Post-processing:
– Editorial quality: clean look, razor-sharp focus on the garment.  
– Absolutely no compression artifacts or digital noise.  
– Subtle color grading to ensure faithful reproduction of the real item’s appearance.

Reference image will be provided alongside. Ensure maximum fidelity to the garment’s details, tailoring, and branding.
  `.trim(),
    'Infantil feminino': `
Create an ultra–high-resolution studio photo of a young girl model wearing the exact same outfit as shown in the reference image.

Composition & Pose:
– Full-body shot, model centered and facing the camera head-on.  
– Natural, relaxed stance with a slight shift of weight (one foot slightly forward).  
– Arms at the sides or one hand gently holding a small prop (e.g., a ribbon) for a playful touch.  
– Eyes focused directly on the camera with a warm, cheerful smile.

Background & Lighting:
– Plain, uniform background (white or light gray) without distractions.  
– Soft, diffused lighting using a key light and fill light to highlight fabric texture and the child’s features.  
– No harsh shadows or hotspots; ensure even illumination across the model and garment.

Clothing Details:
– Precise replication of color, pattern, and fabric texture.  
– Logos, labels, and any decorative trims rendered crisply and placed exactly as in the reference.  
– Natural folds and drape of the fabric to showcase fit and movement suitable for a child.

Styling & Post-processing:
– Clean, editorial look with crisp focus on the outfit and model.  
– No compression artifacts, digital noise, or over-retouching that alters the garment’s appearance.  
– Subtle, accurate color grading to maintain absolute fidelity to the real item’s colors and details.

Reference image will be provided alongside. Ensure maximum fidelity to the garment’s details, fit, and branding while capturing the youthful, playful spirit of the model.
  `.trim(),
    'Infantil Masculino': `
Create an ultra–high-resolution studio photo of a young boy model wearing the exact same outfit as shown in the reference image.

Composition & Pose:
– Full-body shot, model centered and facing the camera head-on.  
– Natural, relaxed stance with a slight bend in one knee for comfort.  
– Arms at the sides or one hand playfully in a pocket.  
– Eyes looking directly at the camera with a friendly, confident smile.

Background & Lighting:
– Plain, uniform background (white or light gray) with no distractions.  
– Soft, diffused lighting using a key light and fill light to highlight fabric texture without harsh shadows.  
– Ensure even illumination across the child’s face and clothing.

Clothing Details:
– Faithful replication of color, pattern, and fabric texture.  
– Logos, labels, and stitching crisp and precisely positioned as in the reference.  
– Natural folds and drape of the garment to showcase fit and movement appropriate for a child.

Styling & Post-processing:
– Clean, editorial look with razor-sharp focus on the outfit.  
– No compression artifacts, digital noise, or over-retouching.  
– Subtle, accurate color grading to maintain absolute fidelity to the real item’s appearance.

Reference image will be provided alongside. Ensure maximum fidelity to the garment’s details, fit, and branding while keeping the model comfortable and expressive.
  `.trim(),
    'Calçado': `
Generate an ultra–high-resolution studio photograph of the reference footwear only. Frame a tight, close-up three-quarter view—rotate the shoe 10–15° so both side profile and front details fill the frame. Place it flat on a pristine white (or light-gray) background. Illuminate with multi-angle, soft diffused lighting to eliminate all shadows, using a subtle reflector under the sole to add gentle fill light. 

Ensure pixel-perfect fidelity to every element—leather grain, stitching, hardware, ornamentation and sole tread—without any blurring, distortion or over-retouching. Apply an editorial-grade finish: razor-sharp focus edge-to-edge, no compression artifacts or digital noise, and only very subtle, true-to-life color and contrast adjustments to preserve the exact hue and texture of the shoe.
  `.trim(),
    'Bolsa': `
Create an ultra–high-resolution product photo (at least 3000×3000 px) focusing exclusively on the handbag shown in the reference image.

Composition & Framing:
– Full-frame shot capturing the entire bag, slightly rotated (10–15°) to showcase front and side profiles.  
– Bag placed on a flat surface or elegantly suspended by its strap to reveal silhouette and hardware details.

Background & Lighting:
– Plain, uniform background (white or light gray) with no distractions.  
– Soft, diffused multi-angle lighting to eliminate harsh shadows and evenly illuminate all surfaces.  
– Use subtle reflectors to bring out interior lining and metal hardware.

Extreme Detail Emphasis:
– Pixel-perfect replication of every element: grain and texture of leather (or fabric), lining pattern, zipper teeth, hardware finish (buckles, clasps, studs), embossed logos, stitching density.  
– Logos, metal engravings, and tag placements must align exactly with the reference—no blurring or distortion.

Styling & Post-processing:
– Editorial-grade clarity: razor-sharp focus on every seam, texture, and hardware element.  
– No compression artifacts or digital noise.  
– Subtle, true-to-life color grading and contrast adjustments to maintain absolute fidelity to the real item’s appearance.

Reference image will be provided alongside. Ensure absolute, pixel-level fidelity to the handbag’s shape, materials, and branding.

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
