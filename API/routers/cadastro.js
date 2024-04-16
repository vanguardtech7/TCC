const express = require('express')
const cadastrarUser = require('../controller/cadastro')
const authgestor = require('../middleware/auth')
const router = express.Router()

router.post('/cadastro-user', cadastrarUser.criarUsuario)
router.post('/cadastro-gestor',authgestor, cadastrarUser.criarGestor)


module.exports = router