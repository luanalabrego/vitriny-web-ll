'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProdutoPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [form, setForm] = useState({ aprovacao: '', observacao: '' });
  const [loading, setLoading] = useState(true);

  // 1) Busca os dados atuais
  useEffect(() => {
    fetch(`/api/produtos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Produto não encontrado');
        return res.json();
      })
      .then(data => {
        setForm({
          aprovacao: data.aprovacao ?? '',
          observacao: data.observacao ?? ''
        });
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar produto');
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 2) Envia o PATCH
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/produtos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/produtos');
    } else {
      const err = await res.json();
      alert(err.error || 'Erro ao salvar alterações');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Aprovação</label>
          <input
            type="text"
            value={form.aprovacao}
            onChange={e => setForm(f => ({ ...f, aprovacao: e.target.value }))}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Observação</label>
          <textarea
            value={form.observacao}
            onChange={e => setForm(f => ({ ...f, observacao: e.target.value }))}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
