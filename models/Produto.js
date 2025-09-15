const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
  }, {
    tableName: 'Produtos' 
  });

  return Produto;
};