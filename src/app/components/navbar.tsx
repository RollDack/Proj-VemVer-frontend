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
  { href: "/sobrenos", label: "Sobre nós" },
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
      fetch(`https://proj-vemver.onrender.com/${who}s/${id}`)
        .then(res => res.json())
        .then(data => setNome(data.nome));
      setPerfil("/perfil");
    }
  }, []);

  if (!hasMounted) return null;

  return (
  <nav className="bg-gradient-to-r from-[#26B3E3] to-white shadow-md">
    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
      {/* Logo e carrinho/perfil */}
      <div className="flex items-center justify-between w-full md:w-auto mb-2 md:mb-0">
        <Link href="/" className="text-2xl font-bold text-neutral-800">Vemver</Link>
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/carrinho" className="text-xl" title="Carrinho">🛒</Link>
          {perfil ? (
            <Link
              href={perfil}
              className="text-sm font-medium px-3 py-1 rounded-full bg-black text-white hover:bg-neutral-800"
            >
              {nome ? `Olá, ${nome}` : "Meu Perfil"}
            </Link>
          ) : (
            <Link href="/acesso" className="text-xl" title="Entrar ou cadastrar">👤</Link>
          )}
        </div>
      </div>

      {/* Links do menu */}
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
              pathname === link.href
                ? "bg-black text-white"
                : "text-neutral-800 hover:bg-black hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Carrinho e perfil (versão desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/carrinho" className="text-xl" title="Carrinho">🛒</Link>
        {perfil ? (
          <Link
            href={perfil}
            className="text-sm font-medium px-3 py-1 rounded-full bg-black text-white hover:bg-neutral-800"
          >
            {nome ? `Olá, ${nome}` : "Meu Perfil"}
          </Link>
        ) : (
          <Link href="/acesso" className="text-xl" title="Entrar ou cadastrar">👤</Link>
        )}
      </div>
    </div>
  </nav>
);

