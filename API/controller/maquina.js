const Maquina = require('../models/maquinas.js')

exports.criarMaquina = async (req, res) => {
  try {
      const { nome_maquina, modelo, capacidade, num_serie, entrada_ener, especi } = req.body;

      // Verificar se algum dos campos está vazio
      if (!nome_maquina || !modelo || !capacidade || !num_serie || !entrada_ener || !especi) {
          return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Cria uma nova instância de Maquina com os dados recebidos
      const novaMaquina = new Maquina({
          nome_maquina,
          modelo,
          capacidade,
          num_serie,
          entrada_ener,
          especi
      });

      // Salva a nova máquina no banco de dados
      await novaMaquina.save();

      return res.status(201).json({ newMaquina: novaMaquina.id, message: "Máquina cadastrada com sucesso" });
  } catch (error) {
      console.error('Erro no bloco try-catch:', error);
      if (!res.headersSent) {
          return res.status(500).json({ message: "Erro ao cadastrar Máquina" });
      }
  }
}

exports.getAllMaquinas = async (req, res) => {
    try {
      const maquinas = await Maquina.findAll(); // Obtém todos os materiais do banco de dados
  
      res.status(200).json(maquinas); // Retorna os materiais encontrados
    } catch (error) {
      console.error('Erro ao obter Máquinas:', error);
      res.status(500).json({ message: "Erro ao obter Máquinas" });
    }
  };


exports.deleteMaquina = async (req, res) => {
    try {
      const idMaquina = req.params.id;
  
      await Maquina.destroy({
        where: { id: idMaquina }
      });
  
      res.status(200).json({ message: "Máquina deletada com sucesso" });
    } catch (error) {
      console.error('Erro ao deletar Máquina:', error);
      res.status(500).json({ message: "Erro ao deletar Máquina" });
    }
  };
