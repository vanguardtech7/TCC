const express = require('express');
const router = express.Router();
const userController = require('../controller/usuarios');

router.get('/usuarios', userController.getAllUsers);
router.delete('/usuarios/:email', userController.deleteUser)
module.exports = router;
