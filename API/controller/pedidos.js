const Pedido = require('../models/pedidos');
const jwt = require('jsonwebtoken')


async function criarPedido(req, res) {
    try {
        // Extrair o token JWT do cabeçalho da solicitação
        const token = req.headers.authorization.split(' ')[1];

        // Decodificar o token JWT para obter o ID do usuário
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const usuarioId = decodedToken.userId; // Supondo que o ID do usuário está armazenado em userId no token

        // Criar o pedido associando o ID do usuário
        const novoPedido = await Pedido.create({
            nome_pedido: req.body.nome_pedido,
            data: req.body.data,
            descri: req.body.descri,
            tempo_impre: req.body.tempo_impre,
            user_id: usuarioId // Associar o ID do usuário ao pedido
        });

        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o pedido', error: error.message });
    }
}

async function listarPedidos(req, res) {
    try {
        // Extrair o token JWT do cabeçalho da solicitação
        const token = req.headers.authorization.split(' ')[1];

        // Decodificar o token JWT para obter o ID do usuário
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const usuarioId = decodedToken.userId; // Supondo que o ID do usuário está armazenado em userId no token

        // Buscar os pedidos associados ao ID do usuário
        const pedidosDoUsuario = await Pedido.findAll({
            where: {
                user_id: usuarioId
            }
        });

        res.status(200).json(pedidosDoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar os pedidos do usuário', error: error.message });
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

async function excluirMeuPedido(req, res) {
    try {
        // Extrair o token JWT do cabeçalho da solicitação
        const token = req.headers.authorization.split(' ')[1];

        // Decodificar o token JWT para obter o ID do usuário
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const usuarioId = decodedToken.userId; // Supondo que o ID do usuário está armazenado em userId no token

        // ID do pedido a ser excluído
        const pedidoId = req.params.id;

        // Verificar se o pedido pertence ao usuário autenticado
        const pedido = await Pedido.findOne({
            where: {
                id: pedidoId,
                user_id: usuarioId
            }
        });

        // Se o pedido existe e pertence ao usuário autenticado, exclua-o
        if (pedido) {
            await pedido.destroy();
            res.status(200).json({ message: 'Pedido excluído com sucesso.' });
        } else {
            res.status(404).json({ message: 'Pedido não encontrado ou não pertence ao usuário.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o pedido', error: error.message });
    }
}

async function listarTodosOsPedidos(req, res) {
    try {
        // Consultar todos os pedidos
        const pedidos = await Pedido.findAll();

        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar todos os pedidos', error: error.message });
    }
}
module.exports = {
    criarPedido,
    listarPedidos,
    excluirPedido,
    excluirMeuPedido,
    listarTodosOsPedidos
};