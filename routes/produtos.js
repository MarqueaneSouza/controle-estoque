const express = require('express');
const router = express.Router();

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

    const novoProduto = { nome, codigoBarras, descricao, quantidade, categoria };
    produtos.push(novoProduto);

    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', produto: novoProduto });
});

module.exports = router;
