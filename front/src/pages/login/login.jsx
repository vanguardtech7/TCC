import React, { useState } from "react";
import "./login.css";
import "../../App.css";
import * as M from "@mui/material";
import * as MI from "@mui/icons-material";
import HeaderLogin from "../../components/header-login/header-login";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Botao from "../../components/botao-login/botao-login";

export default function Login(props) {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [showLoading, setShowLoading] = useState(false)

  const handleLogin = async () => {
    console.log("entrou no handle login");
    setShowLoading(true)
    if (email === "" || senha === "") {
      toast.warning("Email ou Senha não preenchidos!", { icon: "⚠" });
      setTimeout(() => setShowLoading(false), 3000)
      setNull();
    } else {
      try {
        const response = await axios.post(
          "https://aware-clam-teddy.cyclic.app/login",
          {
            email,
            senha,
          }
        );
        setTimeout(() => setShowLoading(false), 3000)
        nav("/agendamento");
      } catch (error) {
        console.error("Erro ao logar:", error);
      }
      toast.error("Usuário ou senha incorretos. Por favor, tente novamente.");
      setShowLoading(false);
    }
    // login mocado:
    // "email": "douglinhas@gmail.com",
    // "senha": "douglas",
  };

  const setNull = () => {
    setEmail("");
    setSenha("");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <body className="body">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={1}
        closeOnClick
        draggable
        pauseOnHover={false}
        transition={Bounce}
      />

      <HeaderLogin />
      <aside className="login-sidebar">
        <div className="form-container">
          <h1 className="login-title">Login</h1>
          <div className="form">
            <div className="login-input-container">
              <label htmlFor="email">Email: </label>

              <M.TextField
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="login-input"
                placeholder="Digite seu email:"
                allowClear
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ input: { color: "white" } }}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="senha">Senha: </label>
              <M.OutlinedInput
                type={showPassword ? "text" : "password"}
                sx={{ input: { color: "white" } }}
                placeholder="••••••••••"
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
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
              <div className="form-label">
                <a
                  href="javascript:void(0)"
                  className="esqueci-senha"
                  onClick={() => {
                    nav("/esqueciSenha");
                  }}
                >
                  Esqueci a senha
                </a>
              </div>
            </div>
          </div>
          <a
            className="button-container"
            style={{ textDecoration: "none" }}
            href="javascript:void(0)"
            onClick={() => {
              handleLogin();
            }}
          >
            <Botao label="Entrar" disabled={showLoading} loading={showLoading}/>
          </a>
        </div>
        <div className="login-links-container">
          <p>
            Ainda não tem conta? Faça seu{" "}
            <a href="/cadastro" className="login-link">
              Cadastro
            </a>
            .
          </p>
        </div>
      </aside>
    </body>
  );
}
