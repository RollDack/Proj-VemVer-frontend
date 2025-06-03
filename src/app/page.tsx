"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Produto } from "../app/types/index";
import { getProdutos } from "@/app/services/produtoservice";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getProdutos().then(setProdutos).catch(console.error);
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      {/* NAV */}
      <motion.nav
        className="flex justify-between items-center px-10 py-6 bg-[#F3F3F3] text-xl shadow-sm sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <Image src="/vemver-logo.png" alt="Logo Vemver" width={140} height={40} />
        </Link>
        <div className="flex items-center gap-6">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 text-base w-60"
          />
          <Link href="/acesso" title="Entrar ou cadastrar" className="text-2xl hover:scale-110 transition">👤</Link>
          <button title="Carrinho" className="text-2xl hover:scale-110 transition">🛒</button>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section
        className="bg-[#D5F2EF] p-10 rounded-xl m-6 flex flex-col md:flex-row items-center justify-between gap-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Vemver o seu próximo óculos
          </h2>
          <p className="text-xl">Descubra modelos incríveis, com mais de <strong>100 armações</strong></p>
        </motion.div>

        <motion.div
          className="w-[480px] h-[480px] flex items-center justify-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            src="/casal.png"
            alt="Casal com óculos"
            width={1920}
            height={1920}
            className="rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-300"
            priority
          />
        </motion.div>
      </motion.section>

      {/* PRODUTOS POPULARES */}
      <motion.section
        className="px-10 mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold mb-6">Produtos populares</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.slice(0, 3).map((produto, index) => (
            <motion.div
              key={produto.id}
              className="border rounded-xl p-4 text-center hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={`/glasses${index + 1}.png`}
                alt={produto.nome}
                width={200}
                height={150}
                className="mx-auto object-contain"
              />
              <h4 className="font-semibold mt-2 text-lg">{produto.nome}</h4>
              <p className="text-gray-600 text-base">R$ {produto.preco.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/produtos">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">Veja mais produtos</button>
          </Link>
        </div>
      </motion.section>

      {/* DEPOIMENTOS */}
      <motion.section
        className="px-10 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-3xl font-bold mb-8">O que nossos clientes dizem?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[{ nome: "Claudinho", texto: "Adorei o novo modelo! Atendimento top!", nota: "⭐ 4.5", img: "/user1.png" },
            { nome: "Bruna", texto: "Óculos de qualidade e entrega rápida.", nota: "⭐ 5.0", img: "/user2.png" },
          ].map((depo, i) => (
            <motion.div
              key={i}
              className="p-6 border rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="italic mb-4">“{depo.texto}”</p>
              <div className="flex items-center gap-4">
                <Image src={depo.img} alt={depo.nome} width={40} height={40} className="rounded-full" />
                <div>
                  <p className="font-semibold">{depo.nome}</p>
                  <p className="text-sm text-gray-500">{depo.nota}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        className="bg-[#D5F2EF] p-6 text-center text-sm mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <Image src="/vemver-logo.png" alt="Vemver logo" width={120} height={30} className="mx-auto mb-2" />
          <p className="text-base">We help you find your dream glasses.</p>
        </div>
        <div className="flex justify-center gap-4 mb-2 text-sm">
          <Link href="/sobrenos">Sobre nós</Link>
          <Link href="#">Empresa</Link>
          <Link href="#">Contato</Link>
        </div>
        <p>2025 © Todos os direitos reservados - Óticas Vemver</p>
      </motion.footer>
    </div>
  );
}
