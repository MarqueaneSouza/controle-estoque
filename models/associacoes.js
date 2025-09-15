const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

// Associações
Produto.belongsToMany(Fornecedor, {
  through: 'ProdutoFornecedor',
  as: 'fornecedores',
  foreignKey: 'produtoId'
});

Fornecedor.belongsToMany(Produto, {
  through: 'ProdutoFornecedor',
  as: 'produtos',
  foreignKey: 'fornecedorId'
});

module.exports = {
  sequelize,
  Produto,
  Fornecedor
};
