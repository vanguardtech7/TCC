const express = require('express');
const router = express.Router();
const userController = require('../controller/usuarios');

router.get('/usuarios', userController.getAllUsers);

module.exports = router;
