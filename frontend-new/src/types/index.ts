export interface Fornecedor {
  id: number;
  nomeEmpresa: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  contatoPrincipal: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Produto {
  id: number;
  nome: string;
  codigoBarras: string;
  descricao: string;
  quantidade: number;
  categoria: string;
  createdAt?: string;
  updatedAt?: string;
  fornecedores?: Fornecedor[];
}

export interface Associacao { // ⬅️ ESTA LINHA DEVE EXISTIR!
  produtoId: number;
  fornecedorId: number;
  createdAt?: string;
}