import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Fornecedor {
  id: number;
  nomeEmpresa: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  contatoPrincipal: string;
}

const ListaFornecedores = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        const resposta = await api.get('/fornecedores');
        setFornecedores(resposta.data);
      } catch (erro) {
        console.error('Erro ao carregar fornecedores:', erro);
      }
    };

    carregarFornecedores();
  }, []);

  return (
    <div>
      <h2>Lista de Fornecedores</h2>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Contato Principal</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.nomeEmpresa}</td>
              <td>{fornecedor.cnpj}</td>
              <td>{fornecedor.endereco}</td>
              <td>{fornecedor.telefone}</td>
              <td>{fornecedor.email}</td>
              <td>{fornecedor.contatoPrincipal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaFornecedores;
