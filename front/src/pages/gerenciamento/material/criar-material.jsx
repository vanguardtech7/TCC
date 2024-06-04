import { useState } from "react";
import axios from "axios"; // Importe o axios
import { ToastContainer, toast } from "react-toastify";
import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import BackButton from '../../../components/back-button/back-button'
import * as M from "@mui/material";

export default function CriarMaterial() {
  const [formData, setFormData] = useState({
    cor: "",
    quantidade: "",
    diametro: "1.75",
    material: "",
    peso: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Obter token do localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        "https://techprint-1.onrender.com/materiais",
        formData,
        config
      );
      toast.success("Material Cadastrado com Sucesso!");
      console.log("Material cadastrado com sucesso!");
      // Limpar os campos após o envio bem-sucedido
      setFormData({
        cor: "",
        quantidade: "",
        diametro: "1.75",
        material: "",
        peso: "",
      });
    } catch (error) {
      toast.warning("Erro ao cadastrar material!");
    }
  };

  return (
    <div className="section-body">
      <ToastContainer
        position="bottom-right"
      />
      <HeaderSidebar />
      <div className="section-container">
        <div className="cadastrar-container">
        <div className="back-container">
            <BackButton/>
            <h1 className="cadastrar-title">Cadastrar Novo Material</h1>
          </div>
          <div className="maquina">
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Cor:</p>
                <M.TextField
                  fullWidth
                  name="cor"
                  value={formData.cor}
                  onChange={handleChange}
                />
              </div>
              <div className="maquina-input select">
                <p className="cadastrar-label">Diâmetro:</p>
                <M.Select
                  fullWidth
                  name="diametro"
                  value={formData.diametro}
                  onChange={handleChange}
                >
                  <M.MenuItem value="1.75">1.75mm</M.MenuItem>
                  <M.MenuItem value="2.85">2.85mm</M.MenuItem>
                </M.Select>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Peso: (un.)</p>
                <M.TextField
                  fullWidth
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Quantidade:</p>
                <M.TextField
                  fullWidth
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                />
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Material:</p>
                <M.TextField
                  fullWidth
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button className="system-btn cadastrar-btn" onClick={handleSubmit}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
