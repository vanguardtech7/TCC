const Pedido = require('../models/pedidos');

async function criarPedido(req, res) {
    try {
        const { data, descri, tempo_impre, impre_usando } = req.body;
        const novoPedido = await Pedido.create({ data, descri, tempo_impre, impre_usando });
        res.status(201).json({ newPedido: novoPedido.id, message: "pedido cadastrado com sucesso" });
    } catch (error) {
        console.error('Erro no bloco try-catch:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Erro ao cadastrar Pedido" });
        }
    }
}

async function listarPedidos(req, res) {
    try {
        const pedidos = await Pedido.findAll();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao obter os pedidos:', error);
        res.status(500).json({ message: "Erro ao obter os pedidos" });
    }
}

async function excluirPedido(req, res) {
    try {
        const pedido = req.params.id;
        await Pedido.destroy({ where: { id: pedido } });
        res.status(200).json({ message: "Pedido deletado com sucesso" });
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ message: "Erro ao deletar pedido" });
    }
}

module.exports = {
    criarPedido,
    listarPedidos,
    excluirPedido
};

