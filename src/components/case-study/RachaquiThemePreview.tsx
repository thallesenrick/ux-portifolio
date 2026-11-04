import { useState, type CSSProperties } from "react";
import { ChevronsLeftRight, Expand, Moon, Sun } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import { rachaquiScreens } from "../../data/rachaqui";
import type { CaseScreen } from "../../data/case-study";
import "./RachaquiThemePreview.css";

export default function RachaquiThemePreview({ onOpen }: { onOpen: (screen: CaseScreen) => void }) {
  const { lang } = useI18n();
  const t = (pt: string, en: string, es: string) => lang === "pt" ? pt : lang === "es" ? es : en;
  const [boundary, setBoundary] = useState(50), [profile, setProfile] = useState(false);
  const light = profile ? rachaquiScreens.profileLight : rachaquiScreens.loginLight;
  const dark = profile ? rachaquiScreens.profileDark : rachaquiScreens.loginDark;
  const valueText = `${boundary}% ${t("claro", "light", "claro")}, ${100 - boundary}% ${t("escuro", "dark", "oscuro")}`;
  return <div className="rq-product-theme rq-theme-preview" style={{ "--rq-boundary": `${boundary}%` } as CSSProperties}>

    <div className="rq-auth-tabs" role="group" aria-label={t("Etapa de acesso", "Access stage", "Etapa de acceso")}><button type="button" aria-pressed={!profile} onClick={() => setProfile(false)}>Login</button><button type="button" aria-pressed={profile} onClick={() => setProfile(true)}>{t("Personalização", "Personalization", "Personalización")}</button></div>
    <div className="rq-comparison-labels"><span><Sun size={15} />{t("Claro", "Light", "Claro")}</span><span><Moon size={15} />{t("Escuro", "Dark", "Oscuro")}</span></div>
    <div className="rq-comparison-phone"><img src={light.src} alt={light.label[lang]} width="430" height="932" loading="lazy" /><img className="rq-comparison-dark" src={dark.src} alt={dark.label[lang]} width="430" height="932" loading="lazy" style={{ clipPath: `inset(0 0 0 ${boundary}%)` }} /><span className="rq-comparison-notch" aria-hidden="true" /><span className="rq-comparison-divider" aria-hidden="true"><i><ChevronsLeftRight size={19} /></i></span><input type="range" min="0" max="100" step="1" value={boundary} onChange={event => setBoundary(Number(event.target.value))} aria-label={t("Comparar tema claro e escuro", "Compare light and dark themes", "Comparar temas claro y oscuro")} aria-valuetext={valueText} /></div>
    <div className="rq-comparison-note"><svg viewBox="0 0 64 45" fill="none" aria-hidden="true"><path d="M3 39Q39 45 50 6M39 10L51 3L59 17" /></svg><span>{t("Arraste e mude a luz.", "Drag to change the light.", "Arrastra y cambia la luz.")}</span></div>
    <button className="ph-text-button rq-comparison-gallery" type="button" onClick={() => onOpen(boundary >= 50 ? light : dark)}>{t("Ver telas na galeria", "View screens in gallery", "Ver pantallas en la galería")}<Expand size={14} /></button>
  </div>;
}
