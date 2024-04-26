
import HeaderSidebar from "../../../components/header-sidebar/header-sidebar"
import * as M from '@mui/material'

export default function CriarPerfil() {
    return (
        <div className="section-body">
            <HeaderSidebar />
            <div className="section-container">
                <div className="cadastrar-container">
                    <h1 className="cadastrar-title">Cadastrar Novo Perfil</h1>
                    <div className="maquina">
                        <div className="cadastrar-column">
                            <div className="maquina-input">
                                <p className="cadastrar-label">Nome:</p>
                                <M.TextField fullWidth></M.TextField>
                            </div>
                            <div className="maquina-input">
                                <p className="cadastrar-label">E-mail:</p>
                                <M.TextField fullWidth></M.TextField>
                            </div>
                            <div className="maquina-input">
                                <p className="cadastrar-label">Cargo:</p>
                                <M.Select fullWidth>
                                    <M.MenuItem>Aluno</M.MenuItem>
                                    <M.MenuItem>Professor</M.MenuItem>
                                    <M.MenuItem>Coordenador</M.MenuItem>
                                    <M.MenuItem>Funcionário</M.MenuItem>
                                </M.Select>
                            </div>
                        </div>
                        <div className="cadastrar-column">
                            <div className="maquina-input">
                                <p className="cadastrar-label">Senha:</p>
                                <M.TextField fullWidth></M.TextField>
                            </div>
                            <div className="maquina-input">
                                <p className="cadastrar-label">Turma:</p>
                                <M.TextField fullWidth></M.TextField>
                            </div>
                            <div className="maquina-input">
                                <p className="cadastrar-label">Admin?</p>
                                <div class="radio-button-container">
                                <div class="radio-button">
                                    <input type="radio" class="radio-button__input" id="radio1" name="radio-group" />
                                    <label class="radio-button__label" for="radio1">
                                        <span class="radio-button__custom"></span>
                                        Sim
                                    </label>
                                </div>
                                <div class="radio-button">
                                    <input type="radio" class="radio-button__input" id="radio2" name="radio-group" />
                                    <label class="radio-button__label" for="radio2">
                                        <span class="radio-button__custom"></span>
                                        Não
                                    </label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <button className="system-btn cadastrar-btn">Criar</button>
                </div>
            </div>
        </div>
    )
}