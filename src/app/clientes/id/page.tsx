"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Cliente, Pedido, Produto } from "../../types";
import { getClientes } from "@/app/services/clienteservice";
import { getPedidos } from "@/app/services/pedidoservice";
import { getProdutos } from "@/app/services/produtoservice";
import { useRouter } from "next/navigation";

export default function DetalheClientePage() {
  const params = useParams();
  const id_cliente = Number(params?.id);
  const router = useRouter();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    getClientes().then((clientes) => {
      const cli = clientes.find((c) => c.id === id_cliente);
      if (cli) setCliente(cli);
    });
    getPedidos().then((all) => {
      setPedidos(all.filter((p) => p.id_cliente === id_cliente));
    });
    getProdutos().then(setProdutos);
  }, [id_cliente]);

  return (
    <div className="p-6">
      <button onClick={() => router.back()} className="text-sm underline mb-4">← Voltar</button>
      <h1 className="text-2xl font-bold mb-4">Detalhes do Cliente</h1>
      {cliente ? (
        <div className="mb-6">
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>CPF:</strong> {cliente.cpf}</p>
          <p><strong>Telefone:</strong> {cliente.telefone}</p>
        </div>
      ) : (
        <p>Carregando cliente...</p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Pedidos desse cliente</h2>
      {pedidos.length > 0 ? (
        <ul className="space-y-2">
          {pedidos.map((p) => (
            <li key={p.id} className="border p-4 rounded">
              Produto: {produtos.find(prod => prod.id === p.id_produto)?.nome || "N/A"} <br />
              Data: {p.data_pedido} <br />
              Valor: R$ {p.valor_total.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
}