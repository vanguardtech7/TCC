import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as M from "@mui/material";
import * as MI from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import axios from "axios"; // Importe o Axios

export default function Material() {
  const location = useLocation("");
  var pathname = location.pathname.split("/");
  var pathname = location.pathname.replace("%20", " ").replace("/", "");

  const [materials, setMaterials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = () => {
    axios.get("https://aware-clam-teddy.cyclic.app/materiais")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.error("erro ao buscar materiais", error);
      });
  };

  const nav = useNavigate();

  const handleDelete = () => {
    if (!materialToDelete) return;

    axios.delete(`https://aware-clam-teddy.cyclic.app/materiais/${materialToDelete.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // Adicione o token ao cabeçalho Authorization
      }
    })
      .then(() => {
        setMaterials(materials.filter(material => material.id !== materialToDelete.id));
        setModalOpen(false);
        setMaterialToDelete(null);
      })
      .catch((error) => {
        console.error("erro ao excluir material", error);
      });
  };

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">
          <h1 className="pedidos-title">{pathname}</h1>
          <button className="system-btn" onClick={() => nav("/cadastrar material")}>
            Cadastrar Material
          </button>
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
              {materials.map((material) => (
                <M.TableRow key={material.id}>
                  <M.TableCell component="th" scope="row">
                    {material.cor}
                  </M.TableCell>
                  <M.TableCell align="left">{material.peso}</M.TableCell>
                  <M.TableCell align="left">{material.material}</M.TableCell>
                  <M.TableCell align="left">{material.diametro}</M.TableCell>
                  <M.TableCell align="left">{material.quantidade}</M.TableCell>
                  <M.TableCell
                    align="center"
                    onClick={() => {
                      setMaterialToDelete(material);
                      setModalOpen(true);
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
              <button className="modal-btn btn-cancelar" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
              <button className="modal-btn btn-confirmar" onClick={handleDelete}>
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
