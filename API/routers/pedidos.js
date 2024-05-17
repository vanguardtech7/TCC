const express = require('express');
const router = express.Router();

const pedidosControllers = require('../controller/pedidos'); 

router.post('/pedidos', pedidosControllers.criarPedido);
router.get('/meus-pedidos', pedidosControllers.listarPedidos);
router.get('/pedidos', pedidosControllers.listarTodosOsPedidos);
router.delete('/pedidos/:id', pedidosControllers.excluirPedido);
router.delete('/meus-pedidos/:id', pedidosControllers.excluirMeuPedido);

module.exports = router;

// router.get('/:id', pedidosControllers.buscarPedidoPorId);
// router.put('/:id', pedidosControllers.atualizarPedido);