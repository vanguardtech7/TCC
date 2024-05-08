import React, { useState } from "react";
import "./login.css";
import HeaderLogin from "../../components/header-login/header-login";
import * as M from "@mui/material";
import axios from "axios";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState(""); // Estado para armazenar a nova senha

  const handleConfirmar = async () => {
    try {
      // Verificando se a nova senha foi preenchida
      if (!novaSenha) {
        console.error("Por favor, preencha a nova senha.");
        return;
      }

      // Fazendo a solicitação POST à API com os dados da nova senha
      const response = await axios.post("https://techprint-1.onrender.com/redefinir-senha", { novaSenha });

      // Verificando a resposta da API
      console.log("Resposta da API:", response.data);
   
      // Limpando o campo da nova senha após a confirmação bem-sucedida
      setNovaSenha("");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
   
    }
  };

  return (
    <>
      <body className="body">
        <HeaderLogin />
        <aside className="login-sidebar">
          <div className="aside-sub-container">
            <h1 className="login-title">
              Escolha sua <br /> nova senha
            </h1>
            <div className="esqueci-container">
              <div className="esqueci-form">
                <label htmlFor="novaSenha">Nova Senha: </label>
                <div className="form-label">
                  <M.TextField
                    className="login-input"
                    placeholder="Digite sua nova senha:"
                    type="password"
                    sx={{ input: { color: "white" } }}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button className="login-button" onClick={handleConfirmar}>Confirmar</button>
          </div>
          <div className="login-links-container">
            <p>
              Voltar para o{" "}
              <a href="/login" className="login-link">
                Login
              </a>
              .
            </p>
          </div>
        </aside>
      </body>
    </>
  );
}
