"use client";

import { useEffect, useState } from "react";
import { Funcionario } from "../types";
import { getFuncionarios, createFuncionario } from "@/app/services/funcionarioservice";

function validarFormulario(f: Omit<Funcionario, "id">) {
  return (
    f.cpf.length === 11 &&
    f.nome.trim() !== "" &&
    f.email.includes("@") &&
    f.cep.length === 8 &&
    f.telefone.length >= 10 &&
    f.salario > 0 &&
    f.idade > 0
  );
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [form, setForm] = useState<Omit<Funcionario, "id">>({
    cpf: "",
    nome: "",
    idade: 0,
    email: "",
    cep: "",
    telefone: "",
    salario: 0,
  });
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    getFuncionarios().then(setFuncionarios).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validarFormulario(form)) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }
    try {
      const novo = await createFuncionario(form);
      setFuncionarios([...funcionarios, novo]);
      setForm({
        cpf: "",
        nome: "",
        idade: 0,
        email: "",
        cep: "",
        telefone: "",
        salario: 0,
      });
      setErro("");
    } catch (e) {
      setErro("Erro ao cadastrar funcionário.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Funcionários</h1>
      <div className="mb-2 text-red-500">{erro}</div>
      <div className="mb-6 grid grid-cols-2 gap-4">
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="idade" type="number" placeholder="Idade" value={form.idade} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
        <input name="salario" type="number" placeholder="Salário" value={form.salario} onChange={handleChange} />
        <button
          className="col-span-2 bg-black text-white p-2 rounded"
          onClick={handleSubmit}
        >
          Cadastrar Funcionário
        </button>
      </div>

      <ul className="space-y-2">
        {funcionarios.map((f) => (
          <li key={f.id} className="border p-4 rounded">
            {f.nome} - R$ {f.salario.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}