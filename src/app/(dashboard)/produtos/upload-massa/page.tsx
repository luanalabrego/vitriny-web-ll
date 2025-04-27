'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadMassa() {
  const [imagens, setImagens] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [ean, setEan] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [tipoGeracao, setTipoGeracao] = useState('frente');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [progresso, setProgresso] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const novasImagens = Array.from(e.target.files);
      setImagens([...imagens, ...novasImagens]);
      
      // Criar URLs de preview para as imagens
      const novosPreviewUrls = novasImagens.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...novosPreviewUrls]);
    }
  };

  const removerImagem = (index: number) => {
    const novasImagens = [...imagens];
    const novosPreviewUrls = [...previewUrls];
    
    // Revogar URL do objeto para liberar memória
    URL.revokeObjectURL(novosPreviewUrls[index]);
    
    novasImagens.splice(index, 1);
    novosPreviewUrls.splice(index, 1);
    
    setImagens(novasImagens);
    setPreviewUrls(novosPreviewUrls);
  };

  const removerTodasImagens = () => {
    // Revogar todas as URLs para liberar memória
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    setImagens([]);
    setPreviewUrls([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imagens.length === 0) {
      setErro('É necessário fazer upload de pelo menos uma imagem');
      return;
    }

    if (!ean || !marca || !cor || !tamanho) {
      setErro('Todos os campos são obrigatórios');
      return;
    }

    setCarregando(true);
    setErro('');
    setSucesso('');
    setProgresso(0);

    try {
      // Simulando o processamento em lote das imagens
      const totalImagens = imagens.length;
      
      for (let i = 0; i < totalImagens; i++) {
        // Simulando o tempo de processamento de cada imagem
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Atualizar o progresso
        const novoProgresso = Math.round(((i + 1) / totalImagens) * 100);
        setProgresso(novoProgresso);
      }

      setSucesso(`${totalImagens} imagens processadas com sucesso!`);
      setCarregando(false);
      setProgresso(100);
      
      // Limpar o formulário após o sucesso
      setTimeout(() => {
        removerTodasImagens();
        setEan('');
        setMarca('');
        setCor('');
        setTamanho('');
        setTipoGeracao('frente');
        setProgresso(0);
      }, 3000);
    } catch (error) {
      setErro('Erro ao processar imagens. Tente novamente.');
      setCarregando(false);
      setProgresso(0);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload em Massa</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Faça upload de múltiplas imagens e processe-as em lote.
        </p>
      </div>

      {erro && (
        <div className="mx-4 mb-4 bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{erro}</p>
        </div>
      )}

      {sucesso && (
        <div className="mx-4 mb-4 bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-700">{sucesso}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {/* Upload de imagens */}
          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Imagens dos Produtos
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload-massa"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Faça upload de múltiplas imagens</span>
                    <input
                      id="file-upload-massa"
                      name="file-upload-massa"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      ref={fileInputRef}
                      onChange={handleImagemChange}
                    />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG até 10MB cada
                </p>
              </div>
            </div>
          </div>

          {/* Preview de imagens */}
          {previewUrls.length > 0 && (
            <div className="sm:col-span-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {previewUrls.length} imagens selecionadas
                </label>
                <button
                  type="button"
                  onClick={removerTodasImagens}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remover todas
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removerImagem(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Campos comuns para todas as imagens */}
          <div className="sm:col-span-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informações comuns para todas as imagens</h3>
            <p className="text-sm text-gray-500 mb-4">
              Estes dados serão aplicados a todas as imagens selecionadas.
            </p>
          </div>

          {/* EAN */}
          <div className="sm:col-span-3">
            <label htmlFor="ean-massa" className="block text-sm font-medium text-gray-700">
              Código EAN
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="ean-massa"
                id="ean-massa"
                value={ean}
                onChange={(e) => setEan(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Marca */}
          <div className="sm:col-span-3">
            <label htmlFor="marca-massa" className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="marca-massa"
                id="marca-massa"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Cor */}
          <div className="sm:col-span-3">
            <label htmlFor="cor-massa" className="block text-sm font-medium text-gray-700">
              Cor
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="cor-massa"
                id="cor-massa"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Tamanho */}
          <div className="sm:col-span-3">
            <label htmlFor="tamanho-massa" className="block text-sm font-medium text-gray-700">
              Tamanho
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="tamanho-massa"
                id="tamanho-massa"
                value={tamanho}
                onChange={(e) => setTamanho(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Tipo de Geração */}
          <div className="sm:col-span-3">
            <label htmlFor="tipoGeracao-massa" className="block text-sm font-medium text-gray-700">
              Tipo de Geração de Imagem
            </label>
            <div className="mt-1">
              <select
                id="tipoGeracao-massa"
                name="tipoGeracao-massa"
                value={tipoGeracao}
                onChange={(e) => setTipoGeracao(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="frente">Frente</option>
                <option value="costas">Costas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        {carregando && (
          <div className="mt-6">
            <label htmlFor="progresso" className="block text-sm font-medium text-gray-700">
              Progresso: {progresso}%
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={carregando || imagens.length === 0}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {carregando ? 'Processando...' : 'Processar Imagens'}
          </button>
        </div>
      </form>
    </div>
  );
}
