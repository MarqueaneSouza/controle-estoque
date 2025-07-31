import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/ListaProdutos.css';

interface Produto {
  id: number;
  nome: string;
  codigoBarras: string;
  descricao: string;
  quantidade: number;
  categoria: string;
}

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    api.get('/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div className="tabela-container">
      <h2>Lista de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código de Barras</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.codigoBarras}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProdutos;
