import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as M from "@mui/material";
import * as I from "iconoir-react";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";

export default function Perfis() {
  const location = useLocation("");
  const pathname = location.pathname.replace("%20", " ").replace("/", "");

  const [perfis, setPerfis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [perfilToDelete, setPerfilToDelete] = useState(""); // Estado para armazenar o email do perfil a ser excluído
  const nav = useNavigate();

  useEffect(() => {
    async function fetchPerfis() {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Obter token do localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          "https://techprint-1.onrender.com/usuarios",
          config
        );
        if (!response.ok) {
          throw new Error("Falha ao carregar os perfis");
        }
        const data = await response.json();
        setIsLoading(false);
        setPerfis(data);
      } catch (error) {
        setIsLoading(false);
        console.error("Erro ao buscar os perfis:", error);
      }
    }

    fetchPerfis();
  }, []);

  // Função para excluir um perfil
  const deletePerfil = async (email) => {
    try {
      const token = localStorage.getItem("token"); // Obter token do localStorage
      const response = await fetch(
        `https://techprint-1.onrender.com/usuarios/${email}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Falha ao excluir o perfil");
      }
      toast.success("Perfil excluído com sucesso!");
      setPerfis(perfis.filter((perfil) => perfil.email !== email));
      setModalOpen(false); // Fechar o modal de confirmação
    } catch (error) {
      toast.error("Erro ao excluir o perfil.");
      console.error("Erro ao excluir o perfil:", error);
    }
  };

  return (
    <div className="section-body">
      <ToastContainer position="bottom-right" />
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">
          <h1 className="pedidos-title">{pathname}</h1>
          <button className="system-btn" onClick={() => nav("/criar perfil")}>
            Cadastrar Novo Gestor
          </button>
        </div>

        <M.TableContainer
          component={Paper}
          className="table-container"
          sx={{ maxHeight: 640 }}
        >
          <M.Table aria-label="simple table" stickyHeader>
            <M.TableHead>
              <M.TableRow>
                <M.TableCell>ID</M.TableCell>
                <M.TableCell>Nome</M.TableCell>
                <M.TableCell align="left">Email</M.TableCell>
                <M.TableCell align="left">Cargo</M.TableCell>
                <M.TableCell align="center">#</M.TableCell>
              </M.TableRow>
            </M.TableHead>
            <M.TableBody>
              {isLoading ? (
                <p className="table-message">Carregando...</p>
              ) : (
                <>
                  {perfis.length > 0 ? (
                    perfis.map((perfil) => (
                      <M.TableRow key={perfil.id}>
                        <M.TableCell>{perfil.id}</M.TableCell>
                        <M.TableCell component="th" scope="row">
                          {perfil.nome}
                        </M.TableCell>
                        <M.TableCell align="left">{perfil.email}</M.TableCell>
                        <M.TableCell align="left">
                          {perfil.cargo || "Gestor"}
                        </M.TableCell>

                        <M.TableCell
                          align="center"
                          style={{ cursor: "pointer" }}
                        >
                          <I.Trash
                            onClick={() => {
                              setPerfilToDelete(perfil.email);
                              setModalOpen(true);
                            }}
                          />
                        </M.TableCell>
                      </M.TableRow>
                    ))
                  ) : (
                    <p className="table-message">
                      Parece que ainda não há nenhum dado...
                    </p>
                  )}
                </>
              )}
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
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="modal-btn btn-confirmar"
                onClick={() => deletePerfil(perfilToDelete)}
              >
                Confirmar
              </button>
            </div>
          </div>
          <div className="hs-overlay" onClick={() => setModalOpen(false)}></div>
        </>
      )}
    </div>
  );
}
