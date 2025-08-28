const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

Produto.belongsToMany(Fornecedor, {
  through: 'ProdutoFornecedor',
  as: 'Fornecedores',
  foreignKey: 'produtoId'
});

Fornecedor.belongsToMany(Produto, {
  through: 'ProdutoFornecedor',
  as: 'Produtos',
  foreignKey: 'fornecedorId'
});
