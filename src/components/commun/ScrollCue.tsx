import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Mouse } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../../lib/i18n-context";
import "./ScrollCue.css";

export default function ScrollCue() {
  const { lang } = useI18n();
  const { pathname, search } = useLocation();
  const button = useRef<HTMLButtonElement>(null);
  const [idle, setIdle] = useState(false);
  const [position, setPosition] = useState({ scrollable: false, bottom: false });
  useEffect(() => {
    let timer: number;
    const measure = () => {
      const end = document.documentElement.scrollHeight - window.innerHeight;
      const bottom = end > 80 && window.scrollY >= end - 48;
      setPosition(current => current.scrollable === (end > 80) && current.bottom === bottom ? current : { scrollable: end > 80, bottom });
    };
    const activity = (event?: Event) => {
      if (event?.target instanceof Node && button.current?.contains(event.target)) return;
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { if (!document.hidden) setIdle(true); }, 5000);
    };
    const scroll = (event: Event) => { measure(); activity(event); };
    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "visibilitychange"];
    events.forEach(event => document.addEventListener(event, activity, { passive: true }));
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    measure(); activity();
    return () => {
      window.clearTimeout(timer); observer.disconnect();
      events.forEach(event => document.removeEventListener(event, activity));
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", measure);
    };
  }, [pathname]);
  const visible = position.scrollable && (idle || position.bottom);
  const label = position.bottom ? { pt: "Voltar ao topo", en: "Back to top", es: "Volver arriba" }[lang] : { pt: "Role para descobrir", en: "Scroll to discover", es: "Desplázate para descubrir" }[lang];
  if (new URLSearchParams(search).get("print") === "1") return null;
  return <button ref={button} type="button" className={`scroll-cue ${visible ? "is-visible" : ""} ${position.bottom ? "is-at-bottom" : ""}`} tabIndex={visible ? 0 : -1} aria-hidden={!visible} aria-label={label} onClick={() => {
    setIdle(false);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (position.bottom) window.scrollTo({ top: 0, behavior });
    else window.scrollBy({ top: window.innerHeight * .75, behavior });
  }}><span className="scroll-cue-symbol" aria-hidden="true">{position.bottom ? <ArrowUp size={23} strokeWidth={1.5} /> : <><Mouse size={24} strokeWidth={1.3} /><ArrowDown size={13} strokeWidth={1.3} /></>}</span><span>{label}</span></button>;
}
