import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as M from "@mui/material";
import * as MI from "@mui/icons-material";
import Paper from "@mui/material/Paper";

export default function Material() {
  const location = useLocation("");
  var pathname = location.pathname.split("/");
  var pathname = location.pathname.replace("%20", " ").replace("/", "");

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const nav = useNavigate()

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">
          <h1 className="pedidos-title">{pathname}</h1>
          <button className="system-btn" onClick={() => (nav('/cadastrar material'))}>Cadastrar Material</button>
        </div>

        <M.TableContainer component={Paper} className="table-container">
          <M.Table aria-label="simple table">
            <M.TableHead>
              <M.TableRow>
                <M.TableCell>Cor</M.TableCell>
                <M.TableCell align="left">Peso (un.)</M.TableCell>
                <M.TableCell align="left">Material</M.TableCell>
                <M.TableCell align="left">Diâmetro</M.TableCell>
                <M.TableCell align="left">Quantidade</M.TableCell>
                <M.TableCell align="center">#</M.TableCell>
              </M.TableRow>
            </M.TableHead>
            <M.TableBody>
              {rows.map((row) => (
                <M.TableRow key={row.name}>
                  <M.TableCell component="th" scope="row">
                    {row.name}
                  </M.TableCell>
                  <M.TableCell align="left">{row.calories}</M.TableCell>
                  <M.TableCell align="left">{row.fat}</M.TableCell>
                  <M.TableCell align="left">{row.carbs}</M.TableCell>
                  <M.TableCell align="left">{row.protein}</M.TableCell>
                  <M.TableCell
                    align="center"
                    onClick={() => {
                      setModalOpen(!modalOpen);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <MI.Delete />
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
            <h3 className="modal-excluir-text">Essa ação não poderá ser revertida!</h3>
            <div className="modal-btn-container">
              <button className="modal-btn btn-cancelar"  onClick={() => {setModalOpen(!modalOpen)}}>Cancelar</button>
              <button className="modal-btn btn-confirmar" onClick={() => {setModalOpen(!modalOpen)}}>Confirmar</button>
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
