import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Fornecedor {
  id: number;
  nomeEmpresa: string;
  cnpj: string;
}

const AssociarProdutoFornecedor = () => {
  const [codigoBarras, setCodigoBarras] = useState('');
  const [cnpjSelecionado, setCnpjSelecionado] = useState('');
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    // Carrega a lista de fornecedores
    const buscarFornecedores = async () => {
      try {
        const resposta = await api.get('/fornecedores');
        setFornecedores(resposta.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    buscarFornecedores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(`/produtos/${codigoBarras}/associar`, {
        cnpj: cnpjSelecionado
      });

      alert('Fornecedor associado com sucesso!');
      setCodigoBarras('');
      setCnpjSelecionado('');
    } catch (error) {
      console.error('Erro ao associar fornecedor:', error);
      alert('Erro ao associar fornecedor.');
    }
  };

  return (
    <div className="form-container">
      <h2>Associar Fornecedor a Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Código de Barras do Produto"
          value={codigoBarras}
          onChange={(e) => setCodigoBarras(e.target.value)}
          required
        />

        <select
          value={cnpjSelecionado}
          onChange={(e) => setCnpjSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.cnpj}>
              {fornecedor.nomeEmpresa} - {fornecedor.cnpj}
            </option>
          ))}
        </select>

        <button type="submit">Associar</button>
      </form>
    </div>
  );
};

export default AssociarProdutoFornecedor;
