import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Grid2X2, Images, Layers3, Maximize2, Minimize2, Play, X } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import { copy, type CaseCopy, type CaseScreen } from "../../data/case-study";
import { playhubScreens } from "../../data/playhub";
import { playhubOriginals, playhubMotion } from "../../data/playhub-originals";
import "./RachaquiGallery.css";
import "./PlayhubGallery.css";

type Category = "screens" | "wireframes" | "guides" | "motion";
type Item = { id: string; category: Category; label: CaseCopy; screen: CaseScreen; poster?: string; video?: string };
const categories: { id: Category; label: CaseCopy; icon: typeof Images }[] = [
  { id: "screens", label: copy("Telas", "Screens"), icon: Images },
  { id: "wireframes", label: copy("Wireframes", "Wireframes"), icon: Grid2X2 },
  { id: "guides", label: copy("Guias & estilos", "Guides & styles"), icon: Layers3 },
  { id: "motion", label: copy("Em movimento", "In motion"), icon: Play },
];
const motionLabels = {onboarding:copy("Entrada no aplicativo", "App onboarding"),booking:copy("Da descoberta à reserva", "From discovery to booking"),payment:copy("Opções de pagamento", "Payment options")};
const items: Item[] = [
  ...playhubOriginals.map(screen=>({id:"screen-"+screen.id,category:([22,24,26,28].includes(screen.id) ? "wireframes" : "screens") as Category,label:screen.label,screen})),
  {id:"guide",category:"guides",label:playhubScreens.guide.label,screen:playhubScreens.guide},
  {id:"typography",category:"guides",label:playhubScreens.typography.label,screen:playhubScreens.typography},
  ...Object.entries(playhubMotion).map(([id,sequence])=>({id:"motion-"+id,category:"motion" as const,label:motionLabels[id as keyof typeof motionLabels],screen:{src:sequence.gif,label:motionLabels[id as keyof typeof motionLabels],width:393,height:852},poster:sequence.screens[0].src,video:sequence.video})),
];

function GalleryContent({ initialScreen, onClose }: { initialScreen: CaseScreen; onClose: () => void }) {
  const { lang } = useI18n();
  const reduced=useReducedMotion();
  const t = (pt: string, en: string, es: string) => lang === "pt" ? pt : lang === "es" ? es : en;
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Item | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null), content = useRef<HTMLDivElement>(null), back = useRef<HTMLButtonElement>(null);
  const lastCard = useRef<string | null>(null);
  const filtered = filter === "all" ? items : items.filter(item => item.category === filter);
  const activeIndex = selected ? filtered.findIndex(item => item.id === selected.id) : -1;
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => { document.body.style.overflow = previousOverflow; previousFocus?.focus({ preventScroll: true }); };
  }, []);
  function open(item: Item) { setSelected(item); setZoomed(false); lastCard.current = item.id; if (content.current) content.current.scrollTop = 0; requestAnimationFrame(() => back.current?.focus({ preventScroll: true })); }
  function gallery() { setSelected(null); setZoomed(false); requestAnimationFrame(() => dialog.current?.querySelector<HTMLButtonElement>(`[data-gallery-item="${lastCard.current}"]`)?.focus({ preventScroll: true })); }
  function navigate(direction: number) { const next = filtered[(activeIndex + direction + filtered.length) % filtered.length]; setSelected(next); setZoomed(false); }
  return <dialog ref={dialog} className="rq-gallery-dialog ph-gallery-dialog" aria-labelledby="ph-gallery-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (!selected || (event.target instanceof HTMLInputElement || event.target instanceof HTMLVideoElement)) return; if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); } if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); } }}>
    <div className="rq-gallery-shell">
      <header className="rq-gallery-header"><div className="rq-gallery-brand"><span className="rq-gallery-mark"><Layers3 size={23} /></span><div><span>PLAYHUB / {t("CADERNO DO PROJETO", "PROJECT NOTEBOOK", "CUADERNO DEL PROYECTO")}</span><h2 id="ph-gallery-title">{t("O produto, por inteiro.", "The complete product.", "El producto completo.")}</h2></div></div><button className="rq-gallery-close" type="button" onClick={onClose} aria-label={t("Fechar galeria", "Close gallery", "Cerrar galería")}><X size={21} /></button></header>
      <nav className="rq-gallery-tabs" aria-label={t("Categorias da galeria", "Gallery categories", "Categorías de la galería")}>{[{ id: "all" as const, label: copy("Todos", "All"), icon: Grid2X2 }, ...categories].map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={filter === id} onClick={() => { setFilter(id); setSelected(null); setZoomed(false); if (content.current) content.current.scrollTop = 0; }}><Icon size={15} /><span>{label[lang]}</span><small>{id === "all" ? items.length : items.filter(item => item.category === id).length}</small></button>)}</nav>
      <div ref={content} className="rq-gallery-content">
        {selected ? <><div className="rq-gallery-detail-toolbar"><button ref={back} type="button" onClick={gallery}><ArrowLeft size={16} />{t("Voltar à galeria", "Back to gallery", "Volver a la galería")}</button><span>{String(activeIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}</span><div>{selected.screen && <button type="button" onClick={() => setZoomed(value => !value)} aria-label={zoomed ? t("Ajustar à janela", "Fit to window", "Ajustar a la ventana") : t("Ampliar imagem", "Zoom image", "Ampliar imagen")}>{zoomed ? <Minimize2 size={17} /> : <Maximize2 size={17} />}</button>}<button type="button" onClick={() => navigate(-1)} aria-label={t("Conteúdo anterior", "Previous item", "Contenido anterior")}><ChevronLeft size={19} /></button><button type="button" onClick={() => navigate(1)} aria-label={t("Próximo conteúdo", "Next item", "Siguiente contenido")}><ChevronRight size={19} /></button></div></div>
        <figure className="rq-gallery-detail"><div className={"rq-gallery-detail-stage " + (zoomed ? "is-zoomed" : "")}>{selected.video ? <video key={selected.id} src={selected.video} poster={selected.poster} width="393" height="852" controls autoPlay={!reduced} loop muted playsInline aria-label={selected.label[lang]} /> : <img key={selected.id} src={selected.screen.src} alt={selected.label[lang]} width={selected.screen.width} height={selected.screen.height} />}</div><figcaption><div><span>{categories.find(category => category.id === selected.category)?.label[lang]}</span><h3>{selected.label[lang]}</h3></div>{selected.screen && <a href={selected.screen.src} target="_blank" rel="noopener noreferrer">{t("Abrir arquivo", "Open file", "Abrir archivo")}<ArrowUpRight size={16} /></a>}</figcaption></figure>
        <div className="rq-gallery-filmstrip" aria-label={t("Mais conteúdos", "More content", "Más contenido")}>{filtered.map(item => <button key={item.id} type="button" aria-pressed={item.id === selected.id} onClick={() => open(item)}>{<img src={item.poster ?? item.screen.src} alt="" loading="lazy" />}<span>{item.label[lang]}</span></button>)}</div></> : <><div className="rq-gallery-intro"><p>{t("Da primeira tela às decisões de produto. Explore as telas originais, os wireframes, os guias visuais e as animações do Playhub.", "From the first screen to product decisions. Explore the original screens, wireframes, visual guides and Playhub animations.", "Desde la primera pantalla hasta las decisiones de producto. Explora las pantallas originales, los wireframes, las guías visuales y las animaciones de Playhub.")}</p></div>
        {categories.filter(category => filter === "all" || filter === category.id).map(({ id, label, icon: Icon }) => <section className="rq-gallery-section" key={id} aria-label={label[lang]}><div className="rq-gallery-section-title"><Icon size={18} /><h3>{label[lang]}</h3><span>{items.filter(item => item.category === id).length.toString().padStart(2, "0")}</span></div><div className={"rq-gallery-grid rq-gallery-grid--" + id}>{items.filter(item => item.category === id).map((item, index) => <button data-gallery-item={item.id} type="button" className={"rq-gallery-card " + (item.screen?.src === initialScreen.src ? "is-origin" : "")} key={item.id} onClick={() => open(item)}><div className="rq-gallery-card-art">{<img src={item.poster ?? item.screen.src} alt={item.label[lang]} loading="lazy" width={item.screen.width} height={item.screen.height} />}<span className="rq-gallery-card-open">{id === "motion" ? <Play size={17} /> : <Maximize2 size={17} />}</span></div><div className="rq-gallery-card-label"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label[lang]}</strong><ArrowUpRight size={15} /></div></button>)}</div></section>)}
        </>}
      </div><footer className="rq-gallery-footer"><span><span />{t("PESQUISA, DESIGN E INTERAÇÃO", "RESEARCH, DESIGN AND INTERACTION", "INVESTIGACIÓN, DISEÑO E INTERACCIÓN")}</span><span>Thalles Enrick <span aria-hidden="true">↗</span></span></footer>
    </div>
  </dialog>;
}

export default function PlayhubGallery({ screen, onClose }: { screen: CaseScreen | null; onClose: () => void }) {
  return screen ? <GalleryContent key={screen.src} initialScreen={screen} onClose={onClose} /> : null;
}
