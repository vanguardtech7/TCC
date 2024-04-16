const Sequelize = require('sequelize');
const sequelize = require('../db/conexao'); // Supondo que seu arquivo de conexão esteja em '../db/conexao.js'

// Defina o modelo da tabela 'maquina'
const Maquina = sequelize.define('maquina', {
  nome_maquina: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  modelo_maquina: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('ativo', 'inativo', 'manutencao')
  }
}, {
  timestamps: false, // Evita que o Sequelize crie campos 'createdAt' e 'updatedAt'

});

// Sincronize o modelo com o banco de dados (isso cria a tabela 'maquina' se ela não existir)
Maquina.sync();

module.exports = Maquina;