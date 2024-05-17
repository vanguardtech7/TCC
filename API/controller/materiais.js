const Material = require("../models/materiais");


exports.criarMaterial = async (req, res) => {
  try {
    const { cor, quantidade, diametro, material, peso } = req.body;

    // Verificar se algum dos campos está vazio
    if (!cor || !quantidade || !diametro || !material || !peso) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const novoMaterial = await Material.create({ cor, quantidade, diametro, material, peso });

    res.status(201).json({ newMaterial: novoMaterial.id, message: "Material cadastrado com sucesso" });
  } catch (error) {
    console.error('Erro no bloco try-catch:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Erro ao cadastrar Material" });
    }
  }
};

exports.getAllMaterials = async (req, res) => {
    try {
      const materials = await Material.findAll(); // Obtém todos os materiais do banco de dados
  
      res.status(200).json(materials); // Retorna os materiais encontrados
    } catch (error) {
      console.error('Erro ao obter materiais:', error);
      res.status(500).json({ message: "Erro ao obter materiais" });
    }
  };

exports.deleteMaterial = async (req, res) => {
    try {
      const idMaterial = req.params.id;
  
      await Material.destroy({
        where: { id: idMaterial }
      });
  
      res.status(200).json({ message: "Material deletado com sucesso" });
    } catch (error) {
      console.error('Erro ao deletar material:', error);
      res.status(500).json({ message: "Erro ao deletar material" });
    }
  };


