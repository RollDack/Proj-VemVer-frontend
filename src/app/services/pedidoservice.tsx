import { Pedido } from "../types";
import { BASE_URL } from "./base";

export async function getPedidos(): Promise<Pedido[]> {
  const res = await fetch(`${BASE_URL}/pedidos`);
  if (!res.ok) throw new Error("Erro ao buscar pedidos");
  return res.json();
}

export async function createPedido(data: Omit<Pedido, "id">) {
  const res = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar pedido");
  return res.json();
}

export async function updatePedido(id: number, data: Omit<Pedido, "id">) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar pedido");
  return res.json();
}

export async function deletePedido(id: number) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar pedido");
}