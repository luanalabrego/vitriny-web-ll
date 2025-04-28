// src/app/(dashboard)/produtos/novo/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoProduto() {
  const [ean, setEan] = useState('');
  // … demais estados …

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // …
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-900">
        Cadastrar Produto
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* — Campo EAN — */}
        <div>
          <label htmlFor="ean" className="block text-sm font-medium text-gray-700 dark:text-gray-700">
            Código EAN
          </label>
          <input
            type="text"
            id="ean"
            name="ean"
            value={ean}
            onChange={(e) => setEan(e.target.value)}
            placeholder="7891234567890"
            className="
              mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
              bg-white dark:bg-white
              text-gray-900 dark:text-gray-900
              placeholder-gray-400 dark:placeholder-gray-400
              focus:ring-indigo-500 focus:border-indigo-500
            "
            required
          />
        </div>

        {/* — Outros campos: descrição, marca, cor, tamanho — */}
        {/* Aplique neles exatamente as mesmas classes de bg-white/text-gray-900… */}

        <div className="pt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            Salvar Produto
          </button>
        </div>
      </form>
    </div>
  );
}
