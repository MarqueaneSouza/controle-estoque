import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/ListaProdutos.css';
import { Link } from 'react-router-dom';

interface Fornecedor {
  nomeEmpresa: string;
}

interface Produto {
  id: number;
  nome: string;
  codigoBarras: string;
  descricao: string;
  quantidade: number;
  categoria: string;
  fornecedores: Fornecedor[]; // ✅ CORRIGIDO para minúsculo
}

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    api.get('/produtos')
      .then(response => {
        console.log('🔍 Dados recebidos:', response.data);
        console.log('🔍 Primeiro produto:', response.data[0]);
        console.log('🔍 Tem fornecedores?', response.data[0].fornecedores);
        setProdutos(response.data);
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div className="tabela-container">
      <h2>Lista de Produtos</h2>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/fornecedores/desassociar">Desassociar Fornecedor</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código de Barras</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Categoria</th>
            <th>Fornecedores</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>
                {produto.codigoBarras} {/* ✅ Removido estilo amarelo */}
              </td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.categoria}</td>
              <td>
                {produto.fornecedores && produto.fornecedores.length > 0 // ✅ minúsculo
                  ? produto.fornecedores.map(f => f.nomeEmpresa).join(', ')
                  : 'Sem fornecedor'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProdutos;