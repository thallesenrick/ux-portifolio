// src/components/commum/Hero.tsx
import { useI18n } from "../../lib/i18n";

export default function Hero() {
    const { t } = useI18n();

    return (
        <section className="px-10 pt-20">
            <div className="overflow-hidden  grid grid-cols-1 lg:grid-cols-3 items-center relative">
                
                <div className="absolute -bottom-14 -left-14 z-40 ">
                    <div className="w-60 h-60 bg-transparent z-50 rounded-full border-white dark:border-neutral-900 border-[60px] transition-colors  duration-300">

                    </div>
                </div>
                <div className="absolute bottom-14 left-20 z-50">
                    <div className="flex space-x-2">
                        <a href="" className="px-12 py-4 font-semibold rounded-xl bg-amber-600 border border-white/30 text-white inline-flex items-center gap-2 shadow-2xl">  {t.btnCV}</a>
                        <a href="" className="px-12 py-4 font-semibold rounded-xl text-white inline-flex items-center gap-2">    {t.btnPortfolio}</a>

                    </div>
                </div>
                <div className="absolute right-48 bottom-0 rounded-full bg-white h-[70px] w-96 z-40 rotate-[45deg]">

                </div>
                 <div className="absolute -right-40 top-40 rounded-full bg-white h-[70px] w-96 z-40 rotate-[45deg]">

                </div>
                <div className=" relative col-span-3">
                    <div className="bg-gradient-to-br from-neutral-600 to-neutral-700 dark:from-amber-700 dark:to-amber-600 rounded-[30px] p-12 text-white hero-shape w-full h-[600px]">
                        <p className="text-sm uppercase mb-3 opacity-80">{t.homeSubtitle}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold whitespace-pre-line leading-tight">
                            {t.homeTitle}
                        </h1>
                        <p className="mt-4 text-slate-200 max-w-xl">{t.homeSubtitle}</p>


                    </div>
                </div>


            </div>
        </section>
    );
}
