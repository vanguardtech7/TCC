const express = require('express')
const router = express.Router()
const authGestor = require('../middleware/auth')
const Maquina = require('../controller/maquina')

router.post('/maquinas', authGestor, Maquina.criarMaquina)
router.get('/maquinas', Maquina.getAllMaquinas)
router.delete('/maquinas/:id', authGestor, Maquina.deleteMaquina) 

module.exports = router
