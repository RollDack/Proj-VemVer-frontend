"use client";

import { useRouter } from "next/navigation";

export default function AcessoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-white">
      <h1 className="text-2xl font-bold">Escolha seu tipo de acesso</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/clientes/login")}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-neutral-800"
        >
          Sou Cliente
        </button>
        <button
          onClick={() => router.push("/funcionarios/login")}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-neutral-800"
        >
          Sou Funcionário
        </button>
      </div>
    </div>
  );
}