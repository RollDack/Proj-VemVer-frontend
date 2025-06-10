"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const marcas = [
    { nome: "Ray-Ban", img: "/marca1.png", link: "https://www.ray-ban.com/brazil" },
    { nome: "Oakley", img: "/marca2.png", link: "https://www.oakley.com/pt-br" },
    { nome: "Vogue Eyewear", img: "/marca3.png", link: "https://www.vogue-eyewear.com/br" },
    { nome: "Chilli Beans", img: "/marca4.png", link: "https://www.chillibeans.com.br" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-white text-neutral-800 px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Nossas Marcas Parceiras</h1>
        <p className="text-lg text-gray-600 mb-10">
          Trabalhamos com marcas reconhecidas mundialmente para garantir a você qualidade, conforto e estilo em cada armação.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
          {marcas.map((marca) => (
            <Link
              key={marca.nome}
              href={marca.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all block"
            >
              <Image
                src={marca.img}
                alt={marca.nome}
                width={100}
                height={50}
                className="mx-auto"
              />
              <p className="text-sm mt-2 font-semibold">{marca.nome}</p>
            </Link>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-12">
          Estamos sempre ampliando nossas parcerias para trazer mais opções para você. Fique de olho nas novidades!
        </p>
      </div>
    </div>
  );
}
