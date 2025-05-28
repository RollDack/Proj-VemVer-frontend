"use client";

import { useEffect, useState } from "react";
import { Cliente } from "../types";
import { getClientes, createCliente, deleteCliente } from "@/app/services/clienteservice";

function validarCliente(c: Omit<Cliente, "id">) {
  return (
    c.cpf.length === 11 &&
    c.nome.trim() !== "" &&
    c.email.includes("@") &&
    c.cep.length === 8 &&
    c.telefone.length >= 10 &&
    c.idade > 0
  );
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState<Omit<Cliente, "id">>({
    cpf: "",
    nome: "",
    idade: 0,
    email: "",
    cep: "",
    telefone: "",
  });
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validarCliente(form)) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }
    try {
      const novo = await createCliente(form);
      setClientes([...clientes, novo]);
      setForm({ cpf: "", nome: "", idade: 0, email: "", cep: "", telefone: "" });
      setErro("");
    } catch (e) {
      setErro("Erro ao cadastrar cliente.");
    }
  };
   const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    await deleteCliente(id);
    setClientes(clientes.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <div className="mb-2 text-red-500">{erro}</div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="idade" type="number" placeholder="Idade" value={form.idade} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
        <button className="col-span-2 bg-black text-white p-2 rounded" onClick={handleSubmit}>
          Cadastrar Cliente
        </button>
      </div>

      <ul className="space-y-2">
        {clientes.map((c) => (
          <li key={c.id} className="border p-4 rounded flex justify-between items-center">
            <span>{c.nome} - {c.email}</span>
            <button onClick={() => handleDelete(c.id)} className="text-red-600">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}