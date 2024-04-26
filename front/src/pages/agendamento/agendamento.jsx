import "./agendamento.css";
import HeaderSidebar from "../../components/header-sidebar/header-sidebar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import * as I from 'iconoir-react'
import * as M from "@mui/material"
import * as X from "@mui/x-date-pickers"
import { Upload } from 'antd'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Botao from "../../components/botao-login/botao-login";

const { Dragger } = Upload
export default function Agendamento() {
  const [pNome, setPNome] = useState("");
  const [pData, setPData] = useState("");
  const [pTempo, setPTempo] = useState("");
  const [pDescricao, setPDescricao] = useState("");

  const setNull = () => {
    setPNome("");
    setPData("");
    setPTempo("");
    setPDescricao("");
  };

  const handleEnviar = async () => {
    if (pNome === "" || pTempo === "" || pDescricao === "") {
      console.log(pNome, pData, pTempo, pDescricao);
      toast.warn("Preencha todos os campos");
    } else {
      toast.success("Enviado com sucesso!")
      setNull()
    }
  };

  return (
    <X.LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="section-body">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          limit={1}
          closeOnClick
          draggable
          pauseOnHover={false}
          transition={Bounce}
        />

        <HeaderSidebar />
        <div className="section-container">
          <div className="agendamento-form-container">
            <h1 className="section-title">Agende a Impressão</h1>
            <div className="input-container">
              <p className="label">Nome do Projeto: </p>

              <M.TextField variant="outlined" label="Nome do projeto" />
              <div className="datetime-container">
                <div className="datetime-sub-container">
                  <p className="label">Escolha a data: </p>
                  <X.DatePicker className="timepicker"></X.DatePicker>
                </div>
                <div className="datetime-sub-container">
                  <p className="label">Tempo estimado de impressão: </p>
                  <X.TimePicker views={['hours', 'minutes']} format="hh:mm" className="timepicker"></X.TimePicker>
                </div>
              </div>
              <p className="label">Descrição do Projeto:</p>
              <M.TextField multiline minRows={2} maxRows={4} placeholder="Escreva uma breve descrição do projeto." label="Descrição"></M.TextField>
              <p className="label">Escolha o arquivo:</p>
              <Dragger className="dragger-container" accept="image/*">
                <I.CloudUpload />
                <h2 className="dragger-text">Arraste e solte o arquivo.</h2>
                <p className="dragger-info">
                  Envie um arquivo que mostre claramente o que deseja imprimir, em
                  formato pdf ou imagem. <br />
                  (.pdf, .png, .jpeg, etc.)
                </p>
              </Dragger>
            </div>
            <button
              className="system-btn agendamento-btn"
              onClick={() => {
                handleEnviar();
              }}
            >
              Enviar Projeto
            </button>
          </div>
        </div>
        {/* <img src={asideImage} alt="" className="aside-image" /> */}
      </div>
    </X.LocalizationProvider>
  );
}
