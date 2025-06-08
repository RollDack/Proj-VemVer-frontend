"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Produto } from "@/app/types";

export default function PagamentoPage() {
  const [produtos, setProdutos] = useState<(Produto & { quantidade: number })[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cid = localStorage.getItem("clienteId");
    if (!cid) return router.push("/acesso");
    setClienteId(Number(cid));

    const pid = searchParams.get("produto");
    const pNome = searchParams.get("nome");
    const pPreco = searchParams.get("preco");
    const pTipo = searchParams.get("tipo") || "individual";

    if (pid && pNome && pPreco) {
      const precoConvertido = parseFloat(decodeURIComponent(pPreco));
      setProdutos([
        {
          id: Number(pid),
          nome: decodeURIComponent(pNome),
          preco: isNaN(precoConvertido) ? 0 : precoConvertido,
          quantidade: 1,
          tipo: pTipo
        }
      ]);
    } else {
      const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
      setProdutos(carrinho);
    }
  }, [router, searchParams]);

  const total = produtos.reduce((s, p) => s + p.preco * p.quantidade, 0);

  const confirmarPagamento = async () => {
    if (!clienteId) return;
    let erroOcorrido = false;

    for (const p of produtos) {
      const novoPedido = {
        id_cliente: clienteId,
        id_produto: p.id,
        quantidade: p.quantidade,
        valor_total: p.preco * p.quantidade,
        data_pedido: new Date().toISOString().split("T")[0]
      };

      try {
        const response = await fetch("https://proj-vemver.onrender.com/pedidos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(novoPedido)
        });

        const result = await response.json();
        if (!response.ok) {
          console.error("Erro ao criar pedido:", result);
          alert(`Erro ao criar pedido do produto ${p.nome}: ${result.erro || "Erro desconhecido"}`);
          erroOcorrido = true;
          break;
        }
      } catch (err) {
        console.error("Erro de rede ao criar pedido:", err);
        alert(`Erro de conexão ao enviar pedido do produto ${p.nome}`);
        erroOcorrido = true;
        break;
      }
    }

    if (!erroOcorrido) {
      localStorage.removeItem("carrinho");
      router.push("/pedidos/sucesso");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-neutral-800">
      <h1 className="text-2xl font-bold mb-6 text-center">Pagamento</h1>
      <p className="mb-4">Valor total: <strong>R$ {total.toFixed(2)}</strong></p>

      <div className="grid gap-4 mb-6">
        <input type="text" placeholder="Número do Cartão" className="border p-2 rounded" />
        <input type="text" placeholder="Nome no Cartão" className="border p-2 rounded" />
        <div className="flex gap-2">
          <input type="text" placeholder="Validade" className="border p-2 rounded w-1/2" />
          <input type="text" placeholder="CVV" className="border p-2 rounded w-1/2" />
        </div>
      </div>

      <button
        onClick={confirmarPagamento}
        className="w-full bg-green-600 text-white py-2 rounded-full"
      >
        Confirmar e Pagar
      </button>
    </div>
  );
}
