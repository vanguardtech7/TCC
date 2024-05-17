import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import * as M from "@mui/material";
import Paper from "@mui/material/Paper";
import '../gerenciamento.css';

export default function Pedidos() {
  const location = useLocation();
  var pathname = location.pathname.split("/");
  pathname = location.pathname.replace("%20", " ").replace("/", "");

  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    axios.get('https://techprint-1.onrender.com/pedidos')
      .then(response => {
        const data = response.data;
        const formattedData = data.map(item => createData(item.id, item.nome_pedido, item.data, item.descri, item.tempo_impre));
        setRows(formattedData);
      })
      .catch(error => {
        console.error("There was an error fetching the pedidos!", error);
      });
  }, []);

  function createData(id, nome_pedido, data, descri, tempo_impre) {
    return { id, nome_pedido, data, descri, tempo_impre };
  }

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">
          <h1 className="pedidos-title">{pathname}</h1>
        </div>

        <M.TableContainer component={Paper} className="table-container" sx={{ maxHeight: 640 }}>
          <M.Table aria-label="simple table" stickyHeader>
            <M.TableHead>
              <M.TableRow>
                <M.TableCell><b>Id</b></M.TableCell>
                <M.TableCell><b>Nome do Pedido</b></M.TableCell>
                <M.TableCell><b>Data</b></M.TableCell>
                <M.TableCell><b>Descrição</b></M.TableCell>
                <M.TableCell><b>Tempo de Impressão</b></M.TableCell>
              </M.TableRow>
            </M.TableHead>
            <M.TableBody>
              {rows.map((row) => (
                <M.TableRow key={row.id}>
                  <M.TableCell>{row.id}</M.TableCell>
                  <M.TableCell>{row.nome_pedido}</M.TableCell>
                  <M.TableCell>{row.data}</M.TableCell>
                  <M.TableCell>{row.descri}</M.TableCell>
                  <M.TableCell>{row.tempo_impre}</M.TableCell>
                </M.TableRow>
              ))}
            </M.TableBody>
          </M.Table>
        </M.TableContainer>
      </div>
      {modalOpen && (
        <>
          <div className="modal-excluir-container">
            <h1 className="modal-title">Tem certeza?</h1>
            <div className="modal-divider"></div>
            <h3 className="modal-excluir-text">
              Essa ação não poderá ser revertida!
            </h3>
            <div className="modal-btn-container">
              <button
                className="modal-btn btn-cancelar"
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                Cancelar
              </button>
              <button
                className="modal-btn btn-confirmar"
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
          <div className="hs-overlay" onClick={() => { setModalOpen(!modalOpen) }}></div>
        </>
      )}
    </div>
  );
}
