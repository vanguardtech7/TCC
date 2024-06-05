import './botao-login.css';
import { ReactComponent as Spinner } from '../../assets/images/spinner.svg';

export default function Botao({ label, loading, disabled }) {
    return (
        <button className='login-button' disabled={disabled}>
            {!loading ? label : <Spinner />}
        </button>
    );
}

export function BotaoAgendamento({ label, loading, disabled }) {
    return (
        <button className='login-button cadastro-button' disabled={disabled}>
            {!loading ? label : <Spinner />}
        </button>
    );
}
