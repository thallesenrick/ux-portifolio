// src/components/commum/Hero.tsx
import { useI18n } from "../../lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="pt-28 transition-colors duration-300 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 dark:from-red-900 dark:to-orange-800 rounded-2xl p-12 text-white shadow-xl">
            <p className="text-sm uppercase mb-3 opacity-80">{t.welcome}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold whitespace-pre-line leading-tight">
              {t.homeTitle}
            </h1>
            <p className="mt-4 text-slate-100 dark:text-slate-200 max-w-xl">
              {t.homeSubtitle}
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="px-6 py-3 rounded-full border border-white/40 hover:bg-white/10 text-white transition"
              >
                {t.btnCV}
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-slate-100 transition"
              >
                {t.btnPortfolio}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-64 h-64 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-300 shadow-inner">
            <span className="text-sm">Imagem / Mockup</span>
          </div>
        </div>
      </div>
    </section>
  );
}
