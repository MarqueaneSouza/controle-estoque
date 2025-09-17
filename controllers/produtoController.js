const { Produto, Fornecedor } = require('../models');

const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: {
        model: Fornecedor,
        as: 'fornecedores',
        attributes: ['nomeEmpresa']

      },
      attributes: ['id', 'nome', 'codigoBarras', 'descricao', 'quantidade', 'categoria'] // ✅ Código de barras incluído
    });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar produtos.', erro: error.message });
  }
};

const cadastrarProduto = async (req, res) => {
  const { nome, codigoBarras, descricao, quantidade, categoria } = req.body;

  if (!nome || !codigoBarras || !descricao || !categoria) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos!' });
  }

  try {
    const existe = await Produto.findOne({ where: { codigoBarras } });
    if (existe) {
      return res.status(400).json({ mensagem: 'Produto com este código de barras já está cadastrado!' });
    }

    const novoProduto = await Produto.create({ nome, codigoBarras, descricao, quantidade, categoria });
    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', produto: novoProduto });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar produto.', erro: error.message });
  }
};

const associarFornecedor = async (req, res) => {
  const { codigoBarras } = req.params;
  const { cnpj } = req.body;

  try {
    console.log('Recebido:', { codigoBarras, cnpj });

    const produto = await Produto.findOne({ where: { codigoBarras } });
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado!' });
    }

    const fornecedor = await Fornecedor.findOne({ where: { cnpj } });
    if (!fornecedor) {
      return res.status(404).json({ mensagem: 'Fornecedor não encontrado!' });
    }

    console.log('Produto ID:', produto.id);
    console.log('Fornecedor ID:', fornecedor.id);

    // Verifica se já está associado
    const associados = await produto.getFornecedores({ where: { id: fornecedor.id } });
    if (associados.length > 0) {
      return res.status(400).json({ mensagem: 'Fornecedor já está associado a este produto!' });
    }

    // ⚠️ TENTE DIFERENTES MÉTODOS (o correto depende do que o Sequelize gerou)
    try {
      // Tenta o método mais comum
      await produto.addFornecedore(fornecedor);
    } catch (metodoError) {
      console.log('Tentando método alternativo...');
      // Se falhar, tenta outro método comum
      await produto.addFornecedores([fornecedor]);
    }

    res.json({ mensagem: 'Fornecedor associado com sucesso ao produto!' });

  } catch (error) {
    console.error('🔴 ERRO DETALHADO AO ASSOCIAR FORNECEDOR 🔴');
    console.error(error);
    return res.status(500).json({
      mensagem: 'Erro ao associar fornecedor.',
      erro: error.message,
      detalhes: 'Verifique o nome exato do método no console do backend'
    });
  }
};

const desassociarFornecedor = async (req, res) => {
  const { codigoBarras } = req.params;
  const { cnpj } = req.body;

  try {
    const produto = await Produto.findOne({ where: { codigoBarras } });
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado!' });
    }

    const fornecedor = await Fornecedor.findOne({ where: { cnpj } });
    if (!fornecedor) {
      return res.status(404).json({ mensagem: 'Fornecedor não encontrado!' });
    }

    const associados = await produto.getFornecedores({ where: { id: fornecedor.id } });
    if (associados.length === 0) {
      return res.status(400).json({ mensagem: 'Fornecedor não está associado a este produto!' });
    }

    // ⚠️ TENTE DIFERENTES MÉTODOS
    try {
      await produto.removeFornecedore(fornecedor);
    } catch (metodoError) {
      await produto.removeFornecedores([fornecedor]);
    }

    res.json({ mensagem: 'Fornecedor desassociado com sucesso do produto!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao desassociar fornecedor.', erro: error.message });
  }
};

module.exports = {
  listarProdutos,
  cadastrarProduto,
  associarFornecedor,
  desassociarFornecedor
};