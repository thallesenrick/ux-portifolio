import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, RotateCcw, WifiOff } from "lucide-react";
import { useI18n } from "../lib/i18n-context";
import "./PageStatus.css";

const copy = {
  pt: { notFound: "Esta página saiu do mapa.", notFoundText: "O endereço pode ter mudado ou este caminho ainda não foi desenhado. Vamos voltar ao começo?", offline: "A conexão deu uma pausa.", offlineText: "Confira sua conexão. Assim que ela voltar, você pode continuar de onde parou.", error: "Não conseguimos abrir esta página.", errorText: "Pode ter ocorrido uma falha no carregamento. Tente novamente para continuar.", home: "Voltar ao início", retry: "Tentar novamente", waiting: "Ainda sem conexão. Confira sua rede e tente novamente.", note: "ATÉ OS MELHORES RASCUNHOS PEDEM UMA NOVA DIREÇÃO." },
  en: { notFound: "This page wandered off the map.", notFoundText: "The address may have changed, or this path has not been drawn yet. Let's go back to the beginning.", offline: "The connection took a pause.", offlineText: "Check your connection. Once it returns, you can pick up where you left off.", error: "We couldn't open this page.", errorText: "Something may have interrupted loading. Try again to continue.", home: "Back to home", retry: "Try again", waiting: "Still offline. Check your network and try again.", note: "EVEN THE BEST SKETCHES NEED A NEW DIRECTION." },
  es: { notFound: "Esta página se salió del mapa.", notFoundText: "La dirección puede haber cambiado o este camino todavía no está dibujado. Volvamos al principio.", offline: "La conexión hizo una pausa.", offlineText: "Revisa tu conexión. Cuando vuelva, podrás continuar donde lo dejaste.", error: "No pudimos abrir esta página.", errorText: "Algo pudo haber interrumpido la carga. Inténtalo de nuevo para continuar.", home: "Volver al inicio", retry: "Intentar de nuevo", waiting: "Todavía sin conexión. Revisa tu red e inténtalo de nuevo.", note: "HASTA LOS MEJORES BOCETOS NECESITAN OTRA DIRECCIÓN." },
};

export default function PageStatus({ mode = "not-found" }: { mode?: "not-found" | "offline" | "error" }) {
  const { lang } = useI18n();
  const text = copy[lang];
  const [waiting, setWaiting] = useState(false);
  const title = mode === "not-found" ? text.notFound : mode === "offline" ? text.offline : text.error;
  useEffect(() => {
    const previous = document.title;
    document.title = `${mode === "not-found" ? "404" : mode === "offline" ? "Offline" : "Oops"} | Thalles Enrick`;
    return () => { document.title = previous; };
  }, [mode]);
  return <section className="page-status" data-status={mode} aria-labelledby="page-status-title">
    <div className="page-status-art" aria-hidden="true"><svg viewBox="0 0 480 320" fill="none"><path className="status-paper" d="M85 38L355 30L382 259L99 277Z" /><path className="status-fold" d="M315 34L324 80L361 75M119 232Q162 165 210 208T326 160M321 146L326 160L310 165" /><path className="status-construction" d="M52 82L407 64M73 16L98 297M389 21L414 283" /><path className="status-spark" d="M51 206L31 212M59 224L42 240M395 91L421 82M397 107L426 110" /></svg><span>{mode === "not-found" ? "404" : mode === "offline" ? <WifiOff size={94} strokeWidth={1.2} /> : "?!"}</span><small>{mode === "not-found" ? "PAGE NOT FOUND" : mode === "offline" ? "OFFLINE" : "OOPS"}</small></div>
    <div className="page-status-copy"><span className="page-status-eyebrow">THALLES ENRICK / {mode === "not-found" ? "404" : mode === "offline" ? "OFFLINE" : "OOPS"}</span><h1 id="page-status-title">{title}</h1><p>{mode === "not-found" ? text.notFoundText : mode === "offline" ? text.offlineText : text.errorText}</p><div className="page-status-actions">{mode !== "not-found" && <button type="button" onClick={() => { if (!navigator.onLine) setWaiting(true); else window.location.reload(); }}><RotateCcw size={17} />{text.retry}</button>}<Link to="/"><span>{text.home}</span><ArrowUpRight size={18} /></Link></div>{waiting && <p className="page-status-waiting" role="status">{text.waiting}</p>}<small className="page-status-note">{text.note}</small></div>
  </section>;
}
