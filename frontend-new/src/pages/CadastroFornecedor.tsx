import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../services/api';
import '../styles/CadastroFornecedor.css';

const CadastroFornecedor = () => {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contatoPrincipal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/fornecedores', formulario);
      alert('Fornecedor cadastrado com sucesso!');
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao cadastrar fornecedor:', error);

      if (error.response && error.response.data && error.response.data.mensagem) {
        alert(error.response.data.mensagem); // <- mensagem personalizada do backend
      } else {
        alert('Erro ao cadastrar fornecedor.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Fornecedor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nomeEmpresa" placeholder="Nome da Empresa" value={formulario.nomeEmpresa} onChange={handleChange} required />
        <input type="text" name="cnpj" placeholder="CNPJ" value={formulario.cnpj} onChange={handleChange} required />
        <input type="text" name="endereco" placeholder="Endereço" value={formulario.endereco} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={formulario.telefone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="E-mail" value={formulario.email} onChange={handleChange} required />
        <input type="text" name="contatoPrincipal" placeholder="Contato Principal" value={formulario.contatoPrincipal} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroFornecedor;
