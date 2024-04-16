// newPasswordController.js

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

