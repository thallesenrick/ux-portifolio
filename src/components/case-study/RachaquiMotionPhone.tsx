import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import type { CaseScreen } from "../../data/case-study";

export default function RachaquiMotionPhone({ screen, poster, videoSrc, playing, onOpen, className = "" }: {
  screen: CaseScreen; poster: CaseScreen; videoSrc: string; playing: boolean; onOpen: (screen: CaseScreen) => void; className?: string;
}) {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const position = useRef<HTMLDivElement>(null), video = useRef<HTMLVideoElement>(null);
  const visible = useInView(position, { amount: .1 });
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => { const update = () => setHidden(document.hidden); document.addEventListener("visibilitychange", update); return () => document.removeEventListener("visibilitychange", update); }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (playing && !reduced && visible && !hidden) void element.play().catch(() => undefined);
    else element.pause();
  }, [playing, reduced, visible, hidden]);
  const label = lang === "pt" ? "Abrir galeria do RachAqui: " : lang === "es" ? "Abrir galería de RachAqui: " : "Open RachAqui gallery: ";
  return <div ref={position} className={"ph-phone-position " + className}><button type="button" className="ph-phone" onClick={() => onOpen(screen)} aria-label={label + screen.label[lang]}><video ref={video} src={videoSrc} poster={poster.src} width="430" height="932" muted playsInline loop preload={reduced ? "none" : "metadata"} aria-hidden="true" /><span className="ph-phone-notch" aria-hidden="true" /><span className="ph-phone-expand" aria-hidden="true"><Expand size={16} /></span></button></div>;
}
