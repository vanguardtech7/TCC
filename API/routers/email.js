const express = require('express');
const emailController = require('../controller/emailController');

const router = express.Router();

router.post('/reset-password', emailController.enviarEmailRecuperacaoSenha);
router.post('/redefinir-senha', emailController.redefinirSenha);
module.exports = router;
