import {
  IonBackdrop,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import {
  logoFacebook,
  logoTwitter,
  logoInstagram,
  download,
  menu,
  close, arrowUp
} from "ionicons/icons";
import "./Home.scss";

const menuList = [
  {
    id: "menu-start",
    section: "start",
    desc: "Início",
    href: "/home#",
    active: true,
  },
  {
    id: "menu-plan",
    section: "plan",
    desc: "Plano de Gestão",
    href: "/home#",
    active: false,
  },
  {
    id: "menu-team",
    section: "team",
    desc: "Nossa Equipe",
    href: "/home#",
    active: false,
  },
];

const Home: React.FC = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuActive, setMenuActive] = useState(menuList);

  const [scrollTop, setScrollTop] = useState(0);

  const start: any = useRef(null);
  const plan: any = useRef(null);
  const team: any = useRef(null);

  const breakSize = 768;

  const downloadFile = () => {
    window.open(
      "/assets/plan/plano-de-gestao-unidos-pela-unirg-2021-2024.pdf",
      "_blank"
    );
  };

  const menuToggle = () => {
    if (!menuOpen) setMenuOpen(true);
    else setMenuOpen(false);
  };

  const handleMenuActive = (item: any) => {
    menuActive.forEach((currentItem) => {
      if (item.id === currentItem.id) {
        currentItem.active = true;
      } else {
        currentItem.active = false;
      }
    });

    setMenuActive(menuActive);
  };

  const scrollToTop = () => {
    const content: any = document.querySelector("ion-content");
    content.scrollToTop(200);
  }

  const menuSelection = (item: any) => {
    const elementOffsetTop = eval(item.section + ".current.offsetTop");
    const content: any = document.querySelector("ion-content");

    content.scrollToPoint(0, elementOffsetTop, 300);
    handleMenuActive(item);
    setMenuOpen(false);
  };

  const menuItem = (id: string) => {
    for (let i = 0; i < menuActive.length; i++) {
      if (menuActive[i].id === id) {
        document.getElementById(menuActive[i].id)?.classList.add('active');
      }
      else document.getElementById(menuActive[i].id)?.classList.remove('active');
    }
    return menuActive.find((menu) => menu.id === id);
  };

  const handleScrollEvent = (e: any) => {
    const top = e.detail.scrollTop;
    const planOffset = plan.current.offsetTop;
    const teamOffset = team.current.offsetTop;

    setScrollTop(top);

    if (top < planOffset && top < teamOffset) {
      handleMenuActive(menuItem("menu-start"));
    }

    if (top >= planOffset && top < teamOffset) {
      handleMenuActive(menuItem("menu-plan"));
    }

    if (top >= teamOffset) {
      handleMenuActive(menuItem("menu-team"));
    }
  };

  // Update Window Dimensions
  const updateDimensions = () => {
    setWindowSize(window.innerWidth);
    if (window.innerWidth > breakSize) setMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);


  const w: any = window;
  const gtag = w?.gtag || [];

  const getAnalytics = () => {
    gtag('event', 'click', {
      'event_category': 'download',
      'event_label': 'site-plan-download-button'
    });
  }

  document.getElementById('download')?.addEventListener("click", getAnalytics);


  return (
    <IonPage>
      <IonHeader className="bg-brand-color-1">
        <div className="container">
          <IonButton
            mode="ios"
            className="menu-toggle"
            onClick={() => menuToggle()}
          >
            <IonIcon icon={menu} />
          </IonButton>

          <nav
            className={
              windowSize > breakSize
                ? "nav-collapse navbar"
                : menuOpen
                  ? "nav-collapse navbar mobile-menu show-menu"
                  : "nav-collapse navbar mobile-menu hide-menu"
            }
          >

            {
              windowSize <= breakSize &&
              <IonButton
                color="light"
                mode="ios"
                className="menu-close"
                onClick={() => menuToggle()}
              >
                <IonIcon icon={close} />
              </IonButton>

            }

            <ul className="nav">
              {
                menuActive.map((menu) => (
                  <li
                    className="nav-item"
                    key={menu.id}
                    onClick={() => menuSelection(menu)}
                  >
                    <a
                      href={menu.href}
                      className={menu.active ? "nav-link active" : "nav-link"}
                      id={menu.id}
                    >
                      {menu.desc}
                    </a>
                  </li>
                ))
              }

              <li className="nav-item">
                <a
                  href="https://facebook.com/unidospelaunirg"
                  target="blank"
                  className="nav-link"
                >
                  <IonIcon icon={logoFacebook} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://instagram.com/unidospelaunirg"
                  target="blank"
                  className="nav-link"
                >
                  <IonIcon icon={logoInstagram} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://twitter.com/unidospelaunirg"
                  target="blank"
                  className="nav-link"
                >
                  <IonIcon icon={logoTwitter} />
                </a>
              </li>
            </ul>
          </nav>
          <a className="logo top navbar-brand"
            onClick={() => menuSelection(menuActive[0])}
            href="/home#">
            <img
              src="assets/logo/logo-negative.svg"
              alt="Logo Unidos pela Unirg"
            />
          </a>
        </div>
      </IonHeader>

      <div
        onClick={() => menuToggle()}
        className={
          menuOpen ?
            'backdrop show-backdrop' :
            'backdrop hide-backdrop'}>
      </div>

      { scrollTop > 60 &&
        <div className="container">
          <IonFab
            onClick={() => scrollToTop()}
            vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton color="tertiary">
              <IonIcon icon={arrowUp} />
            </IonFabButton>
          </IonFab>
        </div>
      }

      <IonContent
        scrollEvents={true}
        onIonScroll={(e) => handleScrollEvent(e)}
      >
        <section ref={start} id="start">
          <IonSlides>
            <IonSlide className="slide slide-1">
              <div className="container hero-text-block">
                <h2>
                  Vamos juntos{" "}
                  <strong>
                    <em>elevar</em>
                  </strong>{" "}
                  a{" "}
                  <strong>
                    <em>UnirG</em>
                  </strong>{" "}
                  ao{" "}
                  <strong>
                    <em>Próximo Nível</em>
                  </strong>{" "}
                  e fazer, de{" "}
                  <strong>
                    <em>sua história</em>
                  </strong>
                  , a{" "}
                  <strong>
                    <em>nossa história</em>
                  </strong>
                  !
                </h2>
              </div>
            </IonSlide>
          </IonSlides>
          <div className="hero-footer">
            <span className="text-1">
              Dia <strong>20</strong> de outubro,
            </span>{" "}
            <span>
              <img className="v-icon" src="assets/icons/v-icon.svg" alt="v" />
            </span>{" "}
            <span className="text-2">
              <strong>ote!</strong>
            </span>
          </div>
        </section>

        <section ref={plan} id="plan">
          <div className="section-background"></div>
          <div className="container content-block">
            <div className="text-block">
              <h3>Plano de Gestão</h3>
              <p>
                São{" "}
                <strong>
                  <em>92 propostas</em>
                </strong>{" "}
                respaldadas pelos{" "}
                <strong>
                  <em>
                    Cinco Eixos e as 10 Dimensões Estratégicas Institucionais
                  </em>
                </strong>
                , contidas tanto no{" "}
                <strong>
                  <em>PDI (Plano de Desenvolvimento Institucional)</em>
                </strong>{" "}
                como no{" "}
                <strong>
                  <em>PPI (Projeto Pedagógico Institucional)</em>
                </strong>{" "}
                do{" "}
                <strong>
                  <em>Plano Nacional de Educação (PNE) 2014-2024</em>
                </strong>{" "}
                e mais o{" "}
                <strong>
                  <em>Plano de Cargos e Salários dos Servidores da UnirG</em>
                </strong>
                .
              </p>
              <ul>
                <li>
                  16 propostas para o Eixo - Qualidade de Vida Dos Trabalhadores
                  e Trabalhadoras da UnirG
                </li>
                <li>
                  20 propostas para o Eixo - Planejamento e Avaliação
                  Institucional
                </li>
                <li>
                  24 propostas para o Eixo - Desenvolvimento Institucional
                </li>
                <li>10 propostas para o Eixo - Políticas Acadêmicas</li>
                <li>16 propostas para o Eixo - Políticas de Gestão</li>
                <li>06 propostas para o Eixo - Infraestrutura Física</li>
              </ul>
              <IonButton
                id="download"
                mode="ios"
                color="tertiary"
                onClick={() => downloadFile()}
              >
                <IonIcon icon={download} slot="start" />
                Baixar Plano de Gestão
              </IonButton>
            </div>
          </div>
        </section>
        <section ref={team} id="team">
          <div className="section-background"></div>
          <div className="container content-block">
            <div className="text-block">
              <h3>Nossa Equipe</h3>

              <IonCard className="ion-no-margin">
                <div className="team-block">
                  <IonRow>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="4"
                      className="team-photo team-border-1"
                    >
                      <img
                        src="assets/img/team-1.png"
                        alt="SARA FALCÃO DE SOUSA"
                      />
                    </IonCol>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="8"
                      className="team-info"
                    >
                      <span className="team-profession">Professora</span>
                      <br />
                      <span className="team-name">SARA FALCÃO DE SOUSA</span>
                      <br />
                      <span className="team-position">
                        CANDIDATA À REITORIA
                      </span>
                      <ul>
                        <li>
                          Doutora em Ciências da Saúde pela Faculdade de
                          Medicina da Universidade Federal de Goiás – 2020;
                        </li>
                        <li>
                          Mestre em Ciências da Motricidade Humana pela
                          Universidade Castelo Branco do Rio de Janeiro – 2010;
                        </li>
                        <li>
                          Especialista em Regulação em Saúde pelo Hospital Sírio
                          Libanês - 2018
                        </li>
                        <li>
                          Farmacêutica habilitada em Farmácia Industrial pela
                          Universidade de Marília-SP – 2004;
                        </li>
                        <li>
                          Formada em Farmácia pela Universidade de Marília - São
                          Paulo – 2003;
                        </li>
                        <li>
                          Docente Adjunto I da Universidade de Gurupi - UNIRG
                          desde agosto de 2008.
                        </li>
                      </ul>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="team-quote">
                  "A liberdade de sermos melhores nada significa se não
                  estivermos dispostos a dar o melhor de nós"
                </div>
              </IonCard>

              <IonCard className="ion-no-margin">
                <div className="team-block">
                  <IonRow>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="4"
                      className="team-photo team-border-2"
                    >
                      <img
                        src="assets/img/team-2.png"
                        alt="JEANN BRUNO FERREIRA DA SILVA"
                      />
                    </IonCol>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="8"
                      className="team-info"
                    >
                      <span className="team-profession">Professor</span>
                      <br />
                      <span className="team-name">
                        JEANN BRUNO FERREIRA DA SILVA
                      </span>
                      <br />
                      <span className="team-position">
                        CANDIDATO À VICE-REITORIA
                      </span>
                      <ul>
                        <li>
                          Doutorando em Desenvolvimento Regional pela
                          Universidade Federal do Tocantins – 2019;
                        </li>
                        <li>
                          Mestre em Ciências da Saúde pela Universidade Federal
                          do Tocantins – 2017;
                        </li>
                        <li>
                          Especialização em Saúde Mental pela Faculdade de
                          Ciências Sociais Aplicadas do Marabá/PA - 2018;
                        </li>
                        <li>
                          Especialização em Psicologia Organiza- cional e do
                          Trabalho pela Faculdade de Ciências Sociais Aplicadas
                          do Marabá/PA - 2014;
                        </li>
                        <li>
                          Psicólogo pela Universidade de Gurupi/UnirG – 2014;
                        </li>
                        <li>
                          Docente Especialista I da Universidade de Gurupi/UnirG
                          desde agosto de 2015.
                        </li>
                      </ul>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="team-quote">
                  “Se quisermos uma Universidade de excelência, o planejamento
                  deve ser a nossa direção”
                </div>
              </IonCard>

              <IonCard className="ion-no-margin">
                <div className="team-block">
                  <IonRow>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="4"
                      className="team-photo team-border-3"
                    >
                      <img
                        src="assets/img/team-3.png"
                        alt="RISE CONSOLAÇÃO IUATA RANK"
                      />
                    </IonCol>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="8"
                      className="team-info"
                    >
                      <span className="team-profession">Professora</span>
                      <br />
                      <span className="team-name">
                        RISE CONSOLAÇÃO IUATA RANK
                      </span>
                      <br />
                      <span className="team-position">
                        CANDIDATA À PRÓ-REITORIA DE GRADUAÇÃO
                      </span>
                      <ul>
                        <li>
                          Especialização, Mestrado e Doutorado em
                          Odontopediatria (UnicSul – São Paulo);
                        </li>
                        <li>Especialização em Ortodontia pela Uningá (TO);</li>
                        <li>Especialização em Docência na saúde (UFRGS);</li>
                        <li>
                          Professora titular II em Odontopediatria na UnirG;
                        </li>
                        <li>
                          Coordenadora do Programa de Promoção em saúde bucal
                          “Boquinha do Bebê” (Gurupi-TO);
                        </li>
                        <li>
                          Coordenadora do Curso de Odontologia do Centro
                          Universitário UNIRG nos biênios de 2008/2010 e
                          2010/2012;
                        </li>
                        <li>
                          Coordenadora do Comitê de Ética em Pesquisa em Seres
                          Humanos no período de 2012 a 2018;
                        </li>
                        <li>
                          Mais de 40 artigos publicados em revistas cientificas
                          de qualidade, vários periódicos internacionais.
                        </li>
                        <li>
                          Além disso, é artista plástica e ilustradora de
                          livros.
                        </li>
                      </ul>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="team-quote">
                  “A mola propulsora para continuarmos sendo uma Universidade
                  democrática é o trabalho em equipe”
                </div>
              </IonCard>

              <IonCard className="ion-no-margin">
                <div className="team-block">
                  <IonRow>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="4"
                      className="team-photo team-border-4"
                    >
                      <img src="assets/img/team-4.png" alt="FABIO PEGORARO" />
                    </IonCol>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="8"
                      className="team-info"
                    >
                      <span className="team-profession">Professor</span>
                      <br />
                      <span className="team-name">FABIO PEGORARO</span>
                      <br />
                      <span className="team-position">
                        CANDIDATO À PRÓ-REITORIA DE PESQUISA E PÓS-GRADUAÇÃO
                      </span>
                      <ul>
                        <li>
                          Possui graduação em Administração pela Faculdade UnirG
                          (2004);
                        </li>
                        <li>
                          MBA em Gestão Empresarial pela Fundação Getúlio Vargas
                          - FGV (2004);
                        </li>
                        <li>
                          Mestrado em Engenharia de Produção e Sistemas pela
                          Pontifícia Universidade Católica de Goiás - PUC-GO
                          (2012);
                        </li>
                        <li>
                          Doutorado em Engenharia de Produção e Sistemas pela
                          Pontifícia Universidade Católica do Paraná (PUCPR);
                        </li>
                        <li>
                          Pós-Doutorando em Engenharia de Produção e Sistemas
                          (PUCPR);
                        </li>
                        <li>
                          Foi bolsista pesquisador da Fundação Araucária do
                          Estado do Paraná e CAPES.
                        </li>
                        <li>
                          Sua área de pesquisa inclui Inteligência Artificial
                          Aplicada à Área da Saúde, Simulação de Eventos
                          Discretos e Multiple Criteria Decision Making (MCDM)
                          aplicada ao domínio da gestão em saúde;
                        </li>
                        <li>
                          Foi Coordenador do Projeto de extensão Empreendimentos
                          Solidários (2008-2010);
                        </li>
                        <li>
                          É Professor Adjunto efetivo do Curso de Administração,
                          Fisioterapia e Medicina da Universidade UNIRG;
                        </li>
                        <li>
                          Atuou também como bolsista pesquisador do CNPQ no
                          Projeto de Extensão GestLeite.
                        </li>
                      </ul>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="team-quote">
                  “O conhecimento construído na Universidade contribui para uma
                  a sociedade melhor”
                </div>
              </IonCard>

              <IonCard className="ion-no-margin">
                <div className="team-block">
                  <IonRow>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="4"
                      className="team-photo team-border-5"
                    >
                      <img
                        src="assets/img/team-5.png"
                        alt="MIREIA APARECIDA BEZERRA PEREIRA"
                      />
                    </IonCol>
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="12"
                      sizeLg="12"
                      sizeXl="8"
                      className="team-info"
                    >
                      <span className="team-profession">Professora</span>
                      <br />
                      <span className="team-name">
                        MIREIA APARECIDA BEZERRA PEREIRA
                      </span>
                      <br />
                      <span className="team-position">
                        CANDIDATA À PRÓ-REITORIA EXTENSÃO, CULTURA E ASSISTÊNCIA
                        ESTUDANTIL
                      </span>
                      <ul>
                        <li>
                          Doutoranda em Produção Vegetal pela Universidade
                          Federal do Tocantins - 2019.
                        </li>
                        <li>
                          Mestrado em Produção Vegetal pela Universidade Federal
                          do Tocantins – 2010.
                        </li>
                        <li>
                          Possui graduação em Engenharia Agronômica pela
                          Universidade Federal do Tocantins - 2007.
                        </li>
                        <li>
                          É Professora Adjunta I, pesquisadora e assessora da
                          Pró-Reitoria de Pesquisa e Pós-graduação da
                          Universidade de Gurupi.
                        </li>
                        <li>
                          Tem experiência com projetos de extensão na área de
                          Assentamentos Rurais, Bacias hidrográficas urbanizadas
                          e Tecnologias Sociais para produtor familiar, e em
                          pesquisa nas áreas de Plantas Medicinais, Fisiologia
                          Vegetal, Qualidade pós-colheita de frutas e
                          olerícolas, e aproveitamento de resíduos orgânicos.
                        </li>
                      </ul>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="team-quote">
                  “A essência da Universidade é o seu compromisso social com a
                  comunidade”
                </div>
              </IonCard>
            </div>
          </div>
        </section>
        <section id="footer">
          <div className="container content-block">
            &copy; Unidos pela UnirG 2020. Todos os direitos reservados
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
