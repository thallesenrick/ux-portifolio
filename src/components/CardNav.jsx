// src/components/CardNav.jsx
import { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/theme";
import { useI18n } from "../lib/i18n";
import "./CardNav.css";
import LanguageSelector from "../components/ui/LanguageSelector";

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items = [],
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (contentEl) {
        contentEl.style.visibility = "visible";
        contentEl.style.height = "auto";
        const height = contentEl.scrollHeight + 100;
        contentEl.style.visibility = "";
        contentEl.style.height = "";
        return height;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} ${
          theme === "dark" ? "dark" : ""
        }`}
        style={{
          backgroundColor:
            theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
          backdropFilter: "blur(2px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="card-nav-top">
          {/* LOGO AGORA À ESQUERDA */}
          <div className="logo-container ml-5 -mt-0.5 bg-amber-500  dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 w-16 h-12 flex items-center justify-center rounded-xl">
            <img src={logo} alt={logoAlt} className="logo" />
          </div>

          {/* LINKS CENTRAIS */}
          <ul className="hidden md:flex w-full justify-center items-center gap-8 text-sm font-medium">
            <li>
              <Link
                to="/"
                className={`hover:text-white transition ${
                  location.pathname === "/" ? "bg-amber-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 px-8 py-3 rounded-lg text-white" : ""
                }`}
              >
                {t.navHome}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`hover:text-white transition ${
                  location.pathname === "/about" ? "bg-amber-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 px-8 py-3 rounded-lg text-white" : ""
                }`}
              >
                {t.navAbout}
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`hover:text-white transition ${
                  location.pathname === "/projects" ? "bg-amber-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 px-8 py-3 rounded-lg text-white" : ""
                }`}
              >
                {t.navProjects}
              </Link>
            </li>
             <li>
              <Link
                to="/contact"
                className={`hover:text-white transition ${
                  location.pathname === "/contact" ? "bg-amber-600 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 px-8 py-3 rounded-lg text-white" : ""
                }`}
              >
                {t.navContact}
              </Link>
            </li>
        
          </ul>

          {/* CONTROLES + HAMBÚRGUER */}
          <div className="flex items-center gap-3 w-10 absolute right-44">
            {/* BANDEIRAS  */}
            <LanguageSelector />
           

            {/* DARK/LIGHT MODE */}
           <button
      onClick={toggle}
      className="relative !w-40 px-8 h-9  flex items-center rounded-lg p-1 transition-colors duration-300
                 bg-white/0 dark:bg-gray-800 border border-white/40 hover:border-amber-500 dark:hover:border-blue-500"
      aria-label="Alternar tema"
    >
  
      <span
        className={`absolute top-1 left-1 w-7 h-[27px] rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 dark:bg-gradient-to-br dark:from-blue-400 dark:to-indigo-600
                    shadow-md transform transition-transform duration-300
                    ${theme === "dark" ? "translate-x-7" : "translate-x-0"}`}
      />

      <Sun
        size={14}
        className={`absolute left-[10px] top-[10px] text-white transition-opacity duration-300 ${
          theme === "dark" ? "opacity-100 text-white/50 hover:text-white/100" : "opacity-100"
        }`}
      />
      <Moon
        size={14}
        className={`absolute right-[10px] top-[10px] text-white transition-opacity duration-300   ${
          theme === "dark" ? "opacity-100" : "opacity-100 text-white/50 hover:text-white/100"
        }`}
      />
    </button>
    

            {/* BOTÃO DE CONTATO 
        

            {/* HAMBÚRGUER FOI MOVIDO PRA CÁ */}
            <div
              className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              tabIndex={0}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>
          </div>
        </div>

        {/* CONTEÚDO EXPANDIDO */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{
                backgroundColor: item.bgColor || "#fff",
                color: item.textColor || "#000",
              }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
