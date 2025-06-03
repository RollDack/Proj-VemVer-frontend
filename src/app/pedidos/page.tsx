'use client';

import { useEffect, useState } from "react";
import { Pedido, Cliente, Produto } from "@/app/types";
import { getPedidos, createPedido } from "@/app/services/pedidoservice";
import { getClientes } from "@/app/services/clienteservice";
import { getProdutos, decrementarEstoque } from "@/app/services/produtoservice";

export default function PedidoPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState("");

  const [form, setForm] = useState<Omit<Pedido, "id">>({
    id_cliente: 0,
    id_produto: 0,
    valor_total: 0,
    data_pedido: "",
  });

  useEffect(() => {
    async function fetchData() {
      const [pedidosData, clientesData, produtosData] = await Promise.all([
        getPedidos(),
        getClientes(),
        getProdutos(),
      ]);
      setPedidos(pedidosData);
      setClientes(clientesData);
      setProdutos(produtosData);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!form.id_cliente || !form.id_produto || !form.valor_total || !form.data_pedido) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }

    try {
      const novo = await createPedido(form);
      setPedidos([...pedidos, novo]);
      setErro("");

      // Após criar o pedido, atualizar o estoque do produto
      await decrementarEstoque(Number(form.id_produto));

      // Atualizar lista de produtos após alteração
      const produtosAtualizados = await getProdutos();
      setProdutos(produtosAtualizados);

      // Limpar o formulário
      setForm({
        id_cliente: 0,
        id_produto: 0,
        valor_total: 0,
        data_pedido: "",
      });
    } catch {
      setErro("Erro ao cadastrar pedido.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

      {/* Listagem de pedidos */}
      <ul className="mb-6">
        {pedidos.map((p) => (
          <li key={p.id} className="border p-2 rounded mb-2">
            Pedido #{p.id} | Cliente ID: {p.id_cliente} | Produto ID: {p.id_produto} | Valor: R$ {p.valor_total.toFixed(2)} | Data: {p.data_pedido}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Novo Pedido</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
        <select
          value={form.id_cliente}
          onChange={(e) => setForm({ ...form, id_cliente: Number(e.target.value) })}
          className="border p-2 rounded"
        >
          <option value={0}>Selecione um cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <select
          value={form.id_produto}
          onChange={(e) => {
            const selected = Number(e.target.value);
            const produto = produtos.find((p) => p.id === selected);
            setForm({ ...form, id_produto: selected, valor_total: produto?.preco ?? 0 });
          }}
          className="border p-2 rounded"
        >
          <option value={0}>Selecione um produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} ({p.tipo}) - R$ {p.preco.toFixed(2)} - Estoque: {p.quantidade_estoque ?? 0}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.data_pedido}
          onChange={(e) => setForm({ ...form, data_pedido: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          value={form.valor_total}
          disabled
          className="border p-2 rounded bg-gray-100"
        />

        <button
          onClick={handleSubmit}
          className="col-span-1 md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar Pedido
        </button>
      </div>

      {erro && <p className="text-red-500 mt-4">{erro}</p>}
    </div>
  );
}
