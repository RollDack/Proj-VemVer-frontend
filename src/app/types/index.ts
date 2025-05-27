export interface Cliente {
  id: number;
  cpf: string;
  nome: string;
  idade: number;
  email: string;
  cep: string;
  telefone: string;
}

export interface Funcionario {
  id: number;
  cpf: string;
  nome: string;
  idade: number;
  email: string;
  cep: string;
  telefone: string;
  salario: number;
}

export interface Produto {
  id: number;
  nome: string;
  tipo: string;
  preco: number;
  quantidade_estoque?: number;
}

export interface Pedido {
  id: number;
  id_cliente: number;
  id_produto: number;
  valor_total: number;
  data_pedido: string;
}