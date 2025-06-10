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

  const imagemPorNome = (nome: string) => {
    const nomeLower = nome.toLowerCase();

    if (nomeLower.includes("óculos de sol")) return "glasses1.png";
    if (nomeLower.includes("lentes de contato vermelhas")) return "glasses3.png";
    if (nomeLower.includes("lentes de contato")) return "glasses2.png";

    return "glasses1.png";
  };

  const linkPorNome = (nome: string) => {
    if (nome.toLowerCase().includes("sol")) return "/produtos?categoria=sol";
    if (nome.toLowerCase().includes("geek")) return "/produtos?categoria=geek";
    if (nome.toLowerCase().includes("grau")) return "/produtos?categoria=grau";
    return "/produtos";
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#26B3E3] to-white p-10 rounded-xl m-6 flex flex-col md:flex-row items-center justify-between gap-10 shadow-md">
        <div className="max-w-md">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Vemver o seu próximo óculos
          </h2>
          <p className="mb-2">
            Muito mais de <strong>50+ modelos</strong>
          </p>
          <p className="mb-4">
            Com mais de <strong>100+ armações</strong>
          </p>
          <input
            type="text"
            placeholder="O que você veio ver?"
            className="p-2 px-4 rounded-full border border-black-500 w-full max-w-xs"
          />
        </div>
        <div className="relative w-60 h-60 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <Image
            src="/glasses-hand.png"
            alt="Óculos na mão"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Mais buscados */}
      <section className="px-6 mt-12">
        <h3 className="text-3xl font-bold mb-3 text-neutral-800">
          Mais buscados
        </h3>
        <p className="text-sm text-gray-600 mb-8">
          Óculos bonitos têm tudo a ver com estilo. Vemver os mais vistos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produtos.slice(0, 3).map((produto) => (
            <Link
              href={linkPorNome(produto.nome)}
              key={produto.id}
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all border border-gray-200 hover:scale-105">
                <Image
                  src={`/${imagemPorNome(produto.nome)}`}
                  alt={produto.nome}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-black mb-4"
                />
                <h4 className="text-lg font-semibold text-neutral-800">
                  {produto.nome}
                </h4>
                <p className="text-base text-[#4A4A4A] mt-1">
                  R$ {produto.preco.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/produtos">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all">
              Veja mais →
            </button>
          </Link>
        </div>
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
      <section className="bg-gradient-to-br from-[#d0f4ff] to-[#26B3E3] px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-neutral-800 mb-10">
          Categorias
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <Link
            href="/produtos?categoria=sol"
            className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-all block"
          >
            <Image
              src="/sunglasses.png"
              alt="Óculos de sol"
              width={120}
              height={120}
              className="mx-auto mb-4 rounded-full border-4 border-black"
            />
            <p className="text-lg font-semibold text-gray-800">
              Óculos de Sol
            </p>
          </Link>

          <Link
            href="/produtos?categoria=geek"
            className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-all block"
          >
            <Image
              src="/geek-icon.png"
              alt="Geek"
              width={120}
              height={120}
              className="mx-auto mb-4 rounded-full border-4 border-black"
            />
            <p className="text-lg font-semibold text-gray-800">Geek</p>
          </Link>

          <Link
            href="/produtos?categoria=grau"
            className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-all block"
          >
            <Image
              src="/reading-glasses.png"
              alt="Óculos de grau"
              width={120}
              height={120}
              className="mx-auto mb-4 rounded-full border-4 border-black"
            />
            <p className="text-lg font-semibold text-gray-800">
              Óculos de Grau
            </p>
          </Link>
        </div>

        <div className="text-center mt-10">
          <Link href="/produtos">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all">
              Explore mais →
            </button>
          </Link>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">
          O que nossos clientes falam?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 border rounded-xl">
            <p className="italic mb-4">
              “SUPPPPEERRRR RECOMEENDDDOOO LOJA INCRÍVEL”
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/user1.png"
                alt="Claudinho"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Claudinho</p>
                <p className="text-sm text-gray-500">⭐ 4.5</p>
              </div>
            </div>
          </div>
          <div className="p-6 border rounded-xl">
            <p className="italic mb-4">
              “Amei o atendimento e a qualidade do óculos.”
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/user2.png"
                alt="Roberuva"
                width={40}
                height={40}
                className="rounded-full"
              />
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
