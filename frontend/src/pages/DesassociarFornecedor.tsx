import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/DesassociarFornecedor.css';

const DesassociarFornecedor = () => {
  const [codigoBarras, setCodigoBarras] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

  useEffect(() => {
    api.get('/fornecedores')
      .then(response => setFornecedores(response.data))
      .catch(error => console.error('Erro ao carregar fornecedores:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.delete(`/produtos/${codigoBarras}/desassociar`, {
        data: { cnpj: fornecedorSelecionado }
      });

      alert('Fornecedor desassociado com sucesso!');
      setCodigoBarras('');
      setFornecedorSelecionado('');
    } catch (error) {
      console.error('Erro ao desassociar fornecedor:', error);
      alert('Erro ao desassociar fornecedor.');
    }
  };

  return (
    <div className="form-container">
      <h2>Desassociar Fornecedor de Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Código de Barras do Produto"
          value={codigoBarras}
          onChange={e => setCodigoBarras(e.target.value)}
          required
        />

        <select
          value={fornecedorSelecionado}
          onChange={e => setFornecedorSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((f: any) => (
            <option key={f.id} value={f.cnpj}>
              {f.nomeEmpresa}
            </option>
          ))}
        </select>

        <button type="submit">Desassociar</button>
      </form>
    </div>
  );
};

export default DesassociarFornecedor;
