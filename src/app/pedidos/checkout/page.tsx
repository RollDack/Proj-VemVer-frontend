"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Produto } from "@/app/types";

export default function CheckoutPage() {
  const [produtos, setProdutos] = useState<(Produto & { quantidade: number })[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cid = localStorage.getItem("clienteId");
    if (!cid) return router.push("/acesso");
    setClienteId(Number(cid));

    const pid = searchParams.get("produto");
    if (pid) {
      const pNome = searchParams.get("nome") || "Produto";
      const pPreco = parseFloat(searchParams.get("preco") || "0");
      const pTipo = searchParams.get("tipo") || "individual";
      setProdutos([{ id: Number(pid), nome: pNome, preco: pPreco, quantidade: 1, tipo: pTipo }]);
    } else {
      const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
      setProdutos(carrinho);
    }
  }, [router, searchParams]);

  const total = produtos.reduce((s, p) => s + p.preco * p.quantidade, 0);

  const irParaPagamento = () => {
    router.push("/pedidos/pagamento");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-neutral-800">
      <h1 className="text-2xl font-bold mb-4">Checkout do Pedido</h1>
      {produtos.map((p) => (
        <div key={p.id} className="flex justify-between border-b py-2">
          <span>{p.nome} x {p.quantidade}</span>
          <span>R$ {(p.preco * p.quantidade).toFixed(2)}</span>
        </div>
      ))}
      <div className="text-right font-bold mt-4 text-lg">
        Total: R$ {total.toFixed(2)}
      </div>
      <button
        onClick={irParaPagamento}
        className="mt-6 bg-black text-white px-6 py-2 rounded-full w-full"
      >
        Ir para Pagamento
      </button>
    </div>
  );
}
