import { Funcionario } from "../types";
import { BASE_URL } from "../services/base";

export async function getFuncionarios(): Promise<Funcionario[]> {
  const res = await fetch(`${BASE_URL}/funcionarios/`);
  if (!res.ok) throw new Error("Erro ao buscar funcionários");
  return res.json();
}

export async function createFuncionario(data: Omit<Funcionario, "id">) {
  const res = await fetch(`${BASE_URL}/funcionarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar funcionário");
  return res.json();
}

export async function updateFuncionario(id: number, data: Omit<Funcionario, "id">) {
  const res = await fetch(`${BASE_URL}/funcionarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar funcionário");
  return res.json();
}

export async function deleteFuncionario(id: number) {
  const res = await fetch(`${BASE_URL}/funcionarios/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar funcionário");
}
