// src/components/commum/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../lib/theme";
import { useI18n } from "../../lib/i18n";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 dark:bg-black/20 backdrop-blur-md z-50 border-b border-white/10 transition-colors">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO + LINKS */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold text-cyan-500 dark:text-cyan-400"
          >
            {t.siteName}
          </Link>

          <ul className="hidden md:flex gap-6 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                className={`hover:text-cyan-500 transition ${
                  location.pathname === "/" ? "px-6 py-2 rounded-full bg-sky-100/50 text-cyan-500 dark:bg-amber-100/20 dark:text-amber-500" : ""
                }`}
                to="/"
              >
                {t.navHome}
              </Link>
            </li>
            <li>
              <Link
                className={`hover:text-cyan-500 transition ${
                  location.pathname === "/about" ? "text-cyan-500" : ""
                }`}
                to="/about"
              >
                {t.navAbout}
              </Link>
            </li>
            <li>
              <Link
                className={`hover:text-cyan-500 transition ${
                  location.pathname === "/projects" ? "text-cyan-500" : ""
                }`}
                to="/projects"
              >
                {t.navProjects}
              </Link>
            </li>
            <li>
              <Link
                className={`hover:text-cyan-500 transition ${
                  location.pathname === "/contact" ? "text-cyan-500" : ""
                }`}
                to="/contact"
              >
                {t.navContact}
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTROLES */}
        <div className="flex items-center gap-3">
          {/* LANGUAGE FLAGS */}
          <div className="flex items-center gap-2">
            <button
              title="Português"
              onClick={() => setLang("pt")}
              className={`w-7 h-7 flex items-center justify-center rounded-lg border transition ${
                lang === "pt"
                  ? "border-cyan-400 ring-2 ring-cyan-400"
                  : "border-transparent hover:border-cyan-400/50"
              }`}
            >
              <img src="https://wallpaperaccess.com/full/4212347.jpg" alt="" />
            </button>
            <button
              title="English"
              onClick={() => setLang("en")}
              className={`w-7 h-7 flex items-center justify-center rounded-full border transition ${
                lang === "en"
                  ? "border-cyan-400 ring-2 ring-cyan-400"
                  : "border-transparent hover:border-cyan-400/50"
              }`}
            >
               <img src="https://static.vecteezy.com/ti/vetor-gratis/p2/13481641-bandeira-ondulada-dos-estados-unidos-eua-vetor.jpg" alt="" />
            </button>
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={toggle}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          {/* CTA */}
          <Link
            to="/contact"
            className="ml-3 px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
          >
            {t.navContact}
          </Link>
        </div>
      </div>
    </nav>
  );
}
