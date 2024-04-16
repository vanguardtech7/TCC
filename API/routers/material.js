const express = require('express')
const materiais = require('../controller/materiais')
const authgestor = require('../middleware/auth')

const router = express.Router()

router.post('/materiais',authgestor, materiais.criarMaterial)
router.get('/materiais', materiais.getAllMaterials)
router.delete('/materiais/:id', authgestor, materiais.deleteMaterial)

module.exports = router