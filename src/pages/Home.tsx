// src/pages/Home.tsx
import Hero from "../components/commun/Hero";

export default function Home() {
  return (
    <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Hero />

      <section className="container mx-auto px-6 mt-20">
        <h2 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400 mb-6 text-center">
          Por que me contratar?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 dark:bg-white/5 rounded-xl shadow-sm dark:shadow-none transition">
            Design de Marca
          </div>
          <div className="p-6 bg-gray-100 dark:bg-white/5 rounded-xl shadow-sm dark:shadow-none transition">
            UX Research
          </div>
          <div className="p-6 bg-gray-100 dark:bg-white/5 rounded-xl shadow-sm dark:shadow-none transition">
            Front-end + Prototipagem
          </div>
        </div>
      </section>
    </div>
  );
}
