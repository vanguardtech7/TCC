import './not-found.css'
import { useNavigate } from 'react-router-dom'

import heroImage from '../../assets/images/hero-image-astro.svg'
import heroBack from '../../assets/images/hero-image-background.svg'

export default function NotFound() {
    const nav = useNavigate()

    return (
        <div className="nf-container">
            <div className="nf-info">
                <div className="nf-text-container">
                    <h1 className="nf-title">Erro <span className="nf-title-highlight">404</span></h1>
                    <h2 className="nf-subtitle">Página não encontrada :/</h2>
                </div>
                <button className="nf-btn" onClick={() => { nav('/') }}>Voltar para Home</button>
            </div>
            <div className="nf-design">
                <img src={heroBack} alt="" className='nf-image nf-background' />
                <img src={heroImage} alt="" className='nf-image nf-hero' />
            </div>
        </div>
    )
}
