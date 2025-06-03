"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SobreNos() {
  return (
    <div className="min-h-screen bg-white text-neutral-800">
      {/* Navegação */}
      <motion.nav
        className="flex justify-between items-center px-10 py-6 bg-[#F3F3F3] text-xl shadow-sm sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="font-bold hover:text-[#00a6a6] transition">Óticas Vemver</Link>
        <div className="flex gap-6">
          <Link href="/produtos" className="hover:scale-110 transition-transform">Produtos</Link>
          <Link href="/sobre" className="hover:scale-110 transition-transform text-[#00a6a6] font-semibold">Sobre Nós</Link>
          <Link href="/acesso" className="hover:scale-110 transition-transform">👤</Link>
        </div>
      </motion.nav>

      {/* Introdução */}
      <motion.section
        className="px-8 py-16 text-center bg-[#D5F2EF]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold mb-4">Sobre a Óticas Vemver</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Somos apaixonados por visão e estilo. Desde nossa fundação, temos a missão de ajudar pessoas a enxergar melhor o mundo e a si mesmas, com produtos de qualidade e atendimento acolhedor.
        </p>
      </motion.section>

      {/* História */}
      <motion.section
        className="px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/casal.png"
          alt="Fundadores da ótica"
          width={600}
          height={400}
          className="rounded-xl object-cover shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nossa Jornada</h2>
          <p className="text-gray-700">
            A Óticas Vemver começou como um pequeno negócio familiar com o sonho de oferecer armações estilosas e acessíveis. Hoje, contamos com nossa própria fabricação e atendimento personalizado para cada cliente.
          </p>
        </div>
      </motion.section>

      {/* Valores */}
      <motion.section
        className="px-8 py-16 bg-[#F9FAFB] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-8">Nossos Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-3xl mb-2">💡</p>
            <h4 className="font-semibold mb-2">Inovação</h4>
            <p className="text-gray-600">Estamos sempre buscando novas formas de surpreender nossos clientes.</p>
          </div>
          <div>
            <p className="text-3xl mb-2">🤝</p>
            <h4 className="font-semibold mb-2">Compromisso</h4>
            <p className="text-gray-600">Cada cliente é único e merece nosso melhor atendimento.</p>
          </div>
          <div>
            <p className="text-3xl mb-2">🌱</p>
            <h4 className="font-semibold mb-2">Sustentabilidade</h4>
            <p className="text-gray-600">Prezamos por práticas responsáveis em toda a cadeia de produção.</p>
          </div>
        </div>
      </motion.section>

      {/* Rodapé */}
      <motion.footer
        className="bg-[#D5F2EF] p-6 text-center text-sm mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <Image
            src="/vemver-logo.png"
            alt="Vemver logo"
            width={120}
            height={30}
            className="mx-auto mb-2"
          />
          <p>We help you find your dream glasses.</p>
        </div>
        <div className="flex justify-center gap-4 mb-2">
          <a href="#">Informações</a>
          <a href="#">Empresa</a>
          <a href="#">Contato</a>
        </div>
        <p>2025 © Todos os direitos reservados - Vemver</p>
      </motion.footer>
    </div>
  );
}
