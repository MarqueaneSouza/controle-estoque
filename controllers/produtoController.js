const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');

const listarProdutos = async (req, res) => {
    try {
        const lista = await Produto.findAll();
        res.json(lista);
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
        const produto = await Produto.findOne({ where: { codigoBarras } });
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado!' });
        }

        const fornecedor = await Fornecedor.findOne({ where: { cnpj } });
        if (!fornecedor) {
            return res.status(404).json({ mensagem: 'Fornecedor não encontrado!' });
        }

        // Verifica se já está associado
        const associados = await produto.getFornecedors({ where: { id: fornecedor.id } });
        if (associados.length > 0) {
            return res.status(400).json({ mensagem: 'Fornecedor já está associado a este produto!' });
        }

        await produto.addFornecedor(fornecedor);
        res.json({ mensagem: 'Fornecedor associado com sucesso ao produto!' });

    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao associar fornecedor.', erro: error.message });
    }
};


const desassociarFornecedor = (req, res) => {
    const { codigoBarras } = req.params;
    const { cnpj } = req.body;

    const produto = produtos.find(p => p.codigoBarras === codigoBarras);
    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado!' });
    }

    const fornecedorIndex = produto.fornecedores.findIndex(f => f.cnpj === cnpj);
    if (fornecedorIndex === -1) {
        return res.status(404).json({ mensagem: 'Fornecedor não está associado a este produto!' });
    }

    produto.fornecedores.splice(fornecedorIndex, 1);
    res.json({ mensagem: 'Fornecedor desassociado com sucesso!' });
};

module.exports = {
    listarProdutos,
    cadastrarProduto,
    associarFornecedor,
    desassociarFornecedor
};
