import { spanish } from "../../lib/spanish";
import { Expand } from "lucide-react";
import type { CaseScreen } from "../../data/case-study";
import { useI18n } from "../../lib/i18n-context";
import "./CaseDesktop.css";

export function CaseDesktop({ screen, onOpen, className = "", priority = false }: {
  screen: CaseScreen;
  onOpen: (screen: CaseScreen) => void;
  className?: string;
  priority?: boolean;
}) {
  const { lang } = useI18n();
  return <div className={"case-desktop " + className}>
    <div className="case-desktop-toolbar">
      <span className="case-desktop-dots" aria-hidden="true"><i /><i /><i /></span>
      <span>{screen.label[lang]}</span>
      <button type="button" onClick={() => onOpen(screen)} aria-label={(lang === "pt" ? "Ampliar tela: " : (lang === "es" ? spanish("Enlarge screen: ") : "Enlarge screen: ")) + screen.label[lang]}><Expand size={14} /></button>
    </div>
    <div key={screen.src} className="case-desktop-viewport" tabIndex={0} role="region" aria-label={(lang === "pt" ? "Prévia com rolagem: " : (lang === "es" ? spanish("Scrollable preview: ") : "Scrollable preview: ")) + screen.label[lang]}>
      <img src={screen.src} alt={screen.label[lang]} width={screen.width} height={screen.height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
    </div>
  </div>;
}
