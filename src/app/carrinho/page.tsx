"use client";

import { useEffect, useState } from "react";
import { Produto } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(itens);
  }, []);

  const removerItem = (id: number) => {
    const atualizado = carrinho.filter((p) => p.id !== id);
    setCarrinho(atualizado);
    localStorage.setItem("carrinho", JSON.stringify(atualizado));
  };

  const total = carrinho.reduce((soma, p) => soma + p.preco, 0);

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
              <button
                onClick={() => removerItem(produto.id)}
                className="text-red-600 text-xl"
              >
                🗑️
              </button>
            </div>
          ))}
          <div className="text-right font-bold text-lg">
            Total: R$ {total.toFixed(2)}
          </div>
        </div>
      )}
      <div className="text-center mt-6">
        <Link href="/produtos">
          <button className="bg-black text-white px-6 py-2 rounded-full">
            Continuar comprando
          </button>
        </Link>
      </div>
    </div>
  );
}