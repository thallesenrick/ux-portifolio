// src/components/commum/ProjectCard.tsx
interface Props {
  title: string;
  description: string;
  image?: string;
}

export default function ProjectCard({ title, description }: Props) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-xl p-4 hover:shadow-lg dark:hover:shadow-cyan-900/20 transition-all duration-300">
      <div className="h-40 bg-gray-100 dark:bg-white/10 rounded-md mb-4 flex items-center justify-center text-gray-400 dark:text-slate-300">
        Imagem
      </div>
      <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-slate-300 mt-2 text-sm">
        {description}
      </p>
      <div className="mt-4">
        <button className="px-3 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-medium text-sm transition">
          Ver case
        </button>
      </div>
    </div>
  );
}
