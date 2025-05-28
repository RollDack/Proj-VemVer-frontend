# 🕶️ Projeto VemVer

Projeto e-commerce com foco em melhorar a experiência do usuário visando aumentar a agilidade com que o usuário escolhe, compra e recebe seus óculos. 
Projeto frontend produzido em **Next.js + TypeScript**. 

---

## 📦 Funcionalidades

- CRUD completo para:
  - Clientes
  - Funcionários
  - Produtos
  - Pedidos
- Filtro de pedidos por cliente
- Página inicial com destaque de produtos
- Validações de formulários
- Exclusões com confirmação
- Integração via `fetch` com API Flask (hospedada no Render)

---

## 🧱 Tecnologias

- Next.js + TypeScript
- Tailwind CSS
- Render (API)
- Estrutura modular com `services/` e `types/`

---

## 📁 Estrutura de Pastas (Frontend)

app/
├── clientes/
│ ├── page.tsx
│ └── id/page.tsx
├── funcionarios/
│ ├── page.tsx
├── pedidos/
│ ├── page.tsx
├── produtos/
│ ├── page.tsx
├── page.tsx #(Home)
services/ # fetch: clienteservice.tsx, produtoservice.tsx, funcionarioservice.tsx, pedidoservice.tsx
types.ts # Tipos compartilhados (Cliente, Produto, funcionario, pedido)

## 🌐 API

A API está hospedada em: https://proj-vemver.onrender.com (API não funcional por enquanto)

E configurada no projeto por meio da constante: export const BASE_URL = "https://proj-vemver.onrender.com";


Como Rodar o Projeto
-- git clone https://github.com/RollDack/Proj-VemVer-frontend.git
-- cd Proj-VemVer-frontend
-- npm install
-- npm run dev
-- Acesse em: http://localhost:3000 (Somente enquanto a API não está funcional)