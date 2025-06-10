"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] to-white px-6 py-12 text-neutral-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Campanhas Promocionais</h1>
        <p className="text-lg text-gray-600 mb-10">
          Confira as promoções exclusivas que preparamos para você aproveitar e renovar seu estilo com vantagens imperdíveis!
        </p>

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-xl h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/campanha1.png"
              alt="Campanha promocional de óculos com desconto"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Fique atento! As campanhas são por tempo limitado e mudam com frequência. Volte sempre para não perder nenhuma novidade.
          </p>
        </div>
      </div>
    </div>
  );
}
