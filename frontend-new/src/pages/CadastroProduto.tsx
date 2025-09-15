import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../services/api';
import '../styles/CadastroProduto.css';

const CadastroProduto = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nome: '',
    codigoBarras: '',
    descricao: '',
    quantidade: 0,
    categoria: ''
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormulario({
    ...formulario,
    [name]: name === 'quantidade' ? Number(value) : value,
  });
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await api.post('/produtos', formulario);
    alert('Produto cadastrado com sucesso!');
    navigate('/');
  } catch (error: any) {
    console.error('Erro ao cadastrar produto:', error);

    if (error.response && error.response.data && error.response.data.mensagem) {
      alert(error.response.data.mensagem); // <- Mensagem do backend
    } else {
      alert('Erro ao cadastrar produto.');
    }
  }
};


  return (
    <div className="form-container">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={formulario.nome} onChange={handleChange} required />
        <input type="text" name="codigoBarras" placeholder="Código de Barras" value={formulario.codigoBarras} onChange={handleChange} required />
        <input type="text" name="descricao" placeholder="Descrição" value={formulario.descricao} onChange={handleChange} required />
        <input type="number" name="quantidade" placeholder="Quantidade" value={formulario.quantidade} onChange={handleChange} required />
        <input type="text" name="categoria" placeholder="Categoria" value={formulario.categoria} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroProduto;
