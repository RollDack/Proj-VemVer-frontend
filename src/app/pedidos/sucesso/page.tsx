"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SucessoPage() {
  const [clienteId, setClienteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cid = localStorage.getItem("clienteId");
    if (!cid) return router.push("/acesso");
    setClienteId(cid);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-neutral-800 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Pedido realizado com sucesso!</h1>
      <p className="text-lg mb-6">Obrigado por comprar conosco. Seu pedido foi confirmado e está sendo processado.</p>
      <div className="bg-[#D5F2EF] p-4 rounded-xl text-center w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-2">🔄 Status do Pedido</h2>
        <p className="text-sm">Seu pedido está em <strong>processamento</strong>. Em breve será despachado.</p>
        <p className="text-sm mt-1 italic text-gray-500">(Histórico detalhado no seu perfil)</p>
      </div>
      <button
        onClick={() => router.push("/perfil")}
        className="bg-black text-white px-6 py-3 rounded-full"
      >
        Ver meus pedidos
      </button>
    </div>
  );
}
