"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";

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

  useEffect(() => {
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

  return (
    <motion.nav
      className="flex flex-col bg-[#D5F2EF] text-neutral-800 shadow-md sticky top-0 z-[999]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold">Vemver</Link>

        <div className="flex items-center gap-6 text-3xl">
          <FaSearch className="cursor-pointer hover:scale-110 transition-transform" title="Buscar" />
          <FaShoppingCart className="cursor-pointer hover:scale-110 transition-transform" title="Carrinho" />
          <Link href={perfil || "/acesso"} title="Perfil ou Acesso">
            <FaUserCircle className="hover:scale-110 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-4 pb-3 flex-wrap">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-base font-medium px-4 py-1 rounded-full transition-colors hover:bg-black hover:text-white ${
              pathname === link.href ? "bg-black text-white" : "text-neutral-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {nome && (
        <div className="text-center text-sm text-neutral-600 pb-2">
          Bem-vindo, <strong>{nome}</strong>
        </div>
      )}
    </motion.nav>
  );
}
