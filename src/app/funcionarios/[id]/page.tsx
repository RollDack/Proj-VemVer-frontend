"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function FuncionarioPerfil() {
  const { id } = useParams();
  const router = useRouter();
  const [funcionario, setFuncionario] = useState<any>(null);

  useEffect(() => {
    fetch(`https://proj-vemver.onrender.com/funcionarios/obter/${id}`)
      .then(res => res.json())
      .then(setFuncionario);
  }, [id]);

  const logout = () => {
    localStorage.removeItem("funcionarioId");
    router.push("/");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Perfil do Funcionário</h1>
      {funcionario && (
        <div className="border p-4 rounded">
          <p><strong>Nome:</strong> {funcionario.nome}</p>
          <p><strong>Email:</strong> {funcionario.email}</p>
          <p><strong>Salário:</strong> R$ {funcionario.salario}</p>
        </div>
      )}
      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Sair</button>
    </div>
  );
}