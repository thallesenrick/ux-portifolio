import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi"; // <- seta fina
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import { useI18n } from "../../lib/i18n";

const flags = {
  pt: { label: "Português", src: "https://wallpaperaccess.com/full/4212347.jpg" },
  en: { label: "English", src: "https://static.vecteezy.com/ti/vetor-gratis/p2/13481641-bandeira-ondulada-dos-estados-unidos-eua-vetor.jpg" },
  es: { label: "Español", src: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg" },
};

export default function LangDropdown() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, width: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({ x: rect.left, y: rect.bottom + 5, width: rect.width });
    }
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      gsap.to(listRef.current, {
        opacity: open ? 1 : 0,
        scale: open ? 1 : 0.9,
        y: open ? 0 : -10,
        pointerEvents: open ? "auto" : "none",
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!buttonRef.current?.contains(e.target) && !listRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Botão principal */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((p) => !p)}
        className="relative flex items-center h-9 gap-2 px-1  rounded-md bg-transparent border border-white/30 hover:border-amber-500 dark:hover:border-blue-500 transition z-[999]"
      >
        <img src={flags[lang].src} alt={flags[lang].label} className="w-9 h-6 rounded-sm object-cover" />
        <FiChevronDown
          size={55}
          className={`transition-transform duration-200 text-white ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown */}
      {createPortal(
        <div
          ref={listRef}
          className="fixed bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 rounded-md shadow-lg flex flex-row overflow-hidden z-[9999]"
          style={{
            top: coords.y,
            left: coords.x,
            minWidth: coords.width,
            transformOrigin: "top center",
            opacity: 0,
            transform: "scale(0.9)",
          }}
        >
          {Object.entries(flags).map(([key, { label, src }]) => (
            <button
              key={key}
              onClick={() => {
                setLang(key);
                setOpen(false);
              }}
              className={`flex items-center gap-1 px-1.5 py-2 hover:bg-white/20 transition ${
                lang === key ? " text-white" : "text-white"
              }`}
            >
              <img src={src} alt={label} className={`w-8 h-6 rounded-sm object-cover ${
                lang === key ? "border-2 border-amber-500 dark:border-blue-500 text-white" : "text-white"
              }`}
               />
         
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
