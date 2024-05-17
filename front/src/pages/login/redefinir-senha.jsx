import React, { useState, useEffect } from "react";
import "./login.css";
import HeaderLogin from "../../components/header-login/header-login";
import * as M from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const extrairTokenDaURL = () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const token = urlParams.get("token");
      if (token) {
        localStorage.setItem("token", token);
      }
    };

    extrairTokenDaURL();
  }, []);

  const handleConfirmar = async () => {
    try {
      if (novaSenha == "") {
        toast.warn("Por favor, preencha a nova senha.");
        console.error("Por favor, preencha a nova senha.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado.");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "https://techprint-1.onrender.com/redefinir-senha",
        { novaSenha },
        config
      );

      toast.success("Senha redefinida com sucesso!");
      setTimeout(() => {
        nav("/login");
      }, 3000);
      console.log("Resposta da API:", response.data);
      setNovaSenha("");
    } catch (error) {
      toast.error("Erro ao redefinir a senha. Tente novamente mais tarde.");
      console.error("Erro ao redefinir senha:", error);
      if (error.response) {
        console.error("Resposta do servidor:", error.response.data);
      }
    }
  };

  return (
    <div className="body redefinir">
      <ToastContainer position="bottom-right" />
      <HeaderLogin />
      <aside className="redefinir-sidebar">
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
          <button className="login-button" onClick={handleConfirmar}>
            Confirmar
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
    </div>
  );
}
