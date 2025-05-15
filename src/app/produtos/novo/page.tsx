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
  // Estado de créditos do usuário
  const [credits, setCredits] = useState<number>(0);

  // Busca créditos ao montar o componente
  useEffect(() => {
    fetch('/api/user/credits')
      .then(res => res.json())
      .then(json => setCredits(json.credits ?? 0))
      .catch(() => console.error('Não foi possível ler créditos'));
  }, []);

  // Prompts específicos para cada tipo de produto
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

Reference image will be provided alongside. Ensure maximum fidelity to the garment’s details, tailoring, and branding.
Note: Some garments may contain sales tags or price labels in the reference image, but these must **not appear in the final photo**. Focus strictly on the garment itself—**do not include price tags, hang tags, or promotional stickers** in the output.

`.trim(),
'Infantil feminino': `
Create an ultra–high-resolution studio photo of a young girl model wearing the exact same outfit as shown in the reference image.

Composition & Pose:
– Full-body shot, model centered and facing the camera head-on.  
– Natural, relaxed stance with a slight shift of weight (one foot slightly forward).  
– Arms at the sides in a neutral, natural position.  
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

Note: Some garments may contain visible sales or price tags in the reference image, but these must **not appear in the final photo**. The focus should remain solely on the outfit — **no tags, stickers, or promotional labels should be included**.

`.trim(),
'Infantil Masculino': `
Carefully and thoroughly analyze the reference image before generating. Prioritize visual fidelity above creativity. Every visible element of the outfit must be replicated exactly — as if producing a product catalog image of that specific garment.

IMPORTANT INSTRUCTIONS:
– Do not improvise or interpret missing areas.
– Do not change, simplify, or redesign any part of the clothing.
– Do not substitute textures, stitching, prints, or color shades.
– Use the reference image as the definitive blueprint.
– Match the garment’s fabric, cut, print placement, and proportions with absolute precision.

Generate a full-body ultra-high-resolution studio photo of a young boy model wearing the identical outfit shown in the reference.

Pose & Expression:
– Model should stand facing the camera, relaxed, one knee slightly bent.
– Arms naturally at the sides or one hand casually in a pocket.
– Expression: friendly smile, direct eye contact.

Lighting & Background:
– Plain white or light gray background.
– Soft, balanced studio lighting to evenly expose all garment details.
– Highlight fabric texture and preserve all visual accuracy — no creative adjustments.

Post-processing & Quality:
– Editorial-level photo clarity with no artifacts or distortions.
– Subtle, accurate color correction to preserve true tone of the original clothing.
– Focus should be razor-sharp on all parts of the outfit.

`.trim(),
'Calçado': `
Generate an ultra–high-resolution studio photograph of the reference footwear only. Frame a tight, 
close-up three-quarter view—rotate the shoe 10–15° so both side profile and front details fill the frame. 
Place it flat on a pristine white (or light-gray) background. Illuminate with multi-angle, soft diffused 
lighting to eliminate all shadows, using a subtle reflector under the sole to add gentle fill light.  

Ensure pixel-perfect fidelity to every element—leather grain, stitching, hardware, ornamentation and sole 
tread—without any blurring, distortion or over-retouching. Apply an editorial-grade finish: razor-sharp 
focus edge-to-edge, no compression artifacts or digital noise, and only very subtle, true-to-life color 
and contrast adjustments to preserve the exact hue and texture of the shoe.

`.trim(),
'Bolsa': `
Create an ultra–high-resolution product photo (at least 3000×3000 px) focusing exclusively on the 
handbag shown in the reference image.

Composition & Framing:
– Full-frame shot capturing the entire bag, slightly rotated (10–15°) to showcase front and side 
  profiles.  
– Bag placed on a flat surface or elegantly suspended by its strap to reveal silhouette and hardware 
  details.

Background & Lighting:
– Plain, uniform background (white or light gray) with no distractions.  
– Soft, diffused multi-angle lighting to eliminate harsh shadows and evenly illuminate all surfaces.  

Extreme Detail Emphasis:
– Pixel-perfect replication of every element: grain and texture of leather (or fabric), lining pattern, 
  zipper teeth, hardware finish (buckles, clasps, studs), embossed logos, stitching density.  
– Logos, metal engravings, and tag placements must align exactly with the reference—no blurring or 
  distortion.

Styling & Post-processing:
– Editorial-grade clarity: razor-sharp focus on every seam, texture, and hardware element.  
– No compression artifacts or digital noise.  
– Subtle, true-to-life color grading and contrast adjustments to maintain absolute fidelity to the real 
  item’s appearance.

Reference image will be provided alongside. Ensure absolute, pixel-level fidelity to the handbag’s 
shape, materials, and branding.    

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
      // Aqui preenchemos o EAN com o nome do arquivo
      ean: file.name,
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
    if (rows.length > credits) {
      alert(`Você precisa de ${rows.length} créditos, mas tem apenas ${credits}.`);
      return;
    }
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
        if (!putRes.ok) throw new Error(`Upload original falhou: ${putRes.status}`);

        const publishJson = await fetch('/api/produtos/publish-original', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName })
        }).then(res => res.json());
        const originalUrl = publishJson.publicUrl;
        if (!originalUrl) throw new Error(publishJson.error || 'Falha ao tornar original público');

        const prompt = promptByType[row.productType] || promptByType['Feminino'];
        const jsonImg = await fetch('/api/produtos/gerar-imagem', {
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
        }).then(res => res.json());
        if (!jsonImg.url) throw new Error(jsonImg.error || 'Erro interno ao gerar imagem');

        const { url, meta } = jsonImg;
        setRows(prev =>
          prev.map(r =>
            r.id === row.id
              ? { ...r, loading: false, result: { url, originalUrl, meta } }
              : r
          )
        );

        const decJson = await fetch('/api/user/decrement-credits', { method: 'POST' })
          .then(res => res.json());
        if (decJson.credits !== undefined) {
          setCredits(decJson.credits);
        }

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
    !rows.some(r => r.loading) &&
    credits >= rows.length;

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
