const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const Produto = require('./Produto')(sequelize);
const Fornecedor = require('./Fornecedor')(sequelize);

// Aplicar associações com nomes personalizados
Produto.belongsToMany(Fornecedor, {
  through: 'ProdutoFornecedor',
  foreignKey: 'produtoId',
  otherKey: 'fornecedorId',
  as: 'fornecedores' // ⬅️ Este "as" define o nome do método
});

Fornecedor.belongsToMany(Produto, {
  through: 'ProdutoFornecedor',
  foreignKey: 'fornecedorId',
  otherKey: 'produtoId',
  as: 'produtos' // ⬅️ Este "as" define o nome do método
});

// Métodos disponíveis (para debug)
console.log('Métodos de associação do Produto:');
Object.keys(Produto.associations).forEach(key => {
  const association = Produto.associations[key];
  console.log(`- ${key}:`, association.accessors);
});

module.exports = {
  sequelize,
  Produto,
  Fornecedor
};