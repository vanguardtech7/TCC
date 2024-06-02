import "../../App.css";
import "./landing-page.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// importando as libs
import { slide as Menu } from "react-burger-menu";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollIntoView from "react-scroll-into-view";
import * as I from "iconoir-react";

// importando imagens
import logoSenai from "../../assets/images/logo-senai.svg";
import heroImage from "../../assets/images/hero-image-full.svg";
import impressora1 from "../../assets/images/impressora1.svg";
import impressora2 from "../../assets/images/impressora2.svg";
import impressora3 from "../../assets/images/impressora3.svg";
import tutorial1 from "../../assets/images/tutorial1.svg";
import tutorial2 from "../../assets/images/tutorial2.svg";
import tutorial3 from "../../assets/images/tutorial3.png";
import tutorial4 from "../../assets/images/tutorial4.svg";
import vanguardLogo from "../../assets/images/vanguard-logo.svg";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <body>
      <header data-aos="fade-down">
        <img src={logoSenai} alt="logo" className="logo-senai desktop" />
        <div className="sub-header">
          <ScrollIntoView selector="#top">
            <h1 className="header-name">
              Espaço Maker <span className="span-header">3D</span>
            </h1>
          </ScrollIntoView>
          <I.Menu
            alt="menu hamburguer"
            className="icon-menu-hamburguer desktop"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            color="white"
          />
          <div className="nav-mobile mobile">
            <h4
              className="header-text mobile"
              onClick={() => {
                nav("/login");
              }}
            >
              Login
            </h4>
            <h4
              className="header-text mobile"
              onClick={() => {
                nav("/cadastro");
              }}
            >
              Cadastro
            </h4>
          </div>
        </div>
      </header>
      <Menu
        isOpen={menuOpen}
        width={"20%"}
        right
        className="menu-hamburger"
        onClose={() => setMenuOpen(!menuOpen)}
      >
        <a id="roxo" className="menu-item" href="/login">
          Login
        </a>
        <a id="roxo" className="menu-item" href="/cadastro">
          Registre-se
        </a>
        <a
          id=""
          className="menu-item"
          href="#sobre"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Sobre Nós
        </a>
        <a
          id=""
          className="menu-item"
          href="#horario"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Horários
        </a>
      </Menu>
      <section
        className="section"
        data-aos="fade-down"
        data-aos-duration="3000"
        id="top"
      ></section>
      <main>
        <div
          className="hero-container"
          data-aos="fade-down"
          data-aos-duration="1000"
          id="hero"
        >
          <div className="hero-sub-container">
            <h1 className="hero-title">
              Conheça o <br /> nosso espaço.
            </h1>
            <ScrollIntoView selector="#tutorial">
              <button className="hero-button">Como Agendar?</button>
            </ScrollIntoView>
          </div>
          <img src={heroImage} alt="hero" className="hero-image" />
        </div>
        <div
          className="sobre-container"
          data-aos="fade-left"
          data-aos-duration="2000"
          id="sobre"
        >
          <h1 className="sobre-title">
            Sobre Nós <div className="sobre-divider"></div>
          </h1>

          <div className="sobre-sub-container">
            <h3>
              O Espaço Maker foi uma área criada na Escola SENAI
              Suiço-Brasileira - SP. Feito para disponibilizar um espaço para
              alunos e professores utilizarem das mais novas tecnologias de
              impressão 3D e outras tecnologias. 
              <span className="desktop">
                No Espaço Maker, os alunos são incentivados a explorar sua
                criatividade e a desenvolver habilidades práticas, aplicando
                conceitos de design e engenharia em projetos reais. Com acesso a
                equipamentos de última geração, como impressoras 3D e cortadoras
                a laser, eles podem transformar suas ideias em protótipos
                tangíveis e soluções inovadoras. Além disso, os professores
                estão disponíveis para orientar e auxiliar os alunos em seus
                projetos, promovendo um ambiente colaborativo e de aprendizado
                contínuo.
                </span>
            </h3>
          </div>
        </div>
        <div className="divider"></div>
        <div
          className="impressoras-container"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          <h1 className="impressoras-title">
            Nossas Impressoras<div className="sobre-divider"></div>
          </h1>
          <div className="card-container">
            <div className="card-impressora">
              <h2 className="card-title">Impressora 3D Creality CR-5 Pro</h2>
              <img src={impressora1} alt="impressora1" className="card-image" />
              <div className="card-divider"></div>
              <p className="card-text">
                Ideal para materiais de altas temperaturas, concilia um sistema
                de extrusão e uma estrutura cúbica estável efechada para manter
                a temperatura constante.
              </p>
            </div>
            <div className="card-impressora">
              <h2 className="card-title">
                Impressora 3D <br /> Resina Halot Mage
              </h2>
              <img src={impressora2} alt="impressora1" className="card-image" />
              <div className="card-divider"></div>
              <p className="card-text">
                Impressora de resina de última geração da Creality, que entrega
                impressões de alta qualidade. Com resolução de 8K, componentes
                High-End e velocidade de impressão que chega a 170mm/h.
              </p>
            </div>
            <div className="card-impressora">
              <h2 className="card-title">Impressora 3D CR-200B Creality</h2>
              <img src={impressora3} alt="impressora1" className="card-image" />
              <div className="card-divider"></div>
              <p className="card-text">
                Impressora CREALITY 3D CR-200B, requintada e de alto desempenho.
                A câmara fechada com 200x200x200mm apresenta um tamanho de
                impressão maior.
              </p>
            </div>
          </div>
        </div>
        <div
          className="tutorial-container"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <h1 className="tutorial-title" id="tutorial">
            Como Agendar <div className="sobre-divider"></div>
          </h1>
          <div
            className="tutorial-sub-container"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <p className="tutorial-text">
              <span className="background-text">1. </span> Registre-se (ou faça
              login, se já tiver uma conta). Para agendar é necessário estar
              registrado.
            </p>
            <img className="tutorial-image" src={tutorial1} alt="" />
          </div>
          <div className="tutorial-divider"></div>
          <div
            className="tutorial-sub-container"
            data-aos="fade-left"
            data-aos-duration="3000"
          >
            <img className="tutorial-image" src={tutorial4} alt="" />
            <p className="tutorial-text">
              <span className="background-text">2. </span>Separe seu projeto em
              PDF ou Imagem! Saiba para quando quer agendar e o tempo estimado
              de impressão.
            </p>
          </div>
          <div className="tutorial-divider"></div>
          <div
            className="tutorial-sub-container"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <p className="tutorial-text">
              <span className="background-text">3. </span> Escolha a data, o
              tempo estimado e envie o arquivo (imagem ou pdf) na área de
              agendamento.
            </p>
            <img className="tutorial-image" src={tutorial3} alt="" />
          </div>
          <div className="tutorial-divider"></div>
          <div
            className="tutorial-sub-container"
            data-aos="fade-left"
            data-aos-duration="3000"
          >
            <img className="tutorial-image" src={tutorial2} alt="" />
            <p className="tutorial-text">
              <span className="background-text">4. </span> Tudo pronto! Agora só
              esperar a data e o tempo determinado para a impressão.
            </p>
          </div>
          <button className="tutorial-button">Agende agora!</button>
        </div>
        <div
          className="horario-container row background-elipse"
          data-aos="fade-up"
          data-aos-duration="2000"
          id="horario"
        >
          <div className="horario-container">
            <h1 className="horario-title">
              Horários<div className="sobre-divider"></div>
            </h1>
            <div className="horario-sub-container">
              <div className="horario-column">
                <h2>Seg. a Sex.</h2>
                <h2>Sábado</h2>
                <h2>Domingo</h2>
              </div>
              <div className="horario-column">
                <h2>-</h2>
                <h2>-</h2>
                <h2>-</h2>
              </div>
              <div className="horario-column">
                <h2>8h às 20h</h2>
                <h2>Fechado</h2>
                <h2>Fechado</h2>
              </div>
            </div>
          </div>
          <div className="horario-container">
            <h1 className="horario-title">
              Localização<div className="sobre-divider"></div>
            </h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5168.655868359939!2d-46.719084316805045!3d-23.647632744249393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce510e8d3746ed%3A0x3e9f3a76e1ebfb69!2sEscola%20Senai%20Su%C3%AD%C3%A7o-Brasileira%20Paulo%20Ernesto%20Tolle!5e0!3m2!1spt-BR!2sbr!4v1710873292481!5m2!1spt-BR!2sbr"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="iframe"
            ></iframe>
          </div>
        </div>{" "}
        <footer className="footer">
          <img src={vanguardLogo} alt="" className="footer-logo" />
          <div className="footer-nav">
            <div className="footer-sub">
              <h2 className="footer-title">Nav</h2>
              <a href="/login">Login</a>
              <a href="#sobre">Sobre</a>
              <a href="#horario">Horários</a>
            </div>
            <div className="footer-sub">
              <h2 className="footer-title">Info</h2>
              <a href="#tutorial">Tutorial</a>
              <a
                href="https://sp.senai.br/unidade/suicobrasileira/"
                target="blank_"
              >
                Senai
              </a>
            </div>
          </div>
        </footer>
      </main>
    </body>
  );
}
