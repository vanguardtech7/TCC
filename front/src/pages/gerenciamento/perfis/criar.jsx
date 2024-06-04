import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import BackButton from "../../../components/back-button/back-button";
import * as M from "@mui/material";
import * as MI from "@mui/icons-material";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function CriarPerfil() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCriar = async () => {
    if (formData.nome == "") {
      toast.warn("Preencha todos os campos");
    } else {
      try {
        const token = localStorage.getItem("token"); // Obter token do localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(
          "https://techprint-1.onrender.com/cadastro-gestor",
          formData,
          config
        );
        toast.success("Perfil Cadastrado com Sucesso");

        setFormData({
          nome: "",
          email: "",
          senha: "",
        });
      } catch (error) {
        toast.warning("erro")
        console.log(error);
        console.log("Erro!", formData);
      }
    }
  };
  return (
    <div className="section-body">
      <ToastContainer position="bottom-right" />

      <HeaderSidebar />
      <div className="section-container">
        <div className="cadastrar-container">
          <div className="back-container">
            <BackButton />
            <h1 className="cadastrar-title">Cadastrar Novo Gestor</h1>
          </div>
          <div className="maquina">
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Nome:</p>
                <M.TextField
                  fullWidth
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">E-mail:</p>
                <M.TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Senha:</p>
                <M.OutlinedInput
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  fullWidth
                  endAdornment={
                    <M.InputAdornment position="end">
                      <M.IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <MI.VisibilityOff />
                        ) : (
                          <MI.Visibility />
                        )}
                      </M.IconButton>
                    </M.InputAdornment>
                  }
                ></M.OutlinedInput>
              </div>
            </div>
          </div>
          <button className="system-btn cadastrar-btn" onClick={handleCriar}>
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
