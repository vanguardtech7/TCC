import "./agendamento.css";
import HeaderSidebar from "../../components/header-sidebar/header-sidebar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import * as I from "iconoir-react";
import * as M from "@mui/material";
import * as X from "@mui/x-date-pickers";
import { Upload } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BotaoAgendamento } from "../../components/botao-login/botao-login";
import axios from "axios";
import dayjs from "dayjs";

const { Dragger } = Upload;

export default function Agendamento() {
  const [showLoading, setShowLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome_pedido: "",
    data: "",
    descri: "",
    tempo_impre: "",
    arquivo: null, // Estado para armazenar o arquivo selecionado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setFormData((prevData) => ({
      ...prevData,
      data: formattedDate,
    }));
  };

  // Função para lidar com a seleção de arquivo
  const handleFileChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      arquivo: file, // Armazena o arquivo selecionado no estado
    }));
  };

  const handleTimeChange = (time) => {
    const formattedTime = dayjs(time).format("HH:mm"); // Formato de hora: hora:minuto
    setFormData((prevData) => ({
      ...prevData,
      tempo_impre: formattedTime,
    }));
  };

  const handleAgend = async () => {
    console.log("entrou no handleAgend", formData);
    setShowLoading(true);
    // Verificação se algum campo está vazio
    if (
      !formData.nome_pedido ||
      !formData.data ||
      !formData.descri ||
      !formData.tempo_impre
    ) {
      toast.error("Por favor, preencha todos os campos antes de enviar.");
      setShowLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Dados enviados:", formData);

      // Transformando o formData para adequá-lo à estrutura esperada pela API
      const formDataToSend = new FormData();
      formDataToSend.append("nome_pedido", formData.nome_pedido);
      formDataToSend.append("data", formData.data);
      formDataToSend.append("descri", formData.descri);
      formDataToSend.append("tempo_impre", formData.tempo_impre);

      // Enviando o arquivo, mas não salvando no banco de dados
      if (formData.arquivo) {
        formDataToSend.append("arquivo", formData.arquivo);
      }

      await axios.post(
        "https://techprint-1.onrender.com/pedidos",
        formDataToSend,
        config
      );
      toast.success("Pedido realizado com sucesso!");
      setShowLoading(false);
      setFormData({
        nome_pedido: "",
        data: "",
        descri: "",
        tempo_impre: "",
        arquivo: null,
      });
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao fazer o pedido");
      setShowLoading(false);
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
                  <X.DatePicker
                    format="DD-MM-YYYY"
                    className="timepicker"
                    placeholder="dd/mm/aaaa"
                    name="data"
                    value={dayjs(formData.data)}
                    onChange={(date) => handleDateChange(date)}
                  ></X.DatePicker>
                </div>
                <div className="datetime-sub-container">
                  <p className="label">Tempo estimado de impressão: </p>
                  <X.TimePicker
                    className="timepicker"
                    placeholder="hh:mm"
                    ampm={false}
                    name="tempo_impre"
                    value={dayjs(formData.tempo_impre, "HH:mm")}
                    onChange={(time) => handleTimeChange(time)}
                  />
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
              <Dragger
                className="dragger-container"
                accept="image/*"
                onChange={(info) => {
                  const file = info.file.originFileObj;
                  handleFileChange(file);
                }}
              >
                <I.CloudUpload />
                <h2 className="dragger-text">Arraste e solte o arquivo.</h2>
                <p className="dragger-info">
                  Envie um arquivo que mostre claramente o que deseja imprimir,
                  em formato pdf ou imagem. <br />
                  (.pdf, .png, .jpeg, etc.)
                </p>
              </Dragger>
            </div>

            <a
              className="button-container"
              onClick={() => {
                handleAgend();
              }}
            >
              <BotaoAgendamento
                label="Agendar"
                disabled={showLoading}
                loading={showLoading}
              />
            </a>
          </div>
        </div>
      </div>
    </X.LocalizationProvider>
  );
}
