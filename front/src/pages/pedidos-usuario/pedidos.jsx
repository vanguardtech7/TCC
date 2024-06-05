import "./pedidos.css";
import HeaderSidebar from "../../components/header-sidebar/header-sidebar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "@mui/material";
import * as I from "iconoir-react";
import Paper from "@mui/material/Paper";
import { BackAgendamento } from "../../components/back-button/back-button";
import { ToastContainer, toast } from "react-toastify";

export default function MeusPedidos() {
  const location = useLocation();
  var pathname = location.pathname.split("/");
  pathname = location.pathname.replace("%20", " ").replace("/", "");

  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoToDelete, setPedidoToDelete] = useState(null); // Estado para armazenar o ID do pedido a ser excluído

  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtenha o token do local storage

    axios
      .get("https://techprint-1.onrender.com/meus-pedidos", {
        headers: {
          Authorization: `Bearer ${token}`, // Envie o token no cabeçalho da requisição
        },
      })
      .then((response) => {
        const data = response.data;
        const formattedData = data.map((item) =>
          createData(
            item.id,
            item.nome_pedido,
            item.data,
            item.descri,
            item.tempo_impre
          )
        );
        setRows(formattedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the meus-pedidos!", error);
      });
  }, []);

  function createData(id, nome_pedido, data, descri, tempo_impre) {
    return { id, nome_pedido, data, descri, tempo_impre };
  }

  const deletePedido = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Obtenha o token do local storage
      const response = await fetch(
        `https://techprint-1.onrender.com/meus-pedidos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Adicione o token no cabeçalho da requisição
          },
        }
      );
      if (!response.ok) {
        throw new Error("Falha ao excluir o pedido");
      }
      toast.success("Seu pedido foi excluído com sucesso!");
      setRows(rows.filter((row) => row.id !== id)); // Atualize a lista de pedidos
      setModalOpen(false); // Fechar o modal de confirmação
    } catch (error) {
      toast.error("Não foi possível excluir o seu pedido.");
      console.error("Erro ao excluir o pedido:", error);
    }
  };

  return (
    <div className="section-body">
      <HeaderSidebar />
      <ToastContainer position="bottom-right" />
      <div className="section-container">
        <div className="pedidos-container">
          <BackAgendamento />
          <h1 className="pedidos-title">{pathname}</h1>
        </div>

        <M.TableContainer
          component={Paper}
          className="table-container"
          sx={{ maxHeight: 640 }}
        >
          <M.Table aria-label="simple table" stickyHeader>
            <M.TableHead>
              <M.TableRow>
                <M.TableCell>Id</M.TableCell>
                <M.TableCell>Nome do Pedido</M.TableCell>
                <M.TableCell>Data</M.TableCell>
                <M.TableCell>Descrição</M.TableCell>
                <M.TableCell>Tempo de Impressão</M.TableCell>
                <M.TableCell align="center">Ações</M.TableCell>
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
                  <M.TableCell align="center" style={{ cursor: "pointer" }}>
                    <I.Trash
                      onClick={() => {
                        setPedidoToDelete(row.id); // Defina o pedido a ser excluído
                        setModalOpen(true); // Abra o modal de confirmação
                      }}
                    />
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
                  setModalOpen(false); // Feche o modal
                }}
              >
                Cancelar
              </button>
              <button
                className="modal-btn btn-confirmar"
                onClick={() => {
                  deletePedido(pedidoToDelete); // Exclua o pedido
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
          <div
            className="hs-overlay"
            onClick={() => {
              setModalOpen(false);
            }}
          ></div>
        </>
      )}
    </div>
  );
}
