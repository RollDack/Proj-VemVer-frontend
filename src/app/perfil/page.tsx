"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const [usuario, setUsuario] = useState<any>(null);
  const [tipo, setTipo] = useState<"cliente" | "funcionario" | null>(null);
  const [form, setForm] = useState({ email: "", telefone: "", cep: "", senha: "" });
  const [erro, setErro] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cid = localStorage.getItem("clienteId");
    const fid = localStorage.getItem("funcionarioId");
    const tipoUsuario = cid ? "cliente" : fid ? "funcionario" : null;
    const id = cid || fid;

    if (!tipoUsuario || !id) return router.push("/acesso");

    fetch(`https://proj-vemver.onrender.com/${tipoUsuario}s/obter/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar perfil");
        return res.json();
      })
      .then((data) => {
        setUsuario(data);
        setTipo(tipoUsuario);
        setForm({
          email: data.email,
          telefone: data.telefone,
          cep: data.cep,
          senha: data.senha ?? ""
        });
      })
      .catch((err) => {
        console.error(err);
        setErro("Não foi possível carregar os dados. Faça login novamente.");
      });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!usuario || !tipo) return;
    await fetch(`https://proj-vemver.onrender.com/${tipo}s/atualizar/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...usuario, ...form })
    });
    alert("Atualizado com sucesso");
  };

  const handleLogout = () => {
    localStorage.removeItem("clienteId");
    localStorage.removeItem("funcionarioId");
    router.push("/");
  };

  if (erro) return <p className="p-6 text-red-600">{erro}</p>;
  if (!usuario) return <p className="p-6">Carregando perfil...</p>;

  return (
    <div className="min-h-screen bg-white text-neutral-800 p-6">
      <div className="bg-[#D5F2EF] p-6 rounded-xl max-w-4xl mx-auto shadow-md">
        <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
        <p className="mb-2 font-semibold">Nome: <span className="font-normal">{usuario.nome}</span></p>
        {tipo === "cliente" && <p className="mb-2 font-semibold">CPF: <span className="font-normal">{usuario.cpf}</span></p>}
        {tipo === "funcionario" && <p className="mb-2 font-semibold">Salário: <span className="font-normal">R$ {usuario.salario}</span></p>}
        <p className="mb-4 font-semibold">Idade: <span className="font-normal">{usuario.idade}</span></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input name="email" value={form.email} onChange={handleChange} className="p-2 border rounded" placeholder="Email" />
          <input name="telefone" value={form.telefone} onChange={handleChange} className="p-2 border rounded" placeholder="Telefone" />
          <input name="cep" value={form.cep} onChange={handleChange} className="p-2 border rounded" placeholder="CEP" />
          <input name="senha" value={form.senha} type="password" onChange={handleChange} className="p-2 border rounded" placeholder="Senha" />
        </div>

        <div className="flex gap-4">
          <button onClick={handleUpdate} className="bg-black text-white px-4 py-2 rounded">Salvar alterações</button>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Sair</button>
        </div>
      </div>
    </div>
  );
}
