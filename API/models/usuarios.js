const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');

const usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo:{
    type: DataTypes.STRING,
    allowNull: false
  },
  turma: {
    type: DataTypes.STRING
  }
},
{
  // Para não criar a coluna createdAt e updateAt do sequelize e 
  // também para não pluralizar a tabela 
  timestamps: false,
  freezeTableName: true
});
usuario.sync();

module.exports = usuario;