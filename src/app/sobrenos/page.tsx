"use client";

import Image from "next/image";

export default function SobreNosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-white text-neutral-800 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Sobre a Vemver</h1>
        <p className="text-lg mb-10">
          Na Vemver, nossa missão é cuidar da sua visão com estilo e acessibilidade. 
          Com fabricação própria, oferecemos mais de 100 modelos de armações, lentes e acessórios 
          para todos os estilos e necessidades.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Image
            src="/casal.png"
            alt="Casal usando óculos"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg"
          />
          <div className="text-left">
            <h2 className="text-2xl font-semibold mb-4">Nossa Visão</h2>
            <p className="mb-4">
              Acreditamos que enxergar bem é um direito de todos. Por isso, buscamos unir qualidade, 
              preço justo e design moderno.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Compromisso</h2>
            <p>
              Trabalhamos com materiais sustentáveis, atendimento personalizado e entrega rápida em todo o Brasil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
