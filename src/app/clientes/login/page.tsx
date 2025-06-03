"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginCliente() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://proj-vemver.onrender.com/clientes/");
      const data = await res.json();
      const cliente = data.find((c: any) => c.email === email && c.senha === senha);
      if (!cliente) throw new Error("Dados inválidos");
      localStorage.setItem("clienteId", cliente.id);
      router.push(`/perfil`);
    } catch {
      setErro("Email ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Login do Cliente</h1>
      {erro && <p className="text-red-500">{erro}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded p-2" />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} className="border rounded p-2" />
        <button type="submit" className="bg-black text-white p-2 rounded-full">Entrar</button>
      </form>
      <p className="text-sm">
        Ainda não tem conta? <Link href="/clientes/cadastro" className="underline">Cadastre-se</Link>
      </p>
    </div>
  );
}