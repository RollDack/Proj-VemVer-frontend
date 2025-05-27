"use client";

import { useEffect, useState } from "react";
import { Pedido, Cliente, Produto } from "../types";
import { getPedidos, createPedido } from "@/app/services/pedidoservice";
import { getClientes } from "@/app/services/clienteservice";
import { getProdutos } from "@/app/services/produtoservice";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState<Omit<Pedido, "id">>({
    id_cliente: 0,
    id_produto: 0,
    valor_total: 0,
    data_pedido: "",
  });
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([getPedidos(), getClientes(), getProdutos()]).then(
      ([pedidos, clientes, produtos]) => {
        setPedidos(pedidos);
        setClientes(clientes);
        setProdutos(produtos);
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.id_cliente || !form.id_produto || !form.valor_total || !form.data_pedido) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }
    try {
      const novo = await createPedido(form);
      setPedidos([...pedidos, novo]);
      setErro("");
    } catch {
      setErro("Erro ao cadastrar pedido.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <div className="text-red-500 mb-2">{erro}</div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <select name="id_cliente" onChange={handleChange}>
          <option value="">Selecione um cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <select name="id_produto" onChange={handleChange}>
          <option value="">Selecione um produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <input name="valor_total" type="number" placeholder="Valor total" onChange={handleChange} />
        <input name="data_pedido" type="date" onChange={handleChange} />

        <button
          className="col-span-2 bg-black text-white p-2 rounded"
          onClick={handleSubmit}
        >
          Cadastrar Pedido
        </button>
      </div>

      <ul className="space-y-2">
        {pedidos.map((p) => (
          <li key={p.id} className="border p-4 rounded">
            Cliente #{p.id_cliente} comprou Produto #{p.id_produto} - R$ {p.valor_total}
          </li>
        ))}
      </ul>
    </div>
  );
}