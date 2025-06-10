"use client";

import Image from "next/image";

export default function Page() {
  const acessorios = [
    {
      nome: "Cordões",
      img: "/acessorio1.png",
      descricao: "Cordões estilosos para manter seus óculos sempre por perto.",
    },
    {
      nome: "Estojos",
      img: "/acessorio2.png",
      descricao: "Proteção e estilo em um só acessório para seus óculos.",
    },
    {
      nome: "Cases para lentes",
      img: "/acessorio3.png",
      descricao: "Estilo para suas lentes",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] to-white text-neutral-800 px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Acessórios</h1>
        <p className="text-lg text-gray-600 mb-10">
          Descubra nossa seleção de acessórios que complementam seu estilo e oferecem praticidade no dia a dia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {acessorios.map((item) => (
            <div
              key={item.nome}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <Image
                src={item.img}
                alt={item.nome}
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{item.nome}</h2>
              <p className="text-sm text-gray-600">{item.descricao}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-12">
          Leve praticidade e elegância para o seu dia a dia com nossos acessórios exclusivos.
        </p>
      </div>
    </div>
  );
}
