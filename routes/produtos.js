const express = require('express');
const router = express.Router();

const {
  listarProdutos,
  cadastrarProduto,
  associarFornecedor,
  desassociarFornecedor
} = require('../controllers/produtoController');

// Rota para listar todos os produtos
router.get('/', listarProdutos);

// Rota para cadastrar produto
router.post('/', cadastrarProduto);

// Rota para associar fornecedor ao produto
router.post('/:codigoBarras/associar', associarFornecedor);

// Rota para desassociar fornecedor do produto
router.delete('/:codigoBarras/desassociar', desassociarFornecedor);

module.exports = router;
