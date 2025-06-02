import { Cliente } from "../types";
import { BASE_URL } from "./base";

export async function getClientes(): Promise<Cliente[]> {
  const res = await fetch(`${BASE_URL}/clientes/`);
  if (!res.ok) throw new Error("Erro ao buscar clientes");
  return res.json();
}

export async function createCliente(data: Omit<Cliente, "id">) {
  const res = await fetch(`${BASE_URL}/clientes/criar_cliente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar cliente");
  return res.json();
}

export async function updateCliente(id: number, data: Omit<Cliente, "id">) {
  const res = await fetch(`${BASE_URL}/clientes/atualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar cliente");
  return res.json();
}

export async function deleteCliente(id: number) {
  const res = await fetch(`${BASE_URL}/clientes/deletar/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar cliente");
}