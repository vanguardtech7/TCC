import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import * as M from "@mui/material";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function CriarMaquina() {
  // let [nome, setNome] = useState('')
  // let [capacidade, setCapacidade] = useState()
  // let [modelo, setModelo] = useState('')
  // let [num, setNum] = useState('')
  // let [especif, setEspecif] = useState('')
  // let [energia, setEnergia] = useState('')

  const [formData, setFormData] = useState({
    nome_maquina: "",
    capacidade: "",
    modelo: "",
    num: "",
    especi: "",
    energia: "",
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
          <h1 className="cadastrar-title">Cadastrar Nova Máquina</h1>
          <div className="maquina">
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Nome:</p>
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
                  name="num"
                  value={formData.num}
                  onChange={handleChange}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Entrada de Energia:</p>
                <M.TextField
                  fullWidth
                  name="energia"
                  value={formData.energia}
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
