"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Catálogo" },
  { href: "/marcas", label: "Marcas" },
  { href: "/campanhas", label: "Campanhas" },
  { href: "/acessorios", label: "Acessórios" },
  { href: "/sobre", label: "Sobre nós" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [perfil, setPerfil] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const cid = localStorage.getItem("clienteId");
    const fid = localStorage.getItem("funcionarioId");
    const who = cid ? "cliente" : fid ? "funcionario" : null;
    const id = cid || fid;
    if (who && id) {
      fetch(`https://proj-vemver.onrender.com/${who}s/obter/${id}`)
        .then(res => res.json())
        .then(data => setNome(data.nome));
      setPerfil("/perfil");
    }
  }, []);

  if (!hasMounted) return null;

  return (
    <nav className="flex flex-col bg-[#D5F2EF] shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-bold text-neutral-800">Vemver</Link>
        <div className="flex items-center gap-4">
          <Link href="/carrinho" className="text-xl" title="Carrinho">🛒</Link>
          {hasMounted && (
            perfil ? (
              <Link
                href={perfil}
                className="text-sm font-medium px-3 py-1 rounded-full bg-black text-white hover:bg-neutral-800"
              >
                {nome ? `Olá, ${nome}` : "Meu Perfil"}
              </Link>
            ) : (
              <Link
                href="/acesso"
                className="text-xl"
                title="Entrar ou cadastrar"
              >
                👤
              </Link>
            )
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4 pb-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors hover:bg-black hover:text-white ${
              pathname === link.href ? "bg-black text-white" : "text-neutral-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
