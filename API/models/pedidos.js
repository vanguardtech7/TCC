const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');

const pedidos = sequelize.define('Pedidos', {
  nome_pedido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  }.
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tempo_impre:{
  type: DataTypes.TIME,
  }
},
impress_usada:{
    type: DataTypes.STRING
}
{
  // Para não criar a coluna createdAt e updateAt do sequelize e 
  // também para não pluralizar a tabela 
  timestamps: false,
  freezeTableName: true
});

module.exports = pedidos;