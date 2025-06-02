"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Produto } from "../app/types/index";
import { getProdutos } from "@/app/services/produtoservice";
import Link from "next/link";

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    getProdutos().then(setProdutos).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      {/* Header */}
      <header className="flex items-center justify-between p-6 shadow-sm">
        <h1 className="text-xl font-bold">Vemver</h1>
        <nav className="hidden sm:flex gap-6 text-sm">
          <a href="#">Início</a>
          <a href="#">Categorias</a>
          <a href="#">Marcas</a>
          <a href="#">Campanhas</a>
          <a href="#">Acessórios</a>
          <a href="#">Sobre nós</a>
        </nav>
        <div className="flex gap-4">
          <button>🔍</button>
          <button>🛒</button>
          <Link href="/acesso" className="text-xl">👤</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#D5F2EF] p-10 rounded-xl m-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Vemver o seu próximo óculos
          </h2>
          <p className="mb-2">Muito mais de <strong>50+ modelos</strong></p>
          <p className="mb-4">Com mais de <strong>100+ armações</strong></p>
          <input
            type="text"
            placeholder="O que você veio ver?"
            className="p-2 px-4 rounded-full border border-gray-300 w-full max-w-xs"
          />
        </div>
        <div className="relative w-60 h-60">
          <div className="absolute w-full h-full rounded-full bg-black right-0"></div>
          <Image
            src="/glasses-hand.png"
            alt="Óculos na mão"
            fill
            className="object-contain relative"
          />
        </div>
      </section>

      {/* Mais buscados */}
      <section className="px-6 mt-10">
        <h3 className="text-2xl font-semibold mb-4">Mais buscados</h3>
        <p className="text-sm mb-4">Óculos bonitos tem tudo a ver com estilo. Vemver os mais vistos.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {produtos.slice(0, 3).map((produto) => (
            <div key={produto.id} className="border p-4 rounded-xl text-center">
              <Image src="/glasses1.png" alt={produto.nome} width={150} height={100} className="mx-auto" />
              <h4 className="font-semibold mt-2">{produto.nome}</h4>
              <p className="text-sm text-gray-600">R$ {produto.preco.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <button className="mt-6 bg-black text-white px-4 py-2 rounded-full">Veja mais</button>
      </section>

      {/* Sobre nós */}
      <section className="py-12 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-8">Sobre nós</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="font-bold">♻️</p>
            <p>Materiais sustentáveis</p>
          </div>
          <div>
            <p className="font-bold">🚚</p>
            <p>Fast entrega, pisco checkout</p>
          </div>
          <div>
            <p className="font-bold">🕐</p>
            <p>24 por 48 online</p>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="bg-[#D5F2EF] px-6 py-12">
        <h3 className="text-2xl font-semibold text-center mb-8">Categorias</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <Image src="/sunglasses.png" alt="Óculos de sol" width={100} height={100} className="mx-auto" />
            <p>Óculos de Sol</p>
          </div>
          <div>
            <Image src="/geek-icon.png" alt="Geek" width={100} height={100} className="mx-auto" />
            <p>Geek</p>
          </div>
          <div>
            <Image src="/reading-glasses.png" alt="Óculos de grau" width={100} height={100} className="mx-auto" />
            <p>Óculos de Grau</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-black text-white px-4 py-2 rounded-full">Explore mais →</button>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">O que nossos clientes falam?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 border rounded-xl">
            <p className="italic mb-4">“Lorem ipsum dolor sit amet, consectetur adipiscing elit.”</p>
            <div className="flex items-center gap-4">
              <Image src="/user1.png" alt="Claudinho" width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-semibold">Claudinho</p>
                <p className="text-sm text-gray-500">⭐ 4.5</p>
              </div>
            </div>
          </div>
          <div className="p-6 border rounded-xl">
            <p className="italic mb-4">“Amei o atendimento e a qualidade do óculos.”</p>
            <div className="flex items-center gap-4">
              <Image src="/user2.png" alt="Roberuva" width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-semibold">Roberuva</p>
                <p className="text-sm text-gray-500">⭐ 5.0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#D5F2EF] p-6 text-center text-sm">
        <div className="mb-4">
          <p className="font-bold">Vemver</p>
          <p>We help you find your dream glasses.</p>
        </div>
        <div className="flex justify-center gap-4 mb-2">
          <a href="#">Information</a>
          <a href="#">Company</a>
          <a href="#">Contact</a>
        </div>
        <p>2025 © Todos os direitos reservados - Vemver</p>
      </footer>
    </div>
  );
}