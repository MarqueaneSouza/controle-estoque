const express = require('express');
const router = express.Router();
const { fornecedores } = require('./fornecedores');
const {
    listarProdutos,
    cadastrarProduto,
    associarFornecedor,
    desassociarFornecedor
} = require('../controllers/produtoController');

router.get('/', listarProdutos);
router.post('/', cadastrarProduto);
router.post('/, codigoBarras/associar', (req, res) => associarFornecedor(req, res, fornecedores));
router.post('/, codigoBarras/desassociar', desassociarFornecedor);

module.exports = router;
