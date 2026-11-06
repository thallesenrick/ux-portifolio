import { ArrowRightLeft, Heart, Layers3, Receipt, ShieldCheck, Users, Zap } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";

export function RachaquiDoodle({ kind = "spark", className = "" }: { kind?: "spark" | "loop" | "arrow"; className?: string }) {
  return <svg className={"rq-ref-doodle " + className} viewBox="0 0 100 100" fill="none" aria-hidden="true">{kind === "spark" ? <path d="M16 49L4 43M29 30L19 12M49 21L46 3M69 27L80 10" /> : kind === "loop" ? <path d="M14 75C4 49 36 9 56 22C83 40 36 66 31 42C25 17 68 8 87 20M77 9L89 20L78 31" /> : <path d="M8 72C33 87 74 62 78 24M62 35L80 17L91 39" />}</svg>;
}

export function RachaquiHeroFeatures() {
  const { lang } = useI18n();
  const labels = lang === "pt" ? ["Divida com amigos", "Cada item, sua parte", "Mais tempo juntos"] : lang === "es" ? ["Comparte con amigos", "Cada producto, tu parte", "Más tiempo juntos"] : ["Split with friends", "Every item, your share", "More time together"];
  return <div className="rq-ref-hero-features">{[Users, ArrowRightLeft, Heart].map((Icon, index) => <div key={index}><Icon size={21} strokeWidth={1.5} /><span>{labels[index]}</span></div>)}</div>;
}

export function RachaquiBillPreview() {
  const { lang } = useI18n();
  const pt = lang === "pt";
  const lines = [
    { icon: "🍟", name: pt ? "Batata para compartilhar" : lang === "es" ? "Patatas para compartir" : "Fries to share", cents: 2490 },
    { icon: "🍔", name: pt ? "Hambúrguer" : lang === "es" ? "Hamburguesa" : "Burger", cents: 3490 },
    { icon: "🍊", name: pt ? "Jarra de suco" : lang === "es" ? "Jarra de zumo" : "Juice jug", cents: 2410 },
  ];
  const money = (cents: number) => new Intl.NumberFormat(pt ? "pt-BR" : lang === "es" ? "es" : "en", { style: "currency", currency: "BRL" }).format(cents / 100);
  return <div className="rq-ref-bill-scene" aria-hidden="true"><span className="rq-ref-pie" /><div className="rq-ref-bill"><div className="rq-ref-bill-header"><div><small>{pt ? "CONTA DO GRUPO" : lang === "es" ? "CUENTA DEL GRUPO" : "GROUP BILL"}</small><strong>{pt ? "Uma mesa, boas histórias." : lang === "es" ? "Una mesa, buenas historias." : "One table, good stories."}</strong></div><span>{money(8390)}</span></div><p>{pt ? "Itens da conta" : lang === "es" ? "Productos de la cuenta" : "Bill items"}</p>{lines.map(line => <div className="rq-ref-bill-line" key={line.cents}><span>{line.icon}</span><span>{line.name}</span><strong>{money(line.cents)}</strong></div>)}<div className="rq-ref-bill-bottom"><Users size={15} /><span>{pt ? "Cada pessoa com a sua parte." : lang === "es" ? "Cada persona con su parte." : "Everyone with their own share."}</span></div></div><div className="rq-ref-checklist"><i /><span>✓</span><i /><span>✓</span><i /><span>✓</span></div><div className="rq-ref-coins"><span /><span /><span /></div></div>;
}

export function RachaquiAuthPerks() {
  const { lang } = useI18n();
  const labels = lang === "pt" ? [ ["Acesso claro", "Login e recuperação"], ["Sua identidade", "Perfil personalizado"], ["Dois temas", "Claro e escuro"] ] : lang === "es" ? [ ["Acceso claro", "Acceso y recuperación"], ["Tu identidad", "Perfil personalizado"], ["Dos temas", "Claro y oscuro"] ] : [ ["Clear access", "Sign-in and recovery"], ["Your identity", "Personalized profile"], ["Two themes", "Light and dark"] ];
  return <aside className="rq-ref-auth-perks">{[Zap, ShieldCheck, Layers3].map((Icon, index) => <div key={index}><Icon size={27} strokeWidth={1.5} /><div><strong>{labels[index][0]}</strong><span>{labels[index][1]}</span></div></div>)}</aside>;
}

export function RachaquiExperienceFeatures() {
  const { lang } = useI18n();
  const labels = lang === "pt" ? [ ["Em grupo", "Todo mundo participa"], ["Por consumo", "A parte de cada pessoa"], ["Com clareza", "Totais para conferir"] ] : lang === "es" ? [ ["En grupo", "Todos participan"], ["Por consumo", "La parte de cada persona"], ["Con claridad", "Totales para revisar"] ] : [ ["As a group", "Everyone takes part"], ["By consumption", "Everyone's own share"], ["With clarity", "Totals you can review"] ];
  return <div className="rq-ref-experience-features">{[Users, Heart, Receipt].map((Icon, index) => <div key={index}><Icon size={25} strokeWidth={1.5} /><div><strong>{labels[index][0]}</strong><span>{labels[index][1]}</span></div></div>)}</div>;
}
