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
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="bg-black text-white px-4 py-2 rounded-full"
              >
                Adicionar ao carrinho
              </button>
              <button
                onClick={() => comprarAgora(produto)}
                className="bg-green-600 text-white px-4 py-2 rounded-full"
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