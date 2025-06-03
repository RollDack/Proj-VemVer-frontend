"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PerfilPage() {
  const [cliente, setCliente] = useState<any>(null);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("clienteId");
    if (!id) return router.push("/acesso");

    fetch(`https://proj-vemver.onrender.com/clientes/obter/${id}`)
      .then(res => res.json())
      .then(setCliente)
      .catch(() => setCliente(null));

    fetch("https://proj-vemver.onrender.com/pedidos/")
      .then(res => res.json())
      .then(data => setPedidos(data.filter((p: any) => p.id_cliente == id)))
      .catch(() => setPedidos([]));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("clienteId");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 p-6">
      <h1 className="text-2xl font-bold mb-4">Minha Conta</h1>

      {cliente ? (
        <div className="bg-[#D5F2EF] p-4 rounded-xl mb-6">
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>Telefone:</strong> {cliente.telefone}</p>
          <p><strong>CEP:</strong> {cliente.cep}</p>
          <p><strong>Idade:</strong> {cliente.idade}</p>
        </div>
      ) : (
        <p>Carregando perfil...</p>
      )}

      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-full mb-8">
        Sair da Conta
      </button>

      <h2 className="text-xl font-semibold mb-2">Meus Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>Você ainda não realizou pedidos.</p>
      ) : (
        <ul className="space-y-2">
          {pedidos.map(p => (
            <li key={p.id} className="border p-4 rounded-xl">
              Pedido #{p.id} — R$ {p.valor_total.toFixed(2)} — {p.data_pedido}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
