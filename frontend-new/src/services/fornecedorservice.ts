import api from './api';

export interface Fornecedor {
  id?: number;
  nomeEmpresa: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  contatoPrincipal: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fornecedorService = {
  getAll: () => api.get<Fornecedor[]>('/fornecedores'),
  getById: (id: number) => api.get<Fornecedor>(`/fornecedores/${id}`),
  create: (data: Omit<Fornecedor, 'id'>) => api.post<Fornecedor>('/fornecedores', data),
  update: (id: number, data: Partial<Fornecedor>) => api.put<Fornecedor>(`/fornecedores/${id}`, data),
  delete: (id: number) => api.delete(`/fornecedores/${id}`),
};