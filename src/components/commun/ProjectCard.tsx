import { spanish } from "../../lib/spanish";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import type { Project } from "../../data/projects";
import "./ProjectCard.css";

export default function ProjectCard({ project, index, compact = false, onNavigate }: {
  project: Project; index: number; compact?: boolean; onNavigate?: () => void;
}) {
  const { lang } = useI18n();
  const image = project.image || project.gallery?.[0];
  return <Link className={"sketch-project-card" + (compact ? " sketch-project-card--compact" : "")} to={project.detailPath || `/projects#${project.id}`} onClick={onNavigate}>
    <svg className="sketch-project-border" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none" aria-hidden="true"><path vectorEffect="non-scaling-stroke" d="M6 7Q197 3 393 6L396 203L392 393Q194 398 7 392L4 199Z" /><path vectorEffect="non-scaling-stroke" d="M2 48L3 2L65 1M329 398L399 397L398 344" /></svg>
    <div className="sketch-project-media">{image && <img src={image} alt="" loading="lazy" />}<span className="sketch-project-index">{String(index + 1).padStart(2, "0")}</span><span className="sketch-project-open"><ArrowUpRight size={19} strokeWidth={1.4} /></span></div>
    <div className="sketch-project-copy"><span>{project.category}</span><h3>{project.title}</h3>{!compact && <p>{lang === "pt" ? project.description : (lang === "es" ? spanish(project.descriptionEn) : project.descriptionEn)}</p>}<span className="sketch-project-link">{lang === "pt" ? "Explorar projeto" : (lang === "es" ? spanish("Explore project") : "Explore project")}<ArrowUpRight size={14} /></span></div>
  </Link>;
}
