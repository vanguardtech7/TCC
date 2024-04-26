const Usuario = require('../models/usuarios');
const Gestor = require('../models/gestor');

exports.getAllUsers = async (req, res) => {
  try {
    const usersUsuarios = await Usuario.findAll();
    const usersGestor = await Gestor.findAll();

    const allUsers = [...usersUsuarios, ...usersGestor];


    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    // Procura pelo e-mail nos modelos de Usuário e Gestor
    const usuario = await Usuario.findOne({ where: { email } });
    const gestor = await Gestor.findOne({ where: { email } });

    // Verifica se o usuário foi encontrado em algum dos modelos
    if (!usuario && !gestor) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Exclui o usuário encontrado
    if (usuario) {
      await usuario.destroy();
    } else {
      await gestor.destroy();
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir usuário' });
  }
};
