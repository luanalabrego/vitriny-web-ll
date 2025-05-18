'use client'

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Camera, ImagePlus, Trash2, Send, Tag } from 'lucide-react';

interface Row {
  id: number;
  persistedId?: number;
  file: File | null;
  preview: string | null;
  ean: string;
  descricao: string;
  marca: string;
  cor: string;
  tamanho: string;
  productType: string;
  aprovacao: string;
  observacao: string;
  result?: { url?: string; originalUrl?: string; error?: string; meta?: any };
  loading?: boolean;
}

export default function NovoProduto() {
  const [credits, setCredits] = useState<number>(0);
  const [rows, setRows] = useState<Row[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/user/credits')
      .then(r => r.json())
      .then(j => setCredits(j.credits ?? 0))
      .catch(() => console.error('Não foi possível ler créditos'));
  }, []);

  const promptByType: Record<string, string> = {
    'Feminino': `
  Create an ultra–high-resolution studio photo of a female fashion model wearing the exact same garment as shown in the reference image, with maximum visual fidelity to all visible garment elements.

⚠️ Important Instructions:

* Reproduce only what is visible in the reference image. Do not redesign, extend, or reinterpret any part of the original garment.
* If the image shows only part of the outfit (e.g., just a top or just the pants/skirt), complete the look with a neutral and understated piece that complements the style of the main garment — the focus must remain on the original item.
* **If the reference image is a full garment** (dress, jumpsuit, romper, one-piece set, etc.), treat it as a complete look and do **not** add any other clothing items.
* Use complementary items that match the style (casual, formal, streetwear), color harmony, and level of formality of the main piece.
* Never stylize or reinterpret the type of clothing shown (e.g., don’t turn a top into a dress, or trousers into leggings).

**Composition & Pose**
– Full-body shot, model centered and turned slightly off-axis (10–15°).
– One hand on the hip, the other arm relaxed.
– Natural posture with slight weight shift.
– Calm, confident facial expression.

**Background & Lighting**
– Clean white or light gray studio background.
– Soft, diffused lighting from multiple angles to highlight fabric and fit.

**Garment Fidelity (critical)**
– Faithfully reproduce the structure, stitching, material, color, pattern, and proportions of the visible garment.
– Do not add or invent details that are not shown.
– The result must look like a professional fashion catalog image.

**Final Output Quality**
– High-end editorial style.
– Sharp garment focus, natural skin tones, clean and artifact-free background.`
  .trim(),

  'BiquiniFitness': `
Create an ultra–high-resolution studio photo of a female fashion model wearing the exact same garment as shown in the reference image, with maximum visual fidelity to all visible garment elements.

⚠️ Important Instructions:

Reproduce only what is clearly visible in the reference image. Do not redesign, extend, or reinterpret any part of the original garment.

If the image shows only part of a set (e.g., just the top or bottom of a bikini, lingerie, or fitness outfit), complete the look with a complementary piece that clearly belongs to the same set, using:

– the same color,  
– same pattern or print,  
– same fabric type and texture,  
– and a consistent and cohesive design.

The final look must appear like a true matching set — never mismatched or generic.

Do not reclassify garments (e.g., don’t turn a fitness top into lingerie or a bikini top into a casual tank top).

Category-Specific Guidance:

– For bikinis: use matching swim fabric and styles (e.g., triangle top + side-tie bottoms).  
– For lingerie: pair with delicate pieces in the same tone and material.  
– For fitnesswear: complement with leggings, biker shorts or gym shorts that match the original top.

Lighting & Style:
– White or light gray studio background.  
– Soft, even lighting to show fabric texture and fit.  
– High-end editorial quality output.`

.trim(),


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
  `
  .trim(),
  
  'Infantil feminino': `
  Create an ultra–high-resolution studio photo of a young girl model wearing the exact same outfit as shown in the reference image.
  
  Composition & Pose:
  – Full-body shot, model centered and facing the camera head-on.  
  – Natural, relaxed stance with a slight shift of weight (one foot slightly forward).  
  – Arms at the sides
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
  `
  .trim(),
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
  – Focus should be razor-sharp on all parts of the outfit.`
  
  .trim(),
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
  shape, materials, and branding.`
  
  .trim(),
    };
  

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newRows = Array.from(files).map((file, idx) => ({
      id: Date.now() + idx,
      file,
      preview: URL.createObjectURL(file),
      ean: file.name.replace(/\.[^/.]+$/, ''),
      descricao: '',
      marca: '',
      cor: '',
      tamanho: '',
      productType: 'Feminino',
      aprovacao: '',
      observacao: '',
    }));
    setRows(prev => [...prev, ...newRows]);
    e.target.value = '';
  };

  const clearSelection = () => setRows([]);

  const handleFieldChange = (
    id: number,
    field: keyof Omit<Row, 'id' | 'file' | 'preview' | 'result' | 'loading' | 'persistedId'>,
    value: string
  ) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
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
    await Promise.all(rows.map(async row => {
      try {
        const { uploadUrl, fileName } = await fetch(
          `/api/produtos/upload-url?ean=${encodeURIComponent(row.ean.trim())}`
        ).then(r => r.json());
        
        if (!uploadUrl || !fileName) throw new Error('Falha ao obter URL de upload');
        await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: row.file
        });
        const publish = await fetch('/api/produtos/publish-original', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName })
        }).then(r => r.json());
        const originalUrl = publish.publicUrl;
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
        }).then(r => r.json());
        if (!jsonImg.url) throw new Error(jsonImg.error || 'Erro ao gerar imagem');
        const { url, meta } = jsonImg;
        const created = await fetch('/api/produtos', {
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
            aprovacao: row.aprovacao,
            observacao: row.observacao
          })
        }).then(r => r.json());
        setRows(prev =>
          prev.map(r =>
            r.id === row.id
              ? { ...r, loading: false, result: { url, originalUrl, meta }, persistedId: created.id }
              : r
          )
        );
        const dec = await fetch('/api/user/decrement-credits', { method: 'POST' }).then(r => r.json());
        if (dec.credits !== undefined) setCredits(dec.credits);
      } catch (err: any) {
        setRows(prev =>
          prev.map(r =>
            r.id === row.id ? { ...r, loading: false, result: { error: err.message } } : r
          )
        );
      }
    }));
  };

  const handleCategorizeAll = async () => {
    const toCat = rows.filter(r => r.persistedId && r.result?.url);
    await Promise.all(toCat.map(row =>
      fetch(`/api/produtos/${row.persistedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aprovacao: row.aprovacao, observacao: row.observacao })
      })
    ));
    alert('Todas as categorias foram salvas!');
  };

  const canSubmit = rows.length > 0 && rows.every(r => r.ean.trim()) && !rows.some(r => r.loading) && credits >= rows.length;
  const canCategorize = rows.some(r => r.persistedId && r.result?.url);

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 text-black">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="px-4 py-2 w-full sm:w-auto bg-green-600 text-white rounded-lg shadow inline-flex items-center gap-2 transition transform hover:scale-105 hover:bg-green-700"
          >
            <Camera className="h-5 w-5" />
            Tirar Foto
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 w-full sm:w-auto bg-blue-600 text-white rounded-lg shadow inline-flex items-center gap-2 transition transform hover:scale-105 hover:bg-blue-700"
          >
            <ImagePlus className="h-5 w-5" />
            Selecionar Imagens
          </button>
          <button
            type="button"
            onClick={clearSelection}
            className="px-4 py-2 w-full sm:w-auto bg-red-600 text-white rounded-lg shadow inline-flex items-center gap-2 transition transform hover:scale-105 hover:bg-red-700"
          >
            <Trash2 className="h-5 w-5" />
            Limpar Seleção
          </button>
          <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFiles} className="hidden" />
          <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFiles} className="hidden" />
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

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {rows.map(row => (
                <div key={row.id} className="bg-white rounded-lg border border-gray-200 shadow p-4 space-y-2">
                  {row.preview && (
                    <img
                      src={row.preview}
                      alt="preview"
                      className="w-full h-40 object-cover rounded-xl shadow-md cursor-pointer"
                      onClick={() => setModalImage(row.preview!)}
                    />
                  )}
                  <select
                    value={row.productType}
                    onChange={e => handleFieldChange(row.id, 'productType', e.target.value)}
                    className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full bg-white text-black"
                  >
                    <option>Feminino</option>
                    <option>Masculino</option>
                    <option>Infantil feminino</option>
                    <option>Infantil Masculino</option>
                    <option>Biquini/Fitness</option>
                    <option>Calçado</option>
                    <option>Bolsa</option>
                  </select>
                  <input
                    value={row.ean}
                    onChange={e => handleFieldChange(row.id, 'ean', e.target.value)}
                    className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                    placeholder="EAN"
                  />
                  {showDetails && (
                    <>
                      <input
                        value={row.descricao}
                        onChange={e => handleFieldChange(row.id, 'descricao', e.target.value)}
                        className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        placeholder="Descrição"
                      />
                      <input
                        value={row.marca}
                        onChange={e => handleFieldChange(row.id, 'marca', e.target.value)}
                        className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        placeholder="Marca"
                      />
                      <input
                        value={row.cor}
                        onChange={e => handleFieldChange(row.id, 'cor', e.target.value)}
                        className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        placeholder="Cor"
                      />
                      <input
                        value={row.tamanho}
                        onChange={e => handleFieldChange(row.id, 'tamanho', e.target.value)}
                        className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        placeholder="Tamanho"
                      />
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    {row.loading ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin" />
                    ) : row.result?.error ? (
                      <span className="text-red-600">Erro</span>
                    ) : row.result?.url ? (
                      <span className="text-green-600">OK</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                    {row.result?.url && (
                      <img
                        src={row.result.url}
                        alt="ajustada"
                        className="h-20 object-cover rounded-xl shadow-md cursor-pointer"
                        onClick={() => setModalImage(row.result!.url!)}
                      />
                    )}
                  </div>
                  {row.result?.url && (
                    <>
                      <select
                        value={row.aprovacao}
                        onChange={e => handleFieldChange(row.id, 'aprovacao', e.target.value)}
                        className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full bg-white text-black"
                      >
                        <option value="">—</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Reprovado">Reprovado</option>
                        <option value="Refazer foto">Refazer foto</option>
                        <option value="Retoque Designer">Retoque Designer</option>
                      </select>
                      <input
                        type="text"
                        value={row.observacao}
                        onChange={e => handleFieldChange(row.id, 'observacao', e.target.value)}
                        className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        placeholder="Observação"
                      />
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
                    <th className="border border-gray-200 px-2 py-1">Foto</th>
                    <th className="border border-gray-200 px-2 py-1">Tipo</th>
                    <th className="border border-gray-200 px-2 py-1">EAN</th>
                    {showDetails && <th className="border border-gray-200 px-2 py-1">Descrição</th>}
                    {showDetails && <th className="border border-gray-200 px-2 py-1">Marca</th>}
                    {showDetails && <th className="border border-gray-200 px-2 py-1">Cor</th>}
                    {showDetails && <th className="border border-gray-200 px-2 py-1">Tamanho</th>}
                    <th className="border border-gray-200 px-2 py-1">Status</th>
                    <th className="border border-gray-200 px-2 py-1">Foto ajustada</th>
                    <th className="border border-gray-200 px-2 py-1">Aprovação</th>
                    <th className="border border-gray-200 px-2 py-1">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-200 p-2">
                        {row.preview && (
                          <img
                            src={row.preview}
                            alt="preview"
                            className="h-16 sm:h-24 object-cover rounded-xl shadow-md cursor-pointer"
                            onClick={() => setModalImage(row.preview!)}
                          />
                        )}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <select
                          value={row.productType}
                          onChange={e => handleFieldChange(row.id, 'productType', e.target.value)}
                          className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full bg-white text-black"
                        >
                          <option>Feminino</option>
                          <option>Masculino</option>
                          <option>Infantil feminino</option>
                          <option>Infantil Masculino</option>
                          <option>Biquini/Fitness</option>
                          <option>Calçado</option>
                          <option>Bolsa</option>
                        </select>
                      </td>
                      <td className="border border-gray-200 p-2">
                        <input
                          value={row.ean}
                          onChange={e => handleFieldChange(row.id, 'ean', e.target.value)}
                          className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                          required
                        />
                      </td>
                      {showDetails && (
                        <td className="border border-gray-200 p-2">
                          <input
                            value={row.descricao}
                            onChange={e => handleFieldChange(row.id, 'descricao', e.target.value)}
                            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="border border-gray-200 p-2">
                          <input
                            value={row.marca}
                            onChange={e => handleFieldChange(row.id, 'marca', e.target.value)}
                            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="border border-gray-200 p-2">
                          <input
                            value={row.cor}
                            onChange={e => handleFieldChange(row.id, 'cor', e.target.value)}
                            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                          />
                        </td>
                      )}
                      {showDetails && (
                        <td className="border border-gray-200 p-2">
                          <input
                            value={row.tamanho}
                            onChange={e => handleFieldChange(row.id, 'tamanho', e.target.value)}
                            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                          />
                        </td>
                      )}
                      <td className="border border-gray-200 p-2 text-center">
                        {row.loading
                          ? <div className="w-4 h-4 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin" />
                          : row.result?.error
                          ? 'Erro'
                          : row.result?.url
                          ? 'OK'
                          : '-'}
                      </td>
                      <td className="border border-gray-200 p-2 text-center">
                        {row.result?.url && (
                          <img
                            src={row.result.url}
                            alt="ajustada"
                            className="h-16 sm:h-24 object-cover rounded-xl shadow-md cursor-pointer"
                            onClick={() => setModalImage(row.result!.url!)}
                          />
                        )}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {row.result?.url ? (
                          <select
                            value={row.aprovacao}
                            onChange={e => handleFieldChange(row.id, 'aprovacao', e.target.value)}
                            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full bg-white text-black"
                          >
                            <option value="">—</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Reprovado">Reprovado</option>
                            <option value="Refazer foto">Refazer foto</option>
                            <option value="Retoque Designer">Retoque Designer</option>
                          </select>
                        ) : '—'}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {row.result?.url ? (
                          <input
                            type="text"
                            value={row.observacao}
                            onChange={e => handleFieldChange(row.id, 'observacao', e.target.value)}
                            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                          />
                        ) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="submit"
                disabled={!canSubmit}
                className="px-4 py-2 w-full sm:w-auto bg-blue-600 text-white rounded-lg shadow inline-flex items-center gap-2 transition transform hover:scale-105 hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
                Enviar Todas
              </button>
              <button
                type="button"
                onClick={handleCategorizeAll}
                disabled={!canCategorize}
                className="px-4 py-2 w-full sm:w-auto bg-indigo-600 text-white rounded-lg shadow inline-flex items-center gap-2 transition transform hover:scale-105 hover:bg-indigo-700 disabled:opacity-50"
              >
                <Tag className="h-5 w-5" />
                Categorizar Todas
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
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
}


