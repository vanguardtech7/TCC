import "./header-sidebar.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as I from 'iconoir-react'
import { Avatar } from "@mui/material";

export default function HeaderSidebar() {
  const location = useLocation("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setsubMenuOpen] = useState(false);

  const nav = useNavigate();

  // tirando caracteres especiais do pathname da pagina
  var pathname = location.pathname.split("/");
  var pathname = location.pathname.replace("%20", " ").replace("/", "");
  

  return (
    <div className="hs-container">
      <I.IconoirProvider
        iconProps={{
          color: "#fff",
          strokeWidth: 1.5,
          width: "24px",
          height: "24px",
        }}
      >
        <div className="hs-sidebar-container">
          <div className="hs-logo-container">
            <h1
              className="hs-logo"
              onClick={() => {
                nav("/");
              }}
            >
              EM <span className="hs-logo-highlight">3D</span>
            </h1>
            <div className="vertical-divider"></div>
          </div>
          <div className="horizontal-divider"></div>
          <div className="hs-sidebar-menu-container">
            <h1
              className="hs-menu-item"
              id="agendamento"
              onClick={() => {
                nav("/agendamento");
              }}
            >
              <I.Calendar />
              Agendamento
            </h1>
            <h1
              className="hs-menu-item"
              id="dashboard"
              onClick={() => {
                nav("/dashboard");
              }}
            >
              <I.GraphUp />
              Dashboard
            </h1>
            <h1
              className="hs-menu-item"
              id="gerenciamento"
              onClick={() => {
                setsubMenuOpen(!subMenuOpen);
              }}
            >
              <I.Settings />
              Gerenciamento
            </h1>
            {subMenuOpen && (
              <>
                <div className="sub-container">
                  <h1
                    className="sub-text"
                    onClick={() => {
                      nav("/maquinas");
                    }}
                  >
                    <I.Printer />
                    Máquinas
                  </h1>
                  <h1
                    className="sub-text"
                    onClick={() => {
                      nav("/materiais");
                    }}
                  >
                    <I.BoxIso />
                    Materiais
                  </h1>
                  <h1
                    className="sub-text"
                    onClick={() => {
                      nav("/pedidos");
                    }}
                  >
                    <I.TaskList />
                    Pedidos
                  </h1>
                  <h1
                    className="sub-text"
                    onClick={() => {
                      nav("/perfis");
                    }}
                  >
                    <I.Community />
                    Perfis
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="hs-header">
          <div className="hs-header-container">
            <h1 className="hs-title">
              {pathname}
              <span className="hs-subtitle">
                {location.pathname.split("/")[2]}
              </span>
            </h1>
            <p
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              className="hs-active"
            >
              <Avatar>A</Avatar>
            </p>
          </div>
        </div>
        {menuOpen && (
          <>
            <div className="hs-modal-container">
              <h1 className="modal-name">Nome Sobrenome</h1>
              <h3 className="modal-cargo">Cargo</h3>
              <div className="modal-divider"></div>
              <div className="modal-sair-container">
                <div
                  className="hs-sub-container"
                  onClick={() => {
                    nav("/meus pedidos");
                  }}
                >
                  <I.Page />
                  <h1 className="modal-text">Meus Pedidos</h1>
                </div>
                <div className="sub-divider"></div>
                <div
                  className="hs-sub-container"
                  onClick={() => {
                    nav("/");
                  }}
                >
                  <I.Home />
                  <h1 className="modal-text" >Sair</h1>
                </div>
              </div>
            </div>
           
          </>
        )}
      </I.IconoirProvider>
    </div>
  );
}