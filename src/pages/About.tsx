// src/pages/About.tsx
import { useI18n } from "../lib/i18n";

export default function About() {
  const { t } = useI18n();
  return (
    <section className="pt-8 container mx-auto px-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">{t.aboutTitle}</h1>
      <p className="text-slate-300 max-w-3xl">{t.aboutText}</p>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 rounded-xl">Experiência & Cases</div>
        <div className="p-6 bg-white/5 rounded-xl">Ferramentas & Skills</div>
      </div>
    </section>
  );
}
