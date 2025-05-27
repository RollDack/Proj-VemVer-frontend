import { Cliente } from "../types";
import { BASE_URL } from "./base";

export async function getClientes(): Promise<Cliente[]> {
  const res = await fetch(`${BASE_URL}/clientes`);
  if (!res.ok) throw new Error("Erro ao buscar clientes");
  return res.json();
}

export async function createCliente(data: Omit<Cliente, "id">) {
  const res = await fetch(`${BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar cliente");
  return res.json();
}