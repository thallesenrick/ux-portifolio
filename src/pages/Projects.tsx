// src/pages/Projects.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../data/projects";
import { useI18n } from "../lib/i18n-context";
import ProjectCard from "../components/commun/ProjectCard";

export default function Projects() {
  const { hash } = useLocation();
  const {lang}=useI18n();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "center" });
  }, [hash]);
  return (
    <section className="pt-32 container mx-auto px-6">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">{lang==="pt" ? "Projetos" : "Projects"}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div id={p.id} key={p.id} className="scroll-mt-32"><ProjectCard title={p.title} description={lang==="pt" ? p.description : p.descriptionEn} image={p.gallery?.[1] || p.image || p.gallery?.[0]} detailPath={p.detailPath} /></div>
        ))}
      </div>
    </section>
  );
}
