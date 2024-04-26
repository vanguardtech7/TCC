import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import * as M from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";


export default function CriarMaterial() {
  let [cor, setCor] = useState('')
  let [quant, setQuant] = useState('')
  let [diametro, setDiametro] = useState('')
  let [material, setMaterial] = useState('')
  let [peso, setPeso] = useState('')

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="cadastrar-container">
          <h1 className="cadastrar-title">Cadastrar Novo Material</h1>
          <div className="maquina">
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Cor:</p>
                <M.TextField fullWidth></M.TextField>
              </div>
              <div className="maquina-input select">
                <p className="cadastrar-label">Diâmetro:</p>
                <M.Select fullWidth>
                  <M.MenuItem>1.75mm</M.MenuItem>
                  <M.MenuItem>2.85mm</M.MenuItem>
                </M.Select>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Peso: (un.)</p>
                <M.TextField  fullWidth></M.TextField>
              </div>
            </div>
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Quantidade:</p>
                <M.TextField fullWidth></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Material:</p>
                <M.TextField fullWidth></M.TextField>
              </div>
            </div>
          </div>
          <button className="system-btn cadastrar-btn">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}
