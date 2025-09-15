import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { associacaoService } from '../services/associacaoService';

// Interfaces locais
interface Fornecedor {
  id: number;
  nomeEmpresa: string;
  cnpj: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  contatoPrincipal?: string;
}

interface Produto {
  id: number;
  nome: string;
  codigoBarras: string;
  descricao?: string;
  quantidade?: number;
  categoria?: string;
}

const AssociarFornecedor = () => {
  const [codigoBarras, setCodigoBarras] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [produtosRes, fornecedoresRes] = await Promise.all([
        api.get('/produtos'),
        api.get('/fornecedores')
      ]);
      setProdutos(produtosRes.data);
      setFornecedores(fornecedoresRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados');
    }
  };

  const handleAssociar = async () => {
    if (!codigoBarras || !cnpj) {
      alert('Digite o código de barras e selecione um fornecedor');
      return;
    }

    setLoading(true);
    try {
      await associacaoService.associar(codigoBarras, cnpj);
      alert('Fornecedor associado com sucesso!');
      setCodigoBarras('');
      setCnpj('');
    } catch (error: any) {
      console.error('Erro ao associar fornecedor:', error);
      alert(error.response?.data?.message || 'Erro ao associar fornecedor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Associar Fornecedor a Produto</h2>

      <div>
        <label>Digite o Código de Barras do Produto:</label>
        <input
          type="text"
          placeholder="Código de Barras"
          value={codigoBarras}
          onChange={(e) => setCodigoBarras(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Selecione o Fornecedor:</label>
        <select
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          required
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map(fornecedor => (
            <option key={fornecedor.id} value={fornecedor.cnpj}>
              {fornecedor.nomeEmpresa} - {fornecedor.cnpj}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAssociar} disabled={loading}>
        {loading ? 'Associando...' : 'Associar'}
      </button>
    </div>
  );
};

export default AssociarFornecedor;