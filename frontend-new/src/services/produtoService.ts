import api from './api';
import { Produto } from '../types';

export const produtoService = {
  getAll: () => api.get<Produto[]>('/produtos'),
  getById: (id: number) => api.get<Produto>(`/produtos/${id}`),
  create: (data: Omit<Produto, 'id'>) => api.post<Produto>('/produtos', data),
  update: (id: number, data: Partial<Produto>) => api.put<Produto>(`/produtos/${id}`, data),
  delete: (id: number) => api.delete(`/produtos/${id}`),
  
  // NOVO: Buscar produto por código de barras (se necessário)
  getByCodigoBarras: (codigoBarras: string) => 
    api.get<Produto[]>(`/produtos?codigoBarras=${codigoBarras}`),
};