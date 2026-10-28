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
    <div className="hero-portfolio-details"><h2>{{pt:"Confira o portf\u00f3lio digital",en:"Explore my digital portfolio",es:"Descubre mi portafolio digital"}[lang]}</h2><Link to="/portfolio"><BookOpen size={15} />{pt ? "Folhear online" : (lang === "es" ? spanish("Read online") : "Read online")}<ArrowUpRight size={15} /></Link><a href="/portfolio/thalles-enrick-portfolio.pdf" download><Download size={15} />{pt ? "Baixar portfólio PDF" : (lang === "es" ? spanish("Download portfolio PDF") : "Download portfolio PDF")}</a></div>
  </div>;
}
