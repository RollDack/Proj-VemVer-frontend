"use client";

import Link from "next/link";
import { useState } from "react";

export default function CadastroFuncionario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    idade: 0,
    cep: "",
    telefone: "",
    salario: 0,
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.nome ||
      !form.email.includes("@") ||
      !form.senha ||
      form.cpf.length !== 11 ||
      form.cep.length !== 8 ||
      form.telefone.length < 10 ||
      Number(form.idade) <= 0 ||
      Number(form.salario) <= 0
    ) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }

    try {
      const res = await fetch("https://proj-vemver.onrender.com/funcionarios/criar_funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setSucesso(true);
      setErro("");
    } catch {
      setErro("Erro ao cadastrar funcionário.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Cadastro do Funcionário</h1>
      {erro && <p className="text-red-500">{erro}</p>}
      {sucesso && <p className="text-green-600">Cadastro realizado com sucesso!</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <input name="nome" placeholder="Nome" onChange={handleChange} className="border rounded p-2" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border rounded p-2" />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="border rounded p-2" />
        <input name="cpf" placeholder="CPF" onChange={handleChange} className="border rounded p-2" />
        <input name="idade" type="number" placeholder="Idade" onChange={handleChange} className="border rounded p-2" />
        <input name="cep" placeholder="CEP" onChange={handleChange} className="border rounded p-2" />
        <input name="telefone" placeholder="Telefone" onChange={handleChange} className="border rounded p-2" />
        <input name="salario" type="number" placeholder="Salário" onChange={handleChange} className="border rounded p-2" />
        <button type="submit" className="bg-black text-white p-2 rounded-full">Cadastrar</button>
      </form>
      <p className="text-sm">
        Já tem conta? <Link href="/funcionarios/login" className="underline">Entrar</Link>
      </p>
    </div>
  );
}