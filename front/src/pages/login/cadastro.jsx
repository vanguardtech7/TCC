import React, { useState } from "react";
import "./login.css";
import "../../App.css";
import * as M from "@mui/material";
import * as MI from "@mui/icons-material";

import HeaderLogin from "../../components/header-login/header-login";
import Botao from "../../components/botao-login/botao-login";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const nav = useNavigate();
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");
  const [senha, setSenha] = useState("");

  const [showLoading, setShowLoading] = useState(false);

  const handleCadastro = async () => {
    console.log(`entrou na funcao`);
    setShowLoading(true);

    if (email == "" || senha == "") {
      console.log('entrou no if de validaçao')
      toast.warn("Preencha todos os campos!");
      setShowLoading(false);
    } else {
      try {
        const response = await axios.post(
          "https://aware-clam-teddy.cyclic.app/cadastro-user",
          { email, nome, senha, sala, cargo }
        );
        setTimeout(() => setShowLoading(false), 3000)
        console.log(nome, email, cargo, sala, senha);
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        toast.error("Erro ao cadastrar. Por favor, tente novamente.");
      }
    }
  };

  const setNull = () => {
    setCargo("");
    setNome("");
    setSala("");
    setSenha("");
    setEmail("");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <body className="body">
      <ToastContainer
        position="bottom-left"
      />
      <HeaderLogin />
      <aside className="login-sidebar">
        <h1 className="login-title">Cadastro</h1>
        <div className="cadastro-container">
          <div className="cadastro-form">
            <div className="login-input-container">
              <label>Nome: </label>
              <M.TextField
                className="cadastro-input"
                placeholder="Digite seu nome: "
                onChange={(e) => setNome(e.target.value)}
                sx={{ input: { color: "white" } }}
              />
            </div>
            <div className="login-input-container">
              <label>Email: </label>
              <M.TextField
                className="cadastro-input"
                placeholder="Digite seu email:"
                sx={{ input: { color: "white" } }}
                allowClear
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-input-container">
              <label>Cargo: </label>
              <M.Select
                placeholder="Selecione seu cargo:"
                className="cadastro-input"
                sx={{ color: "grey" }}
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              >
                <M.MenuItem value={0}>Selecione seu cargo:</M.MenuItem>
                <M.MenuItem value={1}>Aluno</M.MenuItem>
                <M.MenuItem value={2}>Professor</M.MenuItem>
                <M.MenuItem value={3}>Coordenador</M.MenuItem>
                <M.MenuItem value={4}>Funcionário</M.MenuItem>
              </M.Select>
            </div>
            <div className="login-input-container">
              <label>Sala: </label>
              <M.TextField
                sx={{ input: { color: "white" } }}
                className="cadastro-input"
                placeholder="Digite sua sala:"
                onChange={(e) => setSala(e.target.value)}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="senha">Senha: </label>
              <M.OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                onChange={(e) => setSenha(e.target.value)}
                sx={{ input: { color: "white" } }}
                endAdornment={
                  <M.InputAdornment position="end">
                    <M.IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <MI.VisibilityOff /> : <MI.Visibility />}
                    </M.IconButton>
                  </M.InputAdornment>
                }
                label="Password"
              />
            </div>
          </div>
        </div>
        <a
          className="button-container"
          style={{ textDecoration: "none" }}
          href="javascript:void(0)"
          onClick={() => {
            handleCadastro();
          }}
        >
          <Botao
            label="Cadastrar"
            disabled={showLoading}
            loading={showLoading}
          />
        </a>

        <div className="login-links-container">
          <p>
            Já tem conta? Retorne para o{" "}
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
