import { spanish } from "../lib/spanish";
import { useI18n } from "../lib/i18n-context";
import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";
import { useReducedMotion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download, BookOpen } from "lucide-react";
import { projects } from "../data/projects";
import portrait from "../assets/hero-thalles-photo-extended.png";
import "./Portfolio.css";

export default function Portfolio() {
  const {lang}=useI18n();
  const editorialText=(text:string)=>lang==="es" ? spanish(text) : text;
  const [params] = useSearchParams();
  const print = params.get("print") === "1";
  const engineRef = useRef<PageFlip | null>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(0);
  const reduce = useReducedMotion();
  const [turning,setTurning]=useState(false);
  const [page, setPage] = useState(0);
  const [single, setSingle] = useState(() => window.innerWidth < 850);
  useEffect(() => {
    window.scrollTo(0, 0);
    const query = window.matchMedia("(max-width: 849px)");
    const update = () => { setSingle(query.matches); setPage(0); };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const host = bookRef.current, source = sourceRef.current;
    if (print || !host || !source) return;
    let lastWidth = 0;
    const mount = () => {
      const width = Math.floor(host.clientWidth / (single ? 1 : 2));
      if (width < 1 || width === lastWidth) return;
      lastWidth = width;
      engineRef.current?.destroy();
      const element = document.createElement("div");
      host.replaceChildren(element);
      const engine = new PageFlip(element, { width, height: Math.round(width * 297 / 210), size: "fixed", startPage: single ? currentPage.current : Math.floor(currentPage.current / 2) * 2, usePortrait: single, showCover: false, drawShadow: true, flippingTime: reduce ? 1 : 700, maxShadowOpacity: .32, autoSize: false, mobileScrollSupport: true, clickEventForward: true, useMouseEvents: !reduce, showPageCorners: false, disableFlipByClick: false, swipeDistance: 25 });
      engineRef.current = engine;
      engine.on("flip", event => { const index = Number(event.data); currentPage.current = index; setPage(index); });
      engine.on("changeState", event=>setTurning(event.data!=="read"));
      engine.loadFromHTML(Array.from(source.children).map(node => node.cloneNode(true) as HTMLElement));
      currentPage.current = engine.getCurrentPageIndex();
      setPage(currentPage.current);
    };
    mount();
    const observer = new ResizeObserver(mount);
    observer.observe(host);
    return () => { observer.disconnect(); engineRef.current?.destroy(); engineRef.current = null; host.replaceChildren(); };
  }, [print, single, reduce, lang]);
  const sheets = [
    <div className="editorial-cover"><span className="editorial-kicker">{editorialText("PORTFÓLIO / VOL. 01 / 2026")}</span><h2>{editorialText("Ideias que")}<br />{editorialText("ganham")}<br /><em>{editorialText("vida.")}</em></h2><img src={portrait} alt="Thalles Enrick" /><div className="editorial-cover-name"><strong>Thalles Enrick</strong><span>UX / UI DESIGNER & FRONT-END</span></div></div>,
    <div className="editorial-text-page"><span className="editorial-kicker">{editorialText("01 / UM POUCO SOBRE MIM")}</span><h2>{editorialText("Além")}<br />{editorialText("das telas.")}</h2><p className="editorial-lead">{editorialText("Conecto pesquisa, design e código para criar experiências que fazem sentido para quem usa.")}</p><p>{editorialText("Sou Thalles Enrick. Meu trabalho aproxima o contexto das pessoas das decisões de produto, da organização da informação ao comportamento de uma interface.")}</p><div className="editorial-columns"><div><h3>{editorialText("UX & pesquisa")}</h3><p>{editorialText("Usabilidade, arquitetura da informação e fluxos como direção para o desenho.")}</p></div><div><h3>{editorialText("UI & código")}</h3><p>{editorialText("Interfaces, componentes e interações. React, Tailwind CSS e JavaScript para dar vida às ideias.")}</p></div></div><span className="editorial-big-number">01—06</span><small>{editorialText("Uma seleção de projetos, sistemas e experiências.")}</small></div>,
    ...projects.map((project, index) => <div className="editorial-project"><span className="editorial-kicker">{editorialText("PROJETO")}{String(index + 1).padStart(2, "0")} / {project.category}</span><h2>{project.title}</h2><p className="editorial-lead">{lang==="es" ? spanish(project.descriptionEn) : project.description}</p><div className={`editorial-project-image editorial-tone-${project.tone}`}><img src={project.gallery?.[0] || project.image} alt={`Interface do projeto ${project.title}`} /></div><div className="editorial-project-footer"><span>{editorialText("DO CONTEXTO À INTERFACE")}</span>{project.detailPath ? print ? <span>{editorialText("Projeto no portf?lio digital")}</span> : <Link to={project.detailPath}>{editorialText("Conheça o projeto ↗")}</Link> : <span>{editorialText("Exploração de interface")}</span>}</div></div>),
    <div className="editorial-text-page"><span className="editorial-kicker">{editorialText("02 / PROCESSO CRIATIVO")}</span><h2>{editorialText("Do rascunho")}<br />{editorialText("à experiência.")}</h2><p className="editorial-lead">{editorialText("O caminho importa tanto quanto a chegada.")}</p>{[{title:editorialText("Escutar"), text:editorialText("Entender contexto, necessidades e restrições antes de buscar uma resposta visual.")},{title:editorialText("Estruturar"),text:editorialText("Organizar informação e fluxos. Usar o rascunho para tornar a conversa concreta.")},{title:editorialText("Experimentar"),text:editorialText("Aproximar a ideia da interação com protótipos, estados e feedback.")},{title:editorialText("Refinar & construir"),text:editorialText("Revisar usabilidade e consistência. Conectar design e desenvolvimento com componentes e documentação.")}].map((step,index)=><div key={step.title} className="editorial-step"><span>0{index+1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></div>)}</div>,
    <div className="editorial-contact"><span className="editorial-kicker">{editorialText("CONTATO / PRÓXIMO CAPÍTULO")}</span><h2>{editorialText("Vamos criar")}<br /><em>{editorialText("algo juntos?")}</em></h2><p>{editorialText("Pesquisa, design e código.")}<br />{editorialText("Uma conversa pode ser o começo.")}</p><a href="mailto:thallesenrick9@gmail.com">thallesenrick9@gmail.com</a><a href="https://www.linkedin.com/in/thallesenrick/">linkedin.com/in/thallesenrick</a><a href="https://wa.me/5588999463821">WhatsApp · (88) 9 9946-3821</a><strong>Thalles Enrick</strong><small>{editorialText("PORTFÓLIO / EDIÇÃO 2026")}</small></div>,
  ];
  const stride = single ? 1 : 2;
  const last = Math.floor((sheets.length - 1) / stride) * stride;
  const previous = () => { if (page === 0 || turning) return; if (reduce) engineRef.current?.turnToPrevPage(); else engineRef.current?.flipPrev("bottom"); };
  const next = () => { if (page >= last || turning) return; if (reduce) engineRef.current?.turnToNextPage(); else engineRef.current?.flipNext("bottom"); };
  return <section className={`portfolio-reader ${print ? "portfolio-print" : ""}`} aria-labelledby="portfolio-title">
    <header className="portfolio-reader-heading"><Link to="/">{editorialText("← Voltar ao site")}</Link><span><BookOpen size={16} /> {editorialText("EDIÇÃO DIGITAL")}</span><div className="portfolio-reader-intro"><h1 id="portfolio-title">{editorialText("Um portfólio para folhear.")}</h1><p>{editorialText("Projetos e ideias em uma edição editorial. Leia por aqui ou leve o PDF com você.")}</p></div><a className="portfolio-download" href="/portfolio/thalles-enrick-portfolio.pdf" download><Download size={17} /> {editorialText("Baixar revista em PDF")}</a></header>
    <div ref={bookRef} className={print ? "portfolio-book" : "portfolio-flip-stage"} tabIndex={0} aria-label="Páginas do portfólio. Use as setas para folhear." onKeyDown={event=>{if(event.key==="ArrowRight"){event.preventDefault();next();}if(event.key==="ArrowLeft"){event.preventDefault();previous();}}}>
      {print && sheets.map((sheet,index)=><article key={index} className={`editorial-sheet ${index === 0 ? "is-cover" : ""}`}><div className="editorial-sheet-content">{sheet}</div><footer><span>{editorialText("THALLES ENRICK / PORTFÓLIO")}</span><span>{String(index+1).padStart(2,"0")}</span></footer></article>)}
    </div>
    {!print && <div ref={sourceRef} className="portfolio-page-source" hidden>{sheets.map((sheet,index)=><article key={index} className={`editorial-sheet ${index === 0 ? "is-cover" : ""}`} aria-label={`Página ${index+1} de ${sheets.length}`}><div className="editorial-sheet-content">{sheet}</div><footer><span>{editorialText("THALLES ENRICK / PORTFÓLIO")}</span><span>{String(index+1).padStart(2,"0")}</span></footer></article>)}</div>}
    <nav className="portfolio-pagination" aria-label="Navegar na revista"><button onMouseDown={event=>event.preventDefault()} onClick={previous} disabled={page===0 || turning} aria-label="Página anterior"><ArrowLeft size={18} /> {editorialText("Anterior")}</button><span aria-live="polite">{page+1}{!single ? `–${Math.min(page+2,sheets.length)}` : ""} / {sheets.length}</span><button onMouseDown={event=>event.preventDefault()} onClick={next} disabled={page>=last || turning} aria-label="Próxima página">{editorialText("Próxima")}<ArrowRight size={18} /></button></nav>
  </section>;
}
