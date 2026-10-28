import { spanish } from "../lib/spanish";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PenLine } from "lucide-react";
import { projects } from "../data/projects";
import { useI18n } from "../lib/i18n-context";
import ProjectCard from "../components/commun/ProjectCard";
import "./Projects.css";

export default function Projects() {
  const { hash } = useLocation();
  const { lang } = useI18n(), pt = lang === "pt";
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "center" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash]);
  return <section className="projects-notebook" aria-labelledby="projects-page-title">
    <header className="projects-notebook-heading"><span><PenLine size={15} />{pt ? "CADERNO DE PROJETOS" : (lang === "es" ? spanish("PROJECT SKETCHBOOK") : "PROJECT SKETCHBOOK")} / {String(projects.length).padStart(2,"0")}</span><h1 id="projects-page-title">{pt ? "Ideias que saíram" : (lang === "es" ? spanish("Ideas that moved") : "Ideas that moved")}<br /><em>{pt ? "do papel." : (lang === "es" ? spanish("beyond the sketch.") : "beyond the sketch.")}</em></h1><p>{pt ? "Um olhar sobre os produtos, interfaces e experiências que venho desenhando. Escolha um projeto para conhecer de perto." : (lang === "es" ? spanish("A look at the products, interfaces and experiences I have been designing. Pick a project to take a closer look.") : "A look at the products, interfaces and experiences I have been designing. Pick a project to take a closer look.")}</p></header>
    <div className="projects-notebook-grid">{projects.map((project, index) => <div id={project.id} key={project.id} className="projects-notebook-item"><ProjectCard project={project} index={index} /></div>)}</div>
  </section>;
}
