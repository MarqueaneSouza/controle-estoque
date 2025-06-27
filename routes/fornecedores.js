const express = require('express');
const router = express.Router();

let fornecedores = [];

// Rota GET - listar fornecedores
router.get('/', (req, res) => {
    res.json(fornecedores);
});

// Rota POST - cadastrar fornecedor
router.post('/', (req, res) => {
    const { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;

    // Validação simples
    if (!nomeEmpresa || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos!' });
    }

    // Verifica duplicidade de CNPJ
    const existe = fornecedores.find(f => f.cnpj === cnpj);
    if (existe) {
        return res.status(400).json({ mensagem: 'Fornecedor com esse CNPJ já está cadastrado!' });
    }

    const novoFornecedor = { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal };
    fornecedores.push(novoFornecedor);

    res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso!', fornecedor: novoFornecedor });
});

module.exports = router;
