const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios'); // Importe o modelo de usuário
const Gestor = require('../models/gestor'); // Importe o modelo de gestor

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body; // Adicione "token" ao destructuring

    let user;

    // Verifique se o usuário existe na tabela de usuários
    user = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    // Se o usuário não foi encontrado na tabela de usuários, verifique na tabela de gestores
    if (!user) {
      user = await Gestor.findOne({
        where: {
          email: email,
        },
      });
    }

    // Se nenhum usuário foi encontrado, retorne uma resposta de erro
    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha incorreto' });
    }

    // Verifique se a senha está correta usando bcrypt
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuário ou senha incorreto' });
    }

    // Se chegou até aqui, o login foi bem-sucedido

    // Gere o token JWT
    const token = jwt.sign(
      { email: user.email, userId: user.id },
      process.env.TOKEN,
      { expiresIn: '1h' } // Define a expiração do token
    );

    // Envie o token de volta para o cliente
    res.status(200).json({ token: token, message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};
