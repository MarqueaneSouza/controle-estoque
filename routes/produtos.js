const express = require('express');
const router = express.Router();
const { fornecedores } = require('./fornecedores');

let produtos = [];

// Rota GET - listar produtos
router.get('/', (req, res) => {
    res.json(produtos);
});

// Rota POST - cadastrar produto
router.post('/', (req, res) => {
    const { nome, codigoBarras, descricao, quantidade, categoria } = req.body;

    // Validação simples
    if (!nome || !codigoBarras || !descricao || !categoria) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos!' });
    }

    // Verifica duplicidade de código de barras
    const existe = produtos.find(p => p.codigoBarras === codigoBarras);
    if (existe) {
        return res.status(400).json({ mensagem: 'Produto com este código de barras já está cadastrado!' });
    }

    const novoProduto = { 
        nome, 
        codigoBarras, 
        descricao, 
        quantidade, 
        categoria,
        fornecedores: [] // Lista de fornecedores associados
    };

    produtos.push(novoProduto);

    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', produto: novoProduto });
});

// Rota POST - Associar fornecedor a um produto
router.post('/:codigoBarras/associar', (req, res) => {
    const { codigoBarras } = req.params;
    const { cnpj } = req.body;

    const produto = produtos.find(p => p.codigoBarras === codigoBarras);
    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado!' });
    }

    const fornecedor = fornecedores.find(f => f.cnpj === cnpj);
    if (!fornecedor) {
        return res.status(404).json({ mensagem: 'Fornecedor não encontrado!' });
    }

    const jaAssociado = produto.fornecedores.find(f => f.cnpj === cnpj);
    if (jaAssociado) {
        return res.status(400).json({ mensagem: 'Fornecedor já está associado a este produto!' });
    }

    produto.fornecedores.push(fornecedor);
    res.json({ mensagem: 'Fornecedor associado com sucesso ao produto!' });
});

module.exports = router;
