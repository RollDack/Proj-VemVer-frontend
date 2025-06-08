"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ClientePerfil() {
  const { id } = useParams();
  const router = useRouter();
  const [cliente, setCliente] = useState<any>(null);
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://proj-vemver.onrender.com/clientes/${id}`)
      .then(res => res.json())
      .then(setCliente);

    fetch("https://proj-vemver.onrender.com/pedidos/")
      .then(res => res.json())
      .then(data => setPedidos(data.filter((p: any) => p.id_cliente == id)));
  }, [id]);

  const logout = () => {
    localStorage.removeItem("clienteId");
    router.push("/");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Minha Conta</h1>
      {cliente && (
        <div className="border p-4 rounded">
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>Telefone:</strong> {cliente.telefone}</p>
        </div>
      )}
      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Sair</button>

      <h2 className="text-xl font-semibold mt-6">Meus Pedidos</h2>
      <ul className="space-y-2">
        {pedidos.map(p => (
          <li key={p.id} className="border p-4 rounded">
            Pedido #{p.id} — R$ {p.valor_total} — {p.data_pedido}
          </li>
        ))}
      </ul>
    </div>
  );
}