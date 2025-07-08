const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoBarras: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// const Fornecedor = require('./Fornecedor');

// Produto.belongsToMany(Fornecedor, { through: 'ProdutoFornecedores' });
// Fornecedor.belongsToMany(Produto, { through: 'ProdutoFornecedores' });

module.exports = Produto;
