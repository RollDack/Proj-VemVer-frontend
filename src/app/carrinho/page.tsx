"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Produto } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface ProdutoComQtd extends Produto {
  quantidade: number;
}

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<ProdutoComQtd[]>([]);
  const router = useRouter();

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(itens);
  }, []);

  const salvarCarrinho = (novoCarrinho: ProdutoComQtd[]) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const removerItem = (id: number) => {
    const atualizado = carrinho.filter((p) => p.id !== id);
    salvarCarrinho(atualizado);
  };

  const alterarQuantidade = (id: number, delta: number) => {
    const atualizado = carrinho.map((item) =>
      item.id === id
        ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
        : item
    );
    salvarCarrinho(atualizado);
  };

  const total = carrinho.reduce((soma, p) => soma + p.preco * p.quantidade, 0);

  const irParaCheckout = () => {
    if (carrinho.length === 0) return alert("Seu carrinho está vazio.");
    router.push("/pedidos/checkout");
  };

  return (
    <div className="min-h-screen bg-white p-6 text-neutral-800">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Meu Carrinho</h1>
      {carrinho.length === 0 ? (
        <p className="text-center">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {carrinho.map((produto) => (
            <div
              key={produto.id}
              className="flex items-center justify-between border p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image src="/glasses1.png" alt={produto.nome} width={60} height={60} />
                <div>
                  <h2 className="font-semibold">{produto.nome}</h2>
                  <p className="text-sm text-gray-600">R$ {produto.preco.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => alterarQuantidade(produto.id, -1)} className="text-xl">➖</button>
                <span className="font-semibold">{produto.quantidade}</span>
                <button onClick={() => alterarQuantidade(produto.id, 1)} className="text-xl">➕</button>
                <button onClick={() => removerItem(produto.id)} className="text-red-600 text-xl">🗑️</button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg">
            Total: R$ {total.toFixed(2)}
          </div>
          <button
            onClick={irParaCheckout}
            className="w-full mt-4 bg-green-600 text-white px-6 py-2 rounded-full"
          >
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
}
