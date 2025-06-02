"use client";

import Link from "next/link";

export default function LoginCliente() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Login do Cliente</h1>
      <form className="flex flex-col gap-4 w-full max-w-xs">
        <input type="email" placeholder="Email" className="border rounded p-2" />
        <input type="password" placeholder="Senha" className="border rounded p-2" />
        <button type="submit" className="bg-black text-white p-2 rounded-full">Entrar</button>
      </form>
      <p className="text-sm">
        Ainda não tem conta? <Link href="/clientes/cadastro" className="underline">Cadastre-se</Link>
      </p>
    </div>
  );
}