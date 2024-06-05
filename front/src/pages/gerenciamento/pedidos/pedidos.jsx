import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "@mui/material";
import Paper from "@mui/material/Paper";
import "../gerenciamento.css";

export default function Pedidos() {
  const location = useLocation();
  const pathname = location.pathname.replace("%20", " ").replace("/", "");

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    axios
      .get("https://techprint-1.onrender.com/pedidos")
      .then((response) => {
        const data = response.data;
        const formattedData = data.map((item) =>
          createData(
            item.id,
            item.nome_pedido,
            item.nome_usuario,
            item.data,
            item.descri,
            item.tempo_impre
          )
        );
        setIsLoading(false);

        setRows(formattedData);
      })
      .catch((error) => {
        setIsLoading(false);

        console.error("There was an error fetching the pedidos!", error);
      });
  }, []);

  function createData(
    id,
    nome_pedido,
    nome_usuario,
    data,
    descri,
    tempo_impre
  ) {
    const dataFormatada = new Date(data).toLocaleDateString("pt-BR");
    return {
      id,
      nome_pedido,
      nome_usuario,
      data: dataFormatada,
      descri,
      tempo_impre,
    };
  }

  return (
    <div className="section-body">
      <HeaderSidebar />
      <div className="section-container">
        <div className="top-container">
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
                <M.TableCell>Nome do Usuário</M.TableCell>
                <M.TableCell>Data</M.TableCell>
                <M.TableCell>Descrição</M.TableCell>
                <M.TableCell>Tempo de Impressão</M.TableCell>
              </M.TableRow>
            </M.TableHead>
            <M.TableBody>
              {isLoading ? (
                <p className="table-message">Carregando...</p>
              ) : (
                <>
                  {rows.length > 0 ? (
                    rows.map((row) => (
                      <M.TableRow key={row.id}>
                        <M.TableCell>{row.id}</M.TableCell>
                        <M.TableCell>{row.nome_pedido}</M.TableCell>
                        <M.TableCell>{row.nome_usuario}</M.TableCell>
                        <M.TableCell>{row.data}</M.TableCell>
                        <M.TableCell>{row.descri}</M.TableCell>
                        <M.TableCell>{row.tempo_impre}</M.TableCell>
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
    </div>
  );
}
