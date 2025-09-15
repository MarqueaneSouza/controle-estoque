import api from './api';

export const associacaoService = {
  // ALTERE para usar codigoBarras em vez de id
  associar: (codigoBarras: string, cnpj: string) => 
    api.post(`/produtos/${codigoBarras}/associar`, { cnpj }),

  // ALTERE para usar codigoBarras em vez de id  
  desassociar: (codigoBarras: string, cnpj: string) => 
    api.delete(`/produtos/${codigoBarras}/desassociar`, { data: { cnpj } }),

  // Mantenha estas se existirem no backend:
  getFornecedoresDoProduto: (produtoId: number) => 
    api.get(`/produtos/${produtoId}/fornecedores`),

  getProdutosDoFornecedor: (fornecedorId: number) => 
    api.get(`/fornecedores/${fornecedorId}/produtos`)
}; 