// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Início" },
  { href: "/clientes", label: "Clientes" },
  { href: "/funcionarios", label: "Funcionários" },
  { href: "/produtos", label: "Produtos" },
  { href: "/pedidos", label: "Pedidos" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center gap-4 p-4 bg-[#D5F2EF] shadow-md">
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
    </nav>
  );
}
