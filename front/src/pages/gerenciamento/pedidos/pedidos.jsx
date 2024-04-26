
import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as M from "@mui/material";
import * as I from "iconoir-react";
import Paper from "@mui/material/Paper";
import '../gerenciamento.css'

export default function Pedidos() {
  const location = useLocation("");
  var pathname = location.pathname.split("/");
  var pathname = location.pathname.replace("%20", " ").replace("/", "");

  function createData(id, data, descricao) {
    return { id, data, descricao};
  }

  const rows = [
    createData(1, "12/02/2024", "Lorem Ipsum Dolor"),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",),
    createData(1, "12/02/2024", "Lorem Ipsum Dolor",)
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const nav = useNavigate();

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">
          <h1 className="pedidos-title">{pathname}</h1>
        </div>

        <M.TableContainer component={Paper} className="table-container" sx={{ maxHeight: 640 }}>
          <M.Table aria-label="simple table" stickyHeader>
            <M.TableHead >
              <M.TableRow>
                <M.TableCell><b>Id</b></M.TableCell>
                <M.TableCell><b>Data</b></M.TableCell>
                <M.TableCell align="center"><b>Descrição</b></M.TableCell>
              </M.TableRow>
            </M.TableHead>
            <M.TableBody>
              {rows.map((row) => (
                <M.TableRow key={row.data}>
                  <M.TableCell>{row.id}</M.TableCell>
                  <M.TableCell component="th" scope="row">
                    {row.data}
                  </M.TableCell>
                  <M.TableCell align="center">{row.descricao}</M.TableCell>
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
