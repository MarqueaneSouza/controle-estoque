const { Fornecedor } = require('../models');

const listarFornecedores = async (req, res) => {
  try {
    const fornecedores = await Fornecedor.findAll({
      attributes: ['id', 'nomeEmpresa', 'cnpj'] // apenas os dados necessários
    });
    res.json(fornecedores);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar fornecedores.', erro: error.message });
  }
};

const cadastrarFornecedor = async (req, res) => {
  const { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;

  if (!nomeEmpresa || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
  }

  try {
    const existente = await Fornecedor.findOne({ where: { cnpj } });
    if (existente) {
      return res.status(400).json({ mensagem: 'Fornecedor já cadastrado com este CNPJ!' });
    }

    const novo = await Fornecedor.create({
      nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal
    });

    res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso!', fornecedor: novo });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar fornecedor.', erro: error.message });
  }
};

module.exports = {
  listarFornecedores,
  cadastrarFornecedor
};
