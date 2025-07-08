const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

Produto.belongsToMany(Fornecedor, { through: 'ProdutoFornecedores' });
Fornecedor.belongsToMany(Produto, { through: 'ProdutoFornecedores' });
