"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PedidoDetalhesPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const [pedido, setPedido] = useState<any>(null);
  const [produto, setProduto] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://proj-vemver.onrender.com/pedidos/${id}`)
      .then(res => res.json())
      .then((data) => {
        setPedido(data);
        return fetch("https://proj-vemver.onrender.com/produtos/");
      })
      .then(res => res.json())
      .then(prodList => {
        const prod = prodList.find((p: any) => p.id === Number(pedido?.id_produto));
        setProduto(prod);
      })
      .catch(() => router.push("/perfil"));
  }, [id]);

  const cancelarPedido = async () => {
    const confirm = window.confirm("Tem certeza que deseja cancelar este pedido?");
    if (!confirm || !id) return;
    try {
      await fetch(`https://proj-vemver.onrender.com/pedidos/${id}`, {
        method: "DELETE"
      });
      router.push("/perfil");
    } catch (err) {
      console.error("Erro ao cancelar pedido:", err);
    }
  };

  if (!pedido) return <div className="p-6">Carregando pedido...</div>;

  return (
    <div className="min-h-screen bg-white text-neutral-800 p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Pedido #{pedido.id}</h1>

      <div className="bg-[#D5F2EF] p-4 rounded-xl mb-6">
        <p><strong>Cliente ID:</strong> {pedido.id_cliente}</p>
        <p><strong>Produto:</strong> {produto ? produto.nome : `#${pedido.id_produto}`}</p>
        <p><strong>Valor Total:</strong> R$ {pedido.valor_total.toFixed(2)}</p>
        <p><strong>Data:</strong> {pedido.data_pedido}</p>
        <p className="italic text-green-700">Status: Em processamento</p>
      </div>

      <div className="flex gap-4">
        <button onClick={() => router.push("/perfil")} className="bg-black text-white px-4 py-2 rounded-full">
          Voltar para Perfil
        </button>
        <button onClick={cancelarPedido} className="bg-red-600 text-white px-4 py-2 rounded-full">
          Cancelar Pedido
        </button>
      </div>
    </div>
  );
}
