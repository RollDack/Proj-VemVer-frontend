import { Produto } from "../types";
import { BASE_URL } from "./base";

export async function getProdutos(): Promise<Produto[]> {
  const res = await fetch(`${BASE_URL}/produtos/`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function createProduto(data: Omit<Produto, "id">) {
  const res = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}

export async function updateProduto(id: number, data: Omit<Produto, "id">) {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
}

export async function deleteProduto(id: number) {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar produto");
}