import HeaderSidebar from "../../../components/header-sidebar/header-sidebar";
import * as M from "@mui/material";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function CriarMaquina() {

  let [nome, setNome] = useState('')
  let [capacidade, setCapacidade] = useState()
  let [modelo, setModelo] = useState('')
  let [num, setNum] = useState('')
  let [especif, setEspecif] = useState('')
  let [energia, setEnergia] = useState('')

  const handleCadastro = async () => {
    console.log('entrou no handle cadastro')
    if (num === ''){
      toast.warning('Numero de série obrigatório!!', {icon: '⚠'})
      setNull()
    } else{
      try{
        const response = await axios.post(
          "https://aware-clam-teddy.cyclic.app/maquinas",
          {
            nome_maquina: nome,
            capacidade: capacidade,
            modelo: modelo,
            num_serie: num,
            especi: especif,
            entrada_ener: energia
          })
          toast.success('Cadastro realizado com sucesso!')
      } catch(error){
        console.log('Erro', error)
      }
    }
  }

  const setNull = () => {
    setCapacidade("")
    setNome("")
    setNum("")
    setEspecif("")
    setEnergia("")
    setModelo("")
  }

  return (
    <div className="section-body">
      <HeaderSidebar />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={1}
        closeOnClick
        draggable
        pauseOnHover={false}
        transition={Bounce}
      />
      <div className="section-container">
        <div className="cadastrar-container">
          <h1 className="cadastrar-title">Cadastrar Nova Máquina</h1>
          <div className="maquina">
            <div className="cadastrar-column">
              <div className="maquina-input">
                <p className="cadastrar-label">Nome:</p>
                <M.TextField fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Modelo:</p>
                <M.TextField fullWidth 
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Especificações:</p>
                <M.TextField fullWidth
                value={especif}
                onChange={(e) => setEspecif(e.target.value)}></M.TextField>
              </div>
            </div>
            <div className="cadastrar-column">
            <div className="maquina-input">
                <p className="cadastrar-label">Capacidade:</p>
                <M.TextField type="number" fullWidth value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Número de série:</p>
                <M.TextField fullWidth value={num}
                onChange={(e) => setNum(e.target.value)}></M.TextField>
              </div>
              <div className="maquina-input">
                <p className="cadastrar-label">Entrada de Energia:</p>
                <M.TextField fullWidth value={energia}
                onChange={(e) => setEnergia(e.target.value)}></M.TextField>
              </div>
              
            </div>
          </div>
          <button className="system-btn cadastrar-btn" onClick={() => {
            handleCadastro()
          }}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}
