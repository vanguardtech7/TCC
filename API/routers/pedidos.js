const express = require('express');
const router = express.Router();

const pedidosControllers = require('../controller/pedidos'); 

router.post('/pedidos', pedidosControllers.criarPedido);
router.get('/pedidos', pedidosControllers.listarPedidos);
router.delete('/pedidos/:id', pedidosControllers.excluirPedido);

module.exports = router;

// router.get('/:id', pedidosControllers.buscarPedidoPorId);
// router.put('/:id', pedidosControllers.atualizarPedido);