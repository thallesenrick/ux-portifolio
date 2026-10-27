import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../lib/theme-context";
import { useI18n } from "../lib/i18n-context";
import { projects } from "../data/projects";
import ProjectCard from "./commun/ProjectCard";
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
            <div className="nav-sketch-project-grid">{projects.map((project,index)=><ProjectCard key={project.id} project={project} index={index} compact onNavigate={close} />)}</div>
            <div className="nav-panel-footer"><span>{pt ? "Pesquisa, design e código. Do início ao detalhe." : "Research, design and code. From start to detail."}</span><Link to="/contact" onClick={close}>{pt ? "Seu projeto pode ser o próximo" : "Your project could be next"}<ArrowUpRight size={14} /></Link></div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </nav>
  );
}
