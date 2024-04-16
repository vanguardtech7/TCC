const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');

const materiais = sequelize.define('Material', {
  cor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
  diametro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  material:{
    type: DataTypes.STRING,
    allowNull: false
  },
  peso: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
},
{
  // Para não criar a coluna createdAt e updateAt do sequelize e 
  // também para não pluralizar a tabela 
  timestamps: false,
  freezeTableName: true
});
materiais.sync()
module.exports = materiais;