import { spanish } from "../../lib/spanish";
import { BookOpen, Download, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n-context";
import "./PortfolioCard.css";

export default function PortfolioCard() {
  const { lang } = useI18n();
  const pt = lang === "pt";
  return <div className="hero-portfolio-card">
    <Link to="/portfolio" className="hero-portfolio-preview" aria-label={pt ? "Folhear portfólio" : (lang === "es" ? spanish("Browse portfolio") : "Browse portfolio")}><img src="/portfolio/cover.png" alt={pt ? "Capa da revista de portfólio de Thalles Enrick" : (lang === "es" ? spanish("Thalles Enrick portfolio magazine cover") : "Thalles Enrick portfolio magazine cover")} width={210} height={297} /><span>VOL. 01 / 2026</span></Link>
    <div className="hero-portfolio-details"><span>{pt ? "DO SITE PARA O PAPEL" : (lang === "es" ? spanish("FROM SCREEN TO PAPER") : "FROM SCREEN TO PAPER")}</span><h2>{pt ? "Meu mundo,\nem páginas." : (lang === "es" ? spanish("My world,\nin pages.") : "My world,\nin pages.")}</h2><p>{pt ? "Projetos e ideias em uma revista para levar com você." : (lang === "es" ? spanish("Projects and ideas in a magazine to take with you.") : "Projects and ideas in a magazine to take with you.")}</p><Link to="/portfolio"><BookOpen size={15} />{pt ? "Folhear online" : (lang === "es" ? spanish("Read online") : "Read online")}<ArrowUpRight size={15} /></Link><a href="/portfolio/thalles-enrick-portfolio.pdf" download><Download size={15} />{pt ? "Baixar portfólio PDF" : (lang === "es" ? spanish("Download portfolio PDF") : "Download portfolio PDF")}</a></div>
  </div>;
}
