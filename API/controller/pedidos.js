const Pedido = require('../models/pedidos');
const jwt = require('jsonwebtoken')
const nodemailerTransporter = require('../config/mailerconfig');
const multer = require('multer');
const Gestor  = require('../models/gestor');
const Usuario = require('../models/usuarios')

const upload = multer();

async function enviarEmailComAnexo(destinatarios, assunto, corpo, anexo) {
  try {
    
    // Iterar sobre cada destinatário e enviar o e-mail
    for (const destinatario of destinatarios) {
      const mailOptions = {
        from: 'sla265827@gmail.com', // Endereço de e-mail do remetente
        to: destinatario,
        subject: assunto,
        text: corpo,
        attachments: [
          {
            filename: anexo ? anexo.originalname : '', // Use o nome original do arquivo, se disponível
            content: anexo ? anexo.buffer : '', // Use o conteúdo do buffer do arquivo, se disponível
            encoding: anexo ? 'base64' : '' // Codifique o conteúdo em base64, se disponível
          }
        ]
      };

      // Enviar o e-mail
      const info = await nodemailerTransporter.sendMail(mailOptions);
      console.log('E-mail enviado para', destinatario, ':', info.messageId);
    }
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

async function criarPedido(req, res) {
  try {
    const { nome_pedido, data, descri, tempo_impre } = req.body;
    
    // Verificar se algum dos campos está vazio
    if (!nome_pedido || !data || !descri || !tempo_impre) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const usuarioId = decodedToken.userId;
    const usuario = await Usuario.findByPk(usuarioId);
    const nome = usuario.nome;
    
    // Processar o envio de arquivos em memória
    upload.single('arquivo')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: 'Erro ao enviar o arquivo', error: err.message });
      }

      // Recuperar todos os e-mails dos gestores
      const gestores = await Gestor.findAll();
      const destinatarios = gestores.map(gestor => gestor.email);

      // Montar o corpo do e-mail
      const corpoEmail = `${nome} fez um agendamento.\n\n` +
                         `Nome do pedido: ${nome_pedido}\n` +
                         `Data: ${data}\n` +
                         `Descrição: ${descri}\n` +
                         `Arquivo do pedido: ${req.file.originalname}`;

      // Enviar o e-mail para todos os gestores
      await enviarEmailComAnexo(destinatarios, 'Novo Agendamento', corpoEmail);

      const novoPedido = await Pedido.create({
        nome_pedido,
        data,
        descri,
        tempo_impre,
        user_id: usuarioId
      });
      res.status(200).json({ message: 'E-mails enviados com sucesso para todos os gestores.' });
    });
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

