const express = require('express');
const router = express.Router();
const { listarFornecedores, cadastrarFornecedor, fornecedores } = require('../controllers/fornecedorController');

router.get('/', listarFornecedores);
router.post('/', cadastrarFornecedor);

module.exports = { router, fornecedores };
