import './back-button.css';
import { useNavigate } from 'react-router-dom';
import * as I from 'iconoir-react';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>
      <I.NavArrowLeft />
    </button>
  );
}

export function BackAgendamento() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/agendamento')}>
      <I.NavArrowLeft />
    </button>
  );
}
