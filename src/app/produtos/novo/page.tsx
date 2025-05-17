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
    \\[media pointer="file-service://file-2JokoMPKFu71eXZwRfNitC"]
    Create an ultra–high-resolution studio photo of a female fashion model wearing the exact same outfit as shown in the reference image, with maximum visual fidelity to all visible garment elements.
    
    Composition & Pose:
    – Full-body shot, model centered and turned slightly off-axis (10–15°) for a natural, confident look.
    – One hand resting on the hip, the other arm relaxed.
    – Subtle weight shift for a dynamic silhouette.
    – Calm, confident facial expression with soft eye contact.
    
    Background & Lighting:
    – Plain white or light gray studio background with no distractions.
    – Soft, diffused lighting from multiple angles to evenly illuminate the model and highlight fabric textures.
    
    Garment Fidelity (critical):
    – Carefully analyze the reference image before generating.
    – Replicate the exact structure, fabric, fit, texture, color, stitching, and any visible garment details.
    – Do not reinterpret, simplify, or redesign any part of the clothing.
    – Maintain the proportions, cut, and appearance of every visible element as shown.
    – Treat this as a professional fashion catalog shoot requiring pixel-accurate visual duplication.
    
    Post-processing & Output:
    – High-end editorial quality, with no image artifacts or distortions.
    – Sharp focus on the outfit, natural skin tones, clean studio look.
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
    
    Note: Some garments may contain visible sales or price tags in the reference image, but these must **not appear in the final photo**. Focus strictly on the garment itself.
        `.trim(),
        'Infantil feminino': `
    Create an ultra–high-resolution studio photo of a young girl model wearing the exact same outfit as shown in the reference image.
    
    Composition & Pose:
    – Full-body shot, model centered and facing the camera head-on.
    – Natural, relaxed stance with a slight shift of weight (one foot slightly forward).
    – Arms at the sides.
    – Eyes focused directly on the camera with a warm, cheerful smile.
    
    Background & Lighting:
    – Plain, uniform background (white or light gray) without distractions.
    – Soft, diffused lighting using a key light and fill light to highlight fabric texture and the child’s features.
    – No harsh shadows or hotspots; ensure even illumination across the model and garment.
    
    Clothing Details:
    – Precise replication of color, pattern, and fabric texture.
    – Logos, labels, and any decorative trims rendered crisply and placed exactly as in the reference.
    – Natural folds and drape of the fabric to showcase fit and movement suitable for a child.
    – Special attention to playful and decorative elements typical of children's clothing, such as animal illustrations, character prints, colorful patterns, or embroidery. All designs must be accurately replicated with clarity and correct positioning.
    
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
    – Special attention to playful elements typical of children's clothing, such as animal prints, characters, bold patterns, or decorative details. All designs must be clearly visible and accurately positioned.
    – Natural folds and drape of the garment to showcase fit and movement appropriate for a child.
    
    Styling & Post-processing:
    – Clean, editorial look with razor-sharp focus on the outfit.
    – No compression artifacts, digital noise, or over-retouching.
    – Subtle, accurate color grading to maintain absolute fidelity to the real item’s appearance.
    
    Note: Some garments may contain visible sales or price tags in the reference image, but these must **not appear in the final photo**. Focus exclusively on the clothing.
        `.trim(),
        'Calçado': `
    Generate an ultra–high-resolution studio photograph of the reference footwear only. Frame a tight, close-up three-quarter view—rotate the shoe 10–15° so both side profile and front details fill the frame. Place it on a pristine white (or light-gray) background. Illuminate with multi-angle, soft diffused lighting to eliminate shadows, using a subtle reflector under the sole to add gentle fill light.
    
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
          // PUT original
          const putRes = await fetch(uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/octet-stream' },
            body: row.file,
          });
          if (!putRes.ok) throw new Error('Upload original falhou');

          // publish original
          const publishJson = await fetch('/api/produtos/publish-original', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName }),
          }).then(res => res.json());
          const originalUrl = publishJson.publicUrl;
          if (!originalUrl) throw new Error('Falha ao tornar original público');

          // gerar imagem
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

          // decrement credits
          const decJson = await fetch('/api/user/decrement-credits', {
            method: 'POST',
          }).then(res => res.json());
          if (decJson.credits !== undefined) setCredits(decJson.credits);

          // persist no banco
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
            <div className="hidden md:block overflow-x-auto mt-6 rounded-lg">
               <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-white">
                  <tr className="text-purple-700 font-semibold border-b-2 border-purple-200">
                    <th className="px-4 py-3 text-left">Foto</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">EAN</th>
                    {showDetails && <th className="px-4 py-3 text-left">Descrição</th>}
                    {showDetails && <th className="px-4 py-3 text-left">Marca</th>}
                    {showDetails && <th className="px-4 py-3 text-left">Cor</th>}
                    {showDetails && <th className="px-4 py-3 text-left">Tamanho</th>}
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Foto Ajustada</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2">
                        <img
                          src={row.preview!}
                          alt="preview"
                          className="h-16 w-16 rounded-xl shadow-md object-cover cursor-pointer"
                          onClick={() => setModalImage(row.preview!)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={row.productType}
                          onChange={e => handleFieldChange(row.id, 'productType', e.target.value)}
                          className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          <option>Feminino</option>
                          <option>Masculino</option>
                          <option>Infantil feminino</option>
                          <option>Infantil Masculino</option>
                          <option>Calçado</option>
                          <option>Bolsa</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={row.ean}
                          onChange={e => handleFieldChange(row.id, 'ean', e.target.value)}
                          className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          required
                        />
                      </td>
                      {showDetails && (
                        <td className="px-4 py-2">
                          <input
                            value={row.descricao}
                            onChange={e => handleFieldChange(row.id, 'descricao', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="px-4 py-2">
                          <input
                            value={row.marca}
                            onChange={e => handleFieldChange(row.id, 'marca', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="px-4 py-2">
                          <input
                            value={row.cor}
                            onChange={e => handleFieldChange(row.id, 'cor', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="px-4 py-2">
                          <input
                            value={row.tamanho}
                            onChange={e => handleFieldChange(row.id, 'tamanho', e.target.value)}
                            className="w-full border rounded-md px-2 py-1"
                          />
                        </td>
                      )}
                      <td className="px-4 py-2 text-center">
                        {row.loading
                          ? <span className="animate-spin inline-block w-4 h-4 border-2 border-t-purple-600 rounded-full"></span>
                          : row.result?.url
                            ? '✅'
                            : row.result?.error
                              ? '❌'
                              : '-'}
                      </td>
                      <td className="px-4 py-2 text-center">
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
                <div key={row.id} className="p-4 rounded-lg shadow bg-white">
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
