const express = require('express');
const router = express.Router();
const userController = require('../controller/usuarios');
const authgestor = require('../middleware/auth')

router.get('/usuarios', userController.getAllUsers);
router.delete('/usuarios/:email', authgestor, userController.deleteUser)
module.exports = router;
