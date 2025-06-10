"use client";

import { useEffect, useState } from "react";
import { Produto } from "@/app/types";
import { getProdutos } from "@/app/services/produtoservice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CatalogoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const router = useRouter();

  useEffect(() => {
    getProdutos().then(setProdutos).catch(console.error);
  }, []);

  const imagemPorNome = (nome: string) => {
    const nomeLower = nome.toLowerCase();

    if (nomeLower.includes("óculos de sol")) return "glasses1.png";
    if (nomeLower.includes("lentes de contato vermelhas")) return "glasses3.png";
    if (nomeLower.includes("lentes de contato")) return "glasses2.png";

    return "glasses1.png"; // fallback
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho") || "[]");

    const existente = carrinhoAtual.find((item: any) => item.id === produto.id);

    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinhoAtual.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
    alert("Produto adicionado ao carrinho");
  };

  const comprarAgora = (produto: Produto) => {
    router.push(`/pedidos/checkout?produto=${produto.id}&nome=${encodeURIComponent(produto.nome)}&preco=${produto.preco}&tipo=${produto.tipo}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d0f4ff] to-white text-neutral-800 p-6">
      <h1 className="text-4xl font-bold mb-10 text-center tracking-wide">Catálogo de Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all border border-gray-200 hover:scale-105"
          >
            <Image
              src={`/${imagemPorNome(produto.nome)}`}
              alt={produto.nome}
              width={120}
              height={120}
              className="rounded-full border-4 border-black mb-4"
            />
            <h4 className="text-lg font-semibold text-neutral-800 text-center">
              {produto.nome}
            </h4>
            <p className="text-base text-[#4A4A4A] mt-1 mb-4">
              R$ {produto.preco.toFixed(2)}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all text-sm"
              >
                Adicionar ao carrinho
              </button>
              <button
                onClick={() => comprarAgora(produto)}
                className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all text-sm"
              >
                Comprar agora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
