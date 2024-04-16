const express = require('express')
const autenticador = require('../controller/login')
const router = express.Router()

router.post('/', autenticador.login)

module.exports = router