const express = require('express');
const router = express.Router();
const {
  listarFornecedores,
  cadastrarFornecedor
} = require('../controllers/fornecedorController');

// Rota para listar todos os fornecedores
router.get('/', listarFornecedores);

// Rota para cadastrar novo fornecedor
router.post('/', cadastrarFornecedor);

module.exports = router;
