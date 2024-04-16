const jwt = require('jsonwebtoken');
const Gestor = require('../models/gestor');

// Middleware de autenticação para verificar se o usuário é um gestor
const authGestor = async (req, res, next) => {
  try {
    // Obtenha o token do cabeçalho da solicitação
    const token = req.header('Authorization').replace('Bearer ', '');
    // Verifique se há um token
    if (!token) {
      throw new Error('Token de autenticação não fornecido');
    }
    // Verifique o token
    const decoded = jwt.verify(token, process.env.TOKEN);
    // Encontre o gestor com base no e-mail decodificado
    const gestor = await Gestor.findOne({
      where: {
        email: decoded.email
      }
    });
    // Verifique se o gestor existe
    if (!gestor) {
      throw new Error('Gestor não encontrado');
    }
    // Adicione o gestor à solicitação
    req.gestor = gestor;
    next(); // Vá para a próxima etapa
  } catch (error) {
    console.error('Erro de autenticação do gestor:', error);
    res.status(401).json({ error: 'Não autorizado' });
  }
};

module.exports = authGestor;
