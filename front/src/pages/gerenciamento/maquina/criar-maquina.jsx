import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import BackButton from "../../../components/back-button/back-button";
import * as M from "@mui/material";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function CriarMaquina() {
  const [formData, setFormData] = useState({
    nome_maquina: "",
    capacidade: 0.0,
    modelo: "",
    num_serie: "",
    especi: "",
    entrada_ener: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCadastro = async () => {
    console.log(formData);
    console.log(localStorage);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        "https://techprint-1.onrender.com/maquinas",
        formData,
        config
      );
      toast.success("Cadastro realizado com sucesso!");

      setFormData({
        nome_maquina: "",
        capacidade: "",
        modelo: "",
        num: "",
        especi: "",
        energia: "",
      });
    } catch (error) {
      console.log("Erro", error);
      toast.warning("Erro ao cadastrar máquina!");
    }
  };

  return (
    <div className="section-body">
      <HeaderSidebar />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={1}
        closeOnClick
        draggable
        pauseOnHover={false}
        transition={Bounce}
      />
      <div className="section-container">
        <div className="cadastrar-container">
          <div className="back-container">
            <BackButton />
            <h1 className="cadastrar-title">Cadastrar Nova Máquina</h1>
          </div>
          <div className="maquina">
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Nome da Máquina:</p>
                <M.TextField
                  fullWidth
                  name="nome_maquina"
                  value={formData.nome_maquina}
                  onChange={handleChange}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Modelo:</p>
                <M.TextField
                  fullWidth
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Especificações:</p>
                <M.TextField
                  fullWidth
                  name="especi"
                  value={formData.especi}
                  onChange={handleChange}
                ></M.TextField>
              </div>
            </div>
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Capacidade:</p>
                <M.TextField
                  type="number"
                  fullWidth
                  name="capacidade"
                  value={formData.capacidade}
                  onChange={handleChange}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Número de série:</p>
                <M.TextField
                  fullWidth
                  type="number"
                  name="num_serie"
                  value={formData.num_serie}
                  onChange={handleChange}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Entrada de Energia:</p>
                <M.TextField
                  fullWidth
                  name="entrada_ener"
                  value={formData.entrada_ener}
                  onChange={handleChange}
                ></M.TextField>
              </div>
            </div>
          </div>
          <button
            className="system-btn cadastrar-btn"
            onClick={() => {
              handleCadastro();
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
