const Usuario = require("../models/usuarios");
const Gestor = require('../models/gestor');

exports.criarGestor = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Verificar se o email já está cadastrado como usuário
    const emailExistenteUsuario = await Usuario.findOne({ where: { email: email } });
    if (emailExistenteUsuario) {
      return res.status(400).json({ error: "Email já cadastrado como usuário!" });
    }

    // Verificar se o email já está cadastrado como gestor
    const emailExistenteGestor = await Gestor.findOne({ where: { email: email } });
    if (emailExistenteGestor) {
      return res.status(400).json({ error: "Email já cadastrado como gestor!" });
    }

    // Criar o gestor
    const novoGestor = await Gestor.create({ nome, email, senha });

    res.status(201).json({ newGestorId: novoGestor.id, message: "Gestor cadastrado com sucesso" });
  } catch (error) {
    console.error('Erro ao criar gestor:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Erro ao cadastrar Gestor" });
    }
  }
};

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, cargo, turma } = req.body;
    
    // Verificar se o email já está cadastrado como gestor
    const emailExistenteGestor = await Gestor.findOne({ where: { email: email } });
    if (emailExistenteGestor) {
      return res.status(400).json({ error: "Email já cadastrado como gestor!" });
    }

    // Verificar se o email já está cadastrado como usuário
    const emailExistenteUsuario = await Usuario.findOne({ where: { email: email } });
    if (emailExistenteUsuario) {
      return res.status(400).json({ error: "Email já cadastrado como usuário!" });
    }

    // Criar o usuário
    const novoUsuario = await Usuario.create({ nome, email, senha, cargo, turma });

    res.status(201).json({ newUserId: novoUsuario.id, message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Erro ao cadastrar Usuário" });
    }
  }
};
