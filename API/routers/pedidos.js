const express = require('express');
const router = express.Router();
const authgestor = require('../middleware/auth')
const pedidosControllers = require('../controller/pedidos'); 

router.post('/pedidos', pedidosControllers.criarPedido);
router.get('/meus-pedidos', pedidosControllers.listarPedidos);
router.get('/pedidos', pedidosControllers.listarTodosOsPedidos);
router.delete('/pedidos/:id', authgestor, pedidosControllers.excluirPedido);
router.delete('/meus-pedidos/:id', pedidosControllers.excluirMeuPedido);

module.exports = router;

// router.get('/:id', pedidosControllers.buscarPedidoPorId);
// router.put('/:id', pedidosControllers.atualizarPedido);
