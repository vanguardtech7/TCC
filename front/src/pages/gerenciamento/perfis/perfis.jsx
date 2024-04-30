import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as M from "@mui/material";
import * as I from "iconoir-react";
import Paper from "@mui/material/Paper";

export default function Perfis() {
  const location = useLocation("");
  const pathname = location.pathname.replace("%20", " ").replace("/", "");

  const [perfis, setPerfis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [perfilToDelete, setPerfilToDelete] = useState(null); // Estado para armazenar o email do perfil a ser excluído
  const nav = useNavigate();

  useEffect(() => {
    async function fetchPerfis() {
      try {
        const response = await fetch("https://aware-clam-teddy.cyclic.app/usuarios");
        if (!response.ok) {
          throw new Error("Falha ao carregar os perfis");
        }
        const data = await response.json();
        setPerfis(data);
      } catch (error) {
        console.error("Erro ao buscar os perfis:", error);
      }
    }

    fetchPerfis();
  }, []);

  // Função para excluir um perfil
  const deletePerfil = async (email) => {
    try {
      const response = await fetch(`https://aware-clam-teddy.cyclic.app/usuarios/${email}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao excluir o perfil");
      }
      setPerfis(perfis.filter((perfil) => perfil.email !== email));
      setModalOpen(false); // Fechar o modal de confirmação
    } catch (error) {
      console.error("Erro ao excluir o perfil:", error);
    }
  };

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">
          <h1 className="pedidos-title">{pathname}</h1>
          <button className="system-btn" onClick={() => nav("/criar perfil")}>
            Cadastrar Perfil
          </button>
        </div>

        <M.TableContainer component={Paper} className="table-container" sx={{ maxHeight: 640 }}>
          <M.Table aria-label="simple table" stickyHeader>
            <M.TableHead >
              <M.TableRow>
                <M.TableCell><b>Id</b></M.TableCell>
                <M.TableCell><b>Nome</b></M.TableCell>
                <M.TableCell align="left"><b>Email</b></M.TableCell>
                <M.TableCell align="left"><b>Cargo</b></M.TableCell>
                <M.TableCell align="center">
                  <b></b>
                </M.TableCell>
                <M.TableCell align="center">
                  <b></b>
                </M.TableCell>
              </M.TableRow>
            </M.TableHead>
            <M.TableBody>
              {perfis.map((perfil) => (
                <M.TableRow key={perfil.id}>
                  <M.TableCell>{perfil.id}</M.TableCell>
                  <M.TableCell component="th" scope="row">
                    {perfil.nome}
                  </M.TableCell>
                  <M.TableCell align="left">{perfil.email}</M.TableCell>
                  <M.TableCell align="left">{perfil.cargo || "Gestor"}</M.TableCell>
                  <M.TableCell align="center" style={{ cursor: "pointer" }}>
                    <I.EditPencil onClick={() => nav("/editar perfil")} />
                  </M.TableCell>
                  <M.TableCell align="center" style={{ cursor: "pointer" }}>
                    <I.Trash onClick={() => { setPerfilToDelete(perfil.email); setModalOpen(true); }} />
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
