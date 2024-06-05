import './back-button.css'
import { useNavigate } from "react-router-dom";
import * as I from "iconoir-react";

export default function BackButton() {
  let nav = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          nav(-1);
        }}
      >
        <I.NavArrowLeft />
      </button>
    </>
  );
}

export function BackAgendamento() {
  let nav = useNavigate();

  return (
    <button
      onClick={() => {
        nav('/agendamento')
      }}>
      <I.NavArrowLeft />
    </button>
  )
}

