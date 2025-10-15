// src/pages/Projects.tsx
import ProjectCard from "../components/commun/ProjectCard";

const data = [
  { title: "Portfolio Redesign", description: "Case de redesign com foco em conversão", image: "" },
  { title: "Dashboard UX", description: "Painel para análise de dados", image: "" },
  { title: "E-commerce flow", description: "Checkout otimizado", image: "" },
];

export default function Projects() {
  return (
    <section className="pt-8 container mx-auto px-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Projetos</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
