import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as M from "@mui/material";
import * as I from "iconoir-react";
import Paper from "@mui/material/Paper";
import axios from "axios"; 

export default function Maquina() {
  const location = useLocation("");
  var pathname = location.pathname.split("/");
  var pathname = location.pathname.replace("%20", " ").replace("/", "");

  const [maquinas, setMaquinas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = () => {
    axios
      .get("https://techprint-1.onrender.com/maquinas")
      .then((response) => {
        setMaquinas(response.data);
      })
      .catch((error) => {
        console.error("erro ao buscar maquinas", error);
      });
  };

  const nav = useNavigate();

  const handleDelete = () => {
    if (!maquinaSelecionada) return;

    axios
      .delete(
        `https://techprint-1.onrender.com/maquinas/${maquinaSelecionada.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adicione o token ao cabeçalho Authorization
          },
        }
      )
      .then(() => {
        setMaquinas(
          maquinas.filter((maquina) => maquina.id !== maquinaSelecionada.id)
        );
        setModalOpen(false);
        setMaquinaSelecionada(null);
      })
      .catch((error) => {
        console.error("erro ao excluir maquina", error);
      });
  };

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">

          <h1 className="pedidos-title">{pathname}</h1>
          <button
            className="system-btn"
            onClick={() => nav("/cadastrar maquina")}
          >
            Cadastrar Maquina
          </button>
        </div>

        <M.TableContainer component={Paper} className="table-container">
          <M.Table aria-label="simple table">
            <M.TableHead>
              <M.TableRow>
                {/* <M.TableCell>ID</M.TableCell> */}
                <M.TableCell align="left">Nome</M.TableCell>
                <M.TableCell align="left">Modelo</M.TableCell>
                <M.TableCell align="left">Capacidade</M.TableCell>
                <M.TableCell align="left">Numero de Série</M.TableCell>
                <M.TableCell align="left">Entrada de Energia</M.TableCell>
                <M.TableCell align="left">Especificações</M.TableCell>
                <M.TableCell align="center">#</M.TableCell>
              </M.TableRow>
            </M.TableHead>
            <M.TableBody>
              {maquinas.map((maquina) => (
                <M.TableRow key={maquina.id}>
                  {/* <M.TableCell component="th" scope="row">
                    {maquina.id}
                  </M.TableCell> */}
                  <M.TableCell align="left">{maquina.nome_maquina}</M.TableCell>
                  <M.TableCell align="left">{maquina.modelo}</M.TableCell>
                  <M.TableCell align="left">{maquina.capacidade}</M.TableCell>
                  <M.TableCell align="left">{maquina.num_serie}</M.TableCell>
                  <M.TableCell align="left">{maquina.entrada_ener}</M.TableCell>
                  <M.TableCell align="left">{maquina.especi}</M.TableCell>
                  <M.TableCell
                    align="center"
                    onClick={() => {
                      setMaquinaSelecionada(maquina);
                      setModalOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <I.Trash />
                  </M.TableCell>
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
                onClick={handleDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
          <div
            className="hs-overlay"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          ></div>
        </>
      )}
    </div>
  );
}
