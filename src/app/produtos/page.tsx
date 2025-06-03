"use client";

import { useEffect, useState } from "react";
import { Produto } from "@/app/types";
import { getProdutos } from "@/app/services/produtoservice";
import Image from "next/image";

export default function CatalogoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    getProdutos().then(setProdutos).catch(console.error);
  }, []);

  const adicionarAoCarrinho = (produto: Produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinhoAtual.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
    alert("Produto adicionado ao carrinho");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-[#D5F2EF] p-4 rounded-xl shadow-md flex flex-col items-center">
            <Image
              src="/glasses1.png"
              alt={produto.nome}
              width={150}
              height={100}
              className="mb-2"
            />
            <h2 className="text-lg font-semibold">{produto.nome}</h2>
            <p className="text-gray-700">R$ {produto.preco.toFixed(2)}</p>
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="mt-4 bg-black text-white px-4 py-2 rounded-full"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}