import "./agendamento.css";
import HeaderSidebar from "../../components/header-sidebar/header-sidebar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import * as I from "iconoir-react";
import * as M from "@mui/material";
import * as X from "@mui/x-date-pickers";
import { Upload } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Botao from "../../components/botao-login/botao-login";
import axios from "axios";

const { Dragger } = Upload;
export default function Agendamento() {
  const [formData, setFormData] = useState({
    nome_pedido: "",
    data: "",
    descri: "",
    tempo_impre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAgend = async () => {
    console.log("entrou no handleAgend", formData);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        "https://techprint-1.onrender.com/pedidos",
        formData,
        config
      );
      toast.success("Pedido feito com sucesso!");
      setFormData({
        nome_pedido: "",
        data: "",
        descri: "",
        tempo_impre: "",
      });
    } catch (error) {
      console.log(error);
      toast.warning("Erro ao fazer o pedido");
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

              <M.TextField
                variant="outlined"
                label="Nome do projeto"
                name="nome_pedido"
                value={formData.nome_pedido}
                onChange={handleChange}
              />
              <div className="datetime-container">
                <div className="datetime-sub-container">
                  <p className="label">Escolha a data: </p>
                  <M.TextField
                    className="timepicker"
                    placeholder="dd/mm/aaaa"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                  ></M.TextField>
                </div>
                <div className="datetime-sub-container">
                  <p className="label">Tempo estimado de impressão: </p>
                  <M.TextField
                    placeholder="hh:mm"
                    className="timepicker"
                    name="tempo_impre"
                    value={formData.tempo_impre}
                    onChange={handleChange}
                  ></M.TextField>
                </div>
              </div>
              <p className="label">Descrição do Projeto:</p>
              <M.TextField
                multiline
                minRows={2}
                maxRows={4}
                placeholder="Escreva uma breve descrição do projeto."
                label="Descrição"
                name="descri"
                value={formData.descri}
                onChange={handleChange}
              ></M.TextField>
              <p className="label">Escolha o arquivo:</p>
              <Dragger className="dragger-container" accept="image/*">
                <I.CloudUpload />
                <h2 className="dragger-text">Arraste e solte o arquivo.</h2>
                <p className="dragger-info">
                  Envie um arquivo que mostre claramente o que deseja imprimir,
                  em formato pdf ou imagem. <br />
                  (.pdf, .png, .jpeg, etc.)
                </p>
              </Dragger>
            </div>
            <button
              className="system-btn agendamento-btn"
              onClick={() => {
                handleAgend();
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
