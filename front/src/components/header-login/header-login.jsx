import './header-login.css';
import logoSenai from '../../assets/images/logo-senai.svg';
import { useNavigate } from 'react-router-dom';

export default function HeaderLogin() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 className="header-title" onClick={() => navigate('/')}>
        Espaço Maker <span>3D</span>
      </h1>
      <img src={logoSenai} alt="Logo Senai" className="logo-senai desktop" />
    </div>
  );
}
