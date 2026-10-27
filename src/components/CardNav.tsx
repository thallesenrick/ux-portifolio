import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../lib/theme-context";
import { useI18n } from "../lib/i18n-context";
import { projects } from "../data/projects";
import ProjectPreview from "./commun/ProjectPreview";
import LanguageSelector from "./ui/LanguageSelector";
import { useHeroAccent } from "../lib/hero-accent-context";
import "./CardNav.css";

export default function CardNav({ logo }: { logo: string }) {
  const { theme, toggle } = useTheme();
  const { selected } = useHeroAccent();
  const { t, lang } = useI18n();
  const pt = lang === "pt";
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === location.key;
  const [previewIndex,setPreviewIndex]=useState(0);
  const preview=projects[previewIndex];
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpenAt(null);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setOpenAt(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpenAt(null); triggerRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);

  return (
    <nav ref={navRef} style={{"--hero-accent":selected.color,"--hero-accent-ink":selected.ink} as CSSProperties} className={`top-navigation ${location.pathname === "/" ? "is-sketch-nav" : ""} ${open ? "is-open" : ""}`} aria-label={pt ? "Navegação principal" : "Main navigation"} onBlur={(event) => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) close(); }}>
      <div className="top-navigation-bar">
        <Link to="/" className="nav-brand" onClick={close} aria-label="Thalles Enrick - Home"><span><img src={logo} alt="" /></span><strong>thalles<span>enrick.</span></strong></Link>
        <div className="nav-desktop-links">
          <NavLink end to="/" onClick={close}>{t.navHome}</NavLink>
          <NavLink to="/about" onClick={close}>{t.navAbout}</NavLink>
        </div>
        <button ref={triggerRef} type="button" className="nav-project-trigger" aria-expanded={open} aria-label={open ? (pt ? "Fechar projetos" : "Close projects") : (pt ? "Abrir projetos" : "Open projects")} aria-controls="nav-project-panel" onClick={() => setOpenAt(open ? null : location.key)}>
          <span className="nav-trigger-desktop">{t.navProjects}</span><span className="nav-trigger-mobile">{open ? <X size={18} /> : <Menu size={18} />}</span><ChevronDown className="nav-trigger-chevron" size={14} />
        </button>
        <div className="nav-controls">
          <LanguageSelector />
          <button type="button" className="nav-theme" onClick={toggle} aria-label={pt ? "Alternar tema" : "Toggle theme"}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
          <Link to="/contact" onClick={close} className="nav-contact">{pt ? "Vamos conversar" : "Let's talk"}<ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && <motion.div id="nav-project-panel" className="nav-project-panel" initial={reducedMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reducedMotion ? 0 : .28 }}>
          <div className="nav-panel-content">
            <div className="nav-mobile-links"><Link to="/" onClick={close}>{t.navHome}</Link><Link to="/about" onClick={close}>{t.navAbout}</Link><Link to="/contact" onClick={close}>{t.navContact}</Link></div>
            <div className="nav-panel-heading"><div><span>{pt ? "CADERNO DE PROJETOS" : "PROJECT SKETCHBOOK"} / {String(projects.length).padStart(2,"0")}</span><h2>{pt ? "Ideias em movimento." : "Ideas in motion."}</h2></div><Link to="/projects" onClick={close}>{pt ? "Explorar todos" : "Explore all"}<ArrowUpRight size={16} /></Link></div>
            <div className="nav-notebook-layout">
              <Link className="nav-featured-project" to={preview.detailPath || `/projects#${preview.id}`} onClick={close}>
                <div className="nav-featured-art"><span className="nav-featured-note">{pt ? "um olhar mais perto" : "take a closer look"}</span><AnimatePresence initial={false}>{preview.image ? <motion.img key={preview.id} src={preview.image} alt="" initial={{opacity:0,scale:reducedMotion ? 1 : .98}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:reducedMotion ? 0 : .25}} /> : <div className="nav-featured-fallback"><ProjectPreview tone={preview.tone} /></div>}</AnimatePresence><span className="nav-featured-corner"><ArrowUpRight size={21} strokeWidth={1.2} /></span></div>
                <div className="nav-featured-caption"><div><span>{preview.category}</span><h3>{preview.title}</h3></div><span className="nav-featured-detail">{pt ? "Ver projeto" : "View project"}<ArrowUpRight size={15} /></span></div>
              </Link>
              <div className="nav-notebook-list"><p>{pt ? "Escolha uma ideia para explorar" : "Pick an idea to explore"}</p>{projects.map((project,index)=><Link key={project.id} className="nav-notebook-item" data-preview-active={previewIndex===index} to={project.detailPath || `/projects#${project.id}`} onClick={close} onPointerEnter={event=>{if(event.pointerType==="mouse")setPreviewIndex(index);}} onFocus={()=>setPreviewIndex(index)}>
                <span className="nav-notebook-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><span className="nav-notebook-thumbnail">{project.image ? <img src={project.image} alt="" loading="lazy" /> : <ProjectPreview tone={project.tone} />}</span><span className="nav-notebook-item-copy"><strong>{project.title}</strong><small>{project.category}</small></span><ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
              </Link>)}</div>
            </div>
            <div className="nav-panel-footer"><span>{pt ? "Pesquisa, design e código. Do início ao detalhe." : "Research, design and code. From start to detail."}</span><Link to="/contact" onClick={close}>{pt ? "Seu projeto pode ser o próximo" : "Your project could be next"}<ArrowUpRight size={14} /></Link></div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </nav>
  );
}
