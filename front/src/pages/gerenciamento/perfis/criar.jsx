import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import * as M from "@mui/material";
import * as MI from "@mui/icons-material";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function CriarPerfil() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCriar = async () => {
    if (email == "" || senha == "") {
      toast.warn("Preencha todos os campos!");
    } else {
      try {
        const response = await axios.post(
          "https://aware-clam-teddy.cyclic.app/cadastro-gestor",
          { email, nome, senha }
        );
        console.log(nome, email, senha);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao cadastrar. Tente novamente mais tarde.");
      }
    }
  };
  return (
    <div className="section-body">
      <ToastContainer position="bottom-left" />

      <HeaderSidebar />
      <div className="section-container">
        <div className="cadastrar-container">
          <h1 className="cadastrar-title">Cadastrar Novo Gestor</h1>
          <div className="maquina">
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Nome:</p>
                <M.TextField
                  fullWidth
                  onChange={(e) => setNome(e.target.value)}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">E-mail:</p>
                <M.TextField
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                ></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Senha:</p>
                <M.OutlinedInput
                  onChange={(e) => setSenha(e.target.value)}
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
