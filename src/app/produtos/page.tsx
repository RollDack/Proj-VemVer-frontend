"use client";

import { useEffect, useState } from "react";
import { Produto } from "../types";
import { getProdutos, createProduto, deleteProduto } from "@/app/services/produtoservice";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState<Omit<Produto, "id">>({ nome: "", tipo: "", preco: 0 });
  const [erro, setErro] = useState("");

  useEffect(() => {
    getProdutos().then(setProdutos).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.tipo || form.preco <= 0) {
      setErro("Preencha os campos corretamente.");
      return;
    }
    try {
      const novo = await createProduto(form);
      setProdutos([...produtos, novo]);
      setForm({ nome: "", tipo: "", preco: 0 });
      setErro("");
    } catch {
      setErro("Erro ao cadastrar produto");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    await deleteProduto(id);
    setProdutos(produtos.filter(p => p.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <div className="text-red-500 mb-2">{erro}</div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} />
        <input name="preco" type="number" placeholder="Preço" value={form.preco} onChange={handleChange} />
        <button className="col-span-2 bg-black text-white p-2 rounded" onClick={handleSubmit}>
          Cadastrar Produto
        </button>
      </div>

      <ul className="space-y-2">
        {produtos.map((p) => (
          <li key={p.id} className="border p-4 rounded flex justify-between items-center">
            <span>{p.nome} ({p.tipo}) - R$ {p.preco.toFixed(2)}</span>
            <button onClick={() => handleDelete(p.id)} className="text-red-600">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}