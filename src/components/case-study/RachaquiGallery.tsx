import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, GitBranch, Grid2X2, Images, Layers3, Maximize2, Minimize2, Play, X } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import { copy, type CaseCopy, type CaseScreen } from "../../data/case-study";
import { /* rachaquiFigma, */ rachaquiJourney, rachaquiScreens } from "../../data/rachaqui";
import ordersDetail from "../../assets/projects/rachaqui/motion-source/split-4.png";
import closing from "../../assets/projects/rachaqui/motion-source/table-2.png";
import "./RachaquiGallery.css";

type Category = "screens" | "flows" | "guides" | "motion";
type Item = { id: string; category: Category; label: CaseCopy; screen?: CaseScreen; flow?: "journey" | "split" };
const categories: { id: Category; label: CaseCopy; icon: typeof Images }[] = [
  { id: "screens", label: copy("Telas", "Screens"), icon: Images },
  { id: "flows", label: copy("Fluxogramas", "Flowcharts"), icon: GitBranch },
  { id: "guides", label: copy("Guias & estilos", "Guides & styles"), icon: Layers3 },
  { id: "motion", label: copy("Em movimento", "In motion"), icon: Play },
];
const screens = ["home", "create", "room", "individual", "orders", "bill", "loginLight", "loginDark", "profileLight", "profileDark"] as const;
const items: Item[] = [
  ...screens.map(id => ({ id, category: "screens" as const, label: rachaquiScreens[id].label, screen: rachaquiScreens[id] })),
  { id: "orders-detail", category: "screens", label: copy("Pedidos e participantes em detalhe", "Orders and participants in detail"), screen: { src: ordersDetail, label: copy("Pedidos e participantes em detalhe", "Orders and participants in detail"), width: 430, height: 932 } },
  { id: "closing", category: "screens", label: copy("Confirmação de encerramento", "Closing confirmation"), screen: { src: closing, label: copy("Confirmação de encerramento", "Closing confirmation"), width: 430, height: 932 } },
  { id: "journey-flow", category: "flows", label: copy("Jornada da sala compartilhada", "Shared room journey"), flow: "journey" },
  { id: "split-flow", category: "flows", label: copy("Lógica da divisão por item", "Per-item splitting logic"), flow: "split" },
  { id: "concept", category: "guides", label: rachaquiScreens.guide.label, screen: rachaquiScreens.guide },
  { id: "style-guide", category: "guides", label: rachaquiScreens.system.label, screen: rachaquiScreens.system },
  { id: "split-motion", category: "motion", label: copy("Da mesa aos pedidos", "From table to orders"), screen: rachaquiScreens.splitMotion },
  { id: "table-motion", category: "motion", label: copy("Conferência da comanda", "Bill review"), screen: rachaquiScreens.tableMotion },
];

function Flow({ kind, compact = false }: { kind: "journey" | "split"; compact?: boolean }) {
  const { lang } = useI18n();
  const nodes = kind === "journey" ? rachaquiJourney.map(step => ({ title: step.title, body: step.decision })) : [
    { title: copy("Adicionar item", "Add item"), body: copy("Registrar o pedido e seu valor.", "Record the order and its amount.") },
    { title: copy("Identificar o consumo", "Identify consumption"), body: copy("Individual: uma pessoa. Compartilhado: selecionar quem consumiu.", "Individual: one person. Shared: select everyone who consumed it.") },
    { title: copy("Calcular as partes", "Calculate shares"), body: copy("Dividir o valor em centavos entre os participantes selecionados.", "Split the amount in cents among the selected participants.") },
    { title: copy("Atualizar os totais", "Update totals"), body: copy("Somar a parte de cada item ao consumo individual.", "Add each item's share to individual consumption.") },
    { title: copy("Conferir a comanda", "Review bill"), body: copy("A soma das partes deve corresponder ao total da mesa.", "The sum of the shares must match the table total.") },
  ];
  return <ol className={"rq-gallery-flow " + (compact ? "is-compact" : "")} aria-label={kind === "journey" ? (lang === "pt" ? "Fluxo da jornada" : "Journey flow") : (lang === "pt" ? "Fluxo do rateio" : "Splitting flow")}>{nodes.map((node, index) => <li key={index}><span className="rq-gallery-flow-number">{index === nodes.length - 1 ? <Check size={compact ? 10 : 16} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{node.title[lang]}</strong>{!compact && <p>{node.body[lang]}</p>}</div>{index < nodes.length - 1 && <ArrowRight className="rq-gallery-flow-arrow" size={compact ? 10 : 17} />}</li>)}</ol>;
}

function GalleryContent({ initialScreen, onClose }: { initialScreen: CaseScreen; onClose: () => void }) {
  const { lang } = useI18n();
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
  return <dialog ref={dialog} className="rq-gallery-dialog" aria-labelledby="rq-gallery-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (!selected || event.target instanceof HTMLInputElement) return; if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); } if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); } }}>
    <div className="rq-gallery-shell">
      <header className="rq-gallery-header"><div className="rq-gallery-brand"><span className="rq-gallery-mark"><Layers3 size={23} /></span><div><span>RACHAQUI / {t("CADERNO DO PROJETO", "PROJECT NOTEBOOK", "CUADERNO DEL PROYECTO")}</span><h2 id="rq-gallery-title">{t("O produto, por inteiro.", "The complete product.", "El producto completo.")}</h2></div></div><button className="rq-gallery-close" type="button" onClick={onClose} aria-label={t("Fechar galeria", "Close gallery", "Cerrar galería")}><X size={21} /></button></header>
      <nav className="rq-gallery-tabs" aria-label={t("Categorias da galeria", "Gallery categories", "Categorías de la galería")}>{[{ id: "all" as const, label: copy("Todos", "All"), icon: Grid2X2 }, ...categories].map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={filter === id} onClick={() => { setFilter(id); setSelected(null); setZoomed(false); if (content.current) content.current.scrollTop = 0; }}><Icon size={15} /><span>{label[lang]}</span><small>{id === "all" ? items.length : items.filter(item => item.category === id).length}</small></button>)}</nav>
      <div ref={content} className="rq-gallery-content">
        {selected ? <><div className="rq-gallery-detail-toolbar"><button ref={back} type="button" onClick={gallery}><ArrowLeft size={16} />{t("Voltar à galeria", "Back to gallery", "Volver a la galería")}</button><span>{String(activeIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}</span><div>{selected.screen && <button type="button" onClick={() => setZoomed(value => !value)} aria-label={zoomed ? t("Ajustar à janela", "Fit to window", "Ajustar a la ventana") : t("Ampliar imagem", "Zoom image", "Ampliar imagen")}>{zoomed ? <Minimize2 size={17} /> : <Maximize2 size={17} />}</button>}<button type="button" onClick={() => navigate(-1)} aria-label={t("Conteúdo anterior", "Previous item", "Contenido anterior")}><ChevronLeft size={19} /></button><button type="button" onClick={() => navigate(1)} aria-label={t("Próximo conteúdo", "Next item", "Siguiente contenido")}><ChevronRight size={19} /></button></div></div>
        <figure className="rq-gallery-detail"><div className={"rq-gallery-detail-stage " + (zoomed ? "is-zoomed" : "")}>{selected.flow ? <Flow kind={selected.flow} /> : selected.screen && <img key={selected.id} src={selected.screen.src} alt={selected.label[lang]} width={selected.screen.width} height={selected.screen.height} />}</div><figcaption><div><span>{categories.find(category => category.id === selected.category)?.label[lang]}</span><h3>{selected.label[lang]}</h3></div>{selected.screen && <a href={selected.screen.src} target="_blank" rel="noopener noreferrer">{t("Abrir arquivo", "Open file", "Abrir archivo")}<ArrowUpRight size={16} /></a>}</figcaption></figure>
        <div className="rq-gallery-filmstrip" aria-label={t("Mais conteúdos", "More content", "Más contenido")}>{filtered.map(item => <button key={item.id} type="button" aria-pressed={item.id === selected.id} onClick={() => open(item)}>{item.flow ? <GitBranch size={24} /> : <img src={item.category === "motion" ? item.id === "split-motion" ? rachaquiScreens.splitPoster.src : rachaquiScreens.tablePoster.src : item.screen?.src} alt="" loading="lazy" />}<span>{item.label[lang]}</span></button>)}</div></> : <><div className="rq-gallery-intro"><p>{t("Da primeira tela às decisões de produto. Explore as interfaces, percorra os fluxos e veja os fundamentos que conectam a experiência.", "From the first screen to product decisions. Explore the interfaces, follow the flows and see the foundations behind the experience.", "Desde la primera pantalla hasta las decisiones de producto. Explora las interfaces, los flujos y las bases de la experiencia.")}</p>{/* Temporarily hidden: <a href={rachaquiFigma} target="_blank" rel="noopener noreferrer">{t("Explorar no Figma", "Explore in Figma", "Explorar en Figma")}<ArrowUpRight size={15} /></a> */}</div>
        {categories.filter(category => filter === "all" || filter === category.id).map(({ id, label, icon: Icon }) => <section className="rq-gallery-section" key={id} aria-label={label[lang]}><div className="rq-gallery-section-title"><Icon size={18} /><h3>{label[lang]}</h3><span>{items.filter(item => item.category === id).length.toString().padStart(2, "0")}</span></div><div className={"rq-gallery-grid rq-gallery-grid--" + id}>{items.filter(item => item.category === id).map((item, index) => <button data-gallery-item={item.id} type="button" className={"rq-gallery-card " + (item.screen?.src === initialScreen.src ? "is-origin" : "")} key={item.id} onClick={() => open(item)}><div className="rq-gallery-card-art">{item.flow ? <Flow kind={item.flow} compact /> : <img src={item.category === "motion" ? item.id === "split-motion" ? rachaquiScreens.splitPoster.src : rachaquiScreens.tablePoster.src : item.screen?.src} alt={item.label[lang]} loading="lazy" width={item.screen?.width} height={item.screen?.height} />}<span className="rq-gallery-card-open">{id === "motion" ? <Play size={17} /> : <Maximize2 size={17} />}</span></div><div className="rq-gallery-card-label"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label[lang]}</strong><ArrowUpRight size={15} /></div></button>)}</div></section>)}
        </>}
      </div><footer className="rq-gallery-footer"><span><span />{t("PESQUISA, DESIGN E INTERAÇÃO", "RESEARCH, DESIGN AND INTERACTION", "INVESTIGACIÓN, DISEÑO E INTERACCIÓN")}</span><span>Thalles Enrick <span aria-hidden="true">↗</span></span></footer>
    </div>
  </dialog>;
}

export default function RachaquiGallery({ screen, onClose }: { screen: CaseScreen | null; onClose: () => void }) {
  return screen ? <GalleryContent initialScreen={screen} onClose={onClose} /> : null;
}
