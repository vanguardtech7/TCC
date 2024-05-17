import React, { useState } from "react";
import "./login.css";
import HeaderLogin from "../../components/header-login/header-login";
import * as M from "@mui/material";
import axios from "axios";

export default function EsqueciSenha() {
  const [email, setEmail] = useState(""); // Estado para armazenar o email digitado

  const handleEnviarEmail = async () => {
    try {
      // Verificando se o email foi preenchido
      if (!email) {
        console.error("Por favor, preencha o email.");
        return;
      }

      // Fazendo a solicitação POST à API com os dados do email
      const response = await axios.post(
        "https://techprint-1.onrender.com/reset-password",
        { email }
      );

      // Verificando a resposta da API
      console.log("Resposta da API:", response.data);

      // Limpando o campo de email após o envio bem-sucedido
      setEmail("");
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  };

  return (
    <body className="body">
      <HeaderLogin />
      <aside className="login-sidebar">
        <div className="aside-sub-container">
          <h1 className="login-title">
            Esqueceu a <br /> sua senha?
          </h1>
          <div className="esqueci-container">
            <div className="esqueci-form">
              <label htmlFor="email">Email: </label>
              <div className="form-label">
                <M.TextField
                  className="login-input"
                  placeholder="Digite seu email de recuperação:"
                  sx={{ input: { color: "white" } }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className="login-link login-text">
                Um Email será enviado para que consiga redefinir a sua senha.
              </p>
            </div>
          </div>
          <button className="login-button" onClick={handleEnviarEmail}>
            Enviar Email
          </button>
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
  );
}
