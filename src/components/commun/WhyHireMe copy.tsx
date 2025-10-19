// src/components/commun/WhyHireMe.tsx
import { WobbleCard } from "../ui/wobble-card";
import { useI18n } from "../../lib/i18n";
import { MdDesignServices, MdSearch, MdCode } from "react-icons/md";
import Subtract from "../../assets/Subtract (1).svg";

export default function WhyHireMe() {
  const { t } = useI18n();

  return (
    <section className="container mx-auto px-6 mt-20 mb-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-cyan-600 dark:text-cyan-400">
        {t.whyHireTitle || "Por que me contratar?"}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Card 1 - Imagem + SVG (estilo artístico) */}
        <WobbleCard
          containerClassName="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 min-h-[380px] rounded-[24px]"
          className="text-white"
        >
          <div className="absolute inset-0">
            <img
              src="http://www.baltana.com/files/wallpapers-10/Yellow-Abstract-Background-Wallpaper-28584.jpg"
              alt="Background abstrato"
              className="absolute h-full w-full object-cover object-center grayscale opacity-70"
            />
            <img
              src={Subtract}
              alt="Forma decorativa"
              className="absolute inset-0 w-full h-full object-cover z-10 opacity-80"
            />
          </div>

          <div className="relative z-20 flex flex-col justify-end h-full p-6">
            <MdDesignServices className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Design & Composição</h3>
            <p className="text-neutral-200 leading-relaxed">
              Crio composições visuais únicas que unem estética e estratégia,
              valorizando o impacto da marca através do design.
            </p>
          </div>
        </WobbleCard>

        {/* Card 2 - Ícone e elemento circular */}
        <WobbleCard
          containerClassName="relative bg-gradient-to-r from-amber-500 to-orange-600 min-h-[380px] rounded-[24px] flex justify-end p-4"
          className="text-white"
        >
          <div className="absolute right-0 top-0 h-48">
            <img
              src="/src/assets/Subtract (3).svg"
              alt="Forma decorativa"
              className="absolute right-0 top-0 h-48 opacity-80"
            />
          </div>
          <div className="relative z-20 flex flex-col justify-end items-end text-right w-full h-full p-6">
            <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <MdSearch className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold">Análise & Criatividade</h3>
            <p className="text-neutral-200 leading-relaxed">
              Unindo pesquisa e design, entrego soluções criativas guiadas por dados e propósito.
            </p>
          </div>
        </WobbleCard>

        {/* Card 3 - Blocos neutros (técnico e limpo) */}
        <WobbleCard
          containerClassName="bg-neutral-200 dark:bg-neutral-800 min-h-[380px] rounded-[24px]"
          className="text-neutral-800 dark:text-neutral-100"
        >
          <div className="flex flex-col gap-4 justify-between h-full">
            <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[24px] p-6 h-[200px] flex flex-col justify-center">
              <MdCode className="text-4xl mb-2 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-lg font-semibold">Front-end Moderno</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Desenvolvimento limpo, otimizado e integrado à visão de design.
              </p>
            </div>
            <div className="bg-neutral-500 dark:bg-neutral-600 rounded-[24px] p-6 h-[140px] flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-white">Prototipagem Rápida</h3>
              <p className="text-neutral-200 text-sm">
                Transformo ideias em experiências interativas com fluidez e eficiência.
              </p>
            </div>
          </div>
        </WobbleCard>
      </div>
    </section>
  );
}
