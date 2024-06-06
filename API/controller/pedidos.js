const Pedido = require('../models/pedidos');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const nodemailerTransporter = require('../config/mailerconfig');
const multer = require('multer');
const Gestor = require('../models/gestor');
const Usuario = require('../models/usuarios');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



async function enviarEmailComAnexo(destinatarios, assunto, corpo, anexo) {
  try {
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
          }
        ]
      };

      const info = await nodemailerTransporter.sendMail(mailOptions);
      console.log('E-mail enviado para', destinatario, ':', info.messageId);
    }
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

 async function criarPedido(req, res) {
   try {
     // Extrair o token do cabeçalho de autorização
     const token = req.headers.authorization.split(' ')[1];
     const decodedToken = jwt.verify(token, process.env.TOKEN);
     const usuarioId = decodedToken.userId;
     const usuario = await Usuario.findByPk(usuarioId);
    
     // Processar o envio de arquivos em memória dentro do bloco try
     upload.single('arquivo')(req, res, async function (err) {
       try {
         if (err) {
           return res.status(400).json({ message: 'Erro ao enviar o arquivo', error: err.message });
         }

         if (!req.file) {
           return res.status(400).json({ message: 'Arquivo não enviado.' });
         }

         // Recuperar todos os e-mails dos gestores
         const gestores = await Gestor.findAll();
         const destinatarios = gestores.map(gestor => gestor.email);

         // Montar o corpo do e-mail
         const corpoEmail = ` fez um agendamento.\n\n` +
                            `Nome do pedido: ${req.body.nome_pedido}\n` +
                            `Data: ${req.body.data}\n` +
                            `Descrição: ${req.body.descri}\n` +
                            `Arquivo do pedido: ${req.file.originalname}`;

         // Enviar o e-mail para todos os gestores com o anexo
         await enviarEmailComAnexo(destinatarios, 'Novo Agendamento', corpoEmail, req.file);

         const novoPedido = await Pedido.create({
           nome_pedido: req.body.nome_pedido,
           data: req.body.data,
           descri: req.body.descri,
           tempo_impre: req.body.tempo_impre,
           user_id: usuarioId
         });
         res.status(200).json({ message: 'E-mails enviados com sucesso para todos os gestores.' });
       } catch (error) {
         // Captura de erro dentro do upload.single
         console.error('Erro ao criar o pedido:', error);
         res.status(500).json({ message: 'Erro ao criar o pedido', error: error.message });
       }
     });
   } catch (error) {
     // Captura de erro fora do upload.single
     console.error('Erro ao criar o pedido:', error);
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
    // Consultar todos os pedidos e incluir informações sobre o usuário associado a cada pedido
    const todosOsPedidos = await Pedido.findAll({
      include: Usuario // Inclui informações do usuário associado a cada pedido
    });

    // Mapear os pedidos para incluir o nome do usuário associado (se existir)
    const pedidosComNomeUsuario = todosOsPedidos.map(pedido => {
      const nomeUsuario = (pedido.Usuario && pedido.Usuario.nome) ? pedido.Usuario.nome : 'Usuário não encontrado';
      return {
        id: pedido.id,
        nome_pedido: pedido.nome_pedido,
        data: pedido.data,
        descri: pedido.descri,
        tempo_impre: pedido.tempo_impre,
        nome_usuario: nomeUsuario
      };
    });

    res.status(200).json(pedidosComNomeUsuario);
  } catch (error) {
    console.error('Erro ao listar todos os pedidos:', error);
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
