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
  Fornecedores: Fornecedor[];
}

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    api.get('/produtos')
      .then(response => {
        console.log('📦 Dados COMPLETOS da API:', response.data);
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
              <td style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                {produto.codigoBarras}
              </td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.categoria}</td>
              <td>
                {produto.Fornecedores && produto.Fornecedores.length > 0
                  ? produto.Fornecedores.map(f => f.nomeEmpresa).join(', ')
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