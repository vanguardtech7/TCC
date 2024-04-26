const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');


const maquinas = sequelize.define('Maquinas', {
    nome_maquina: {
      type: DataTypes.STRING,
      allowNull: false
      },
      modelo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacidade:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    num_serie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entrada_ener: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especi: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    // Para não criar a coluna createdAt e updateAt do sequelize e 
    // também para não pluralizar a tabela 
    timestamps: false,
    freezeTableName: true
  });
  maquinas.sync()
  module.exports = maquinas;