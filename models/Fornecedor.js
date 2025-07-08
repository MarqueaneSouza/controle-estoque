const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fornecedor = sequelize.define('Fornecedor', {
    nomeEmpresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contatoPrincipal: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// const Produto = require('./Produto');

// Fornecedor.belongsToMany(Produto, { through: 'ProdutoFornecedores' });
// Produto.belongsToMany(Fornecedor, { through: 'ProdutoFornecedores' });

module.exports = Fornecedor;
