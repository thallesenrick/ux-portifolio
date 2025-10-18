// src/components/commum/Hero.tsx
import { useI18n } from "../../lib/i18n";
// import DarkVeil from '../DarkVeil';
// import GradientBlinds from '../GradientBlinds';
// import Beams from '../Beams';
// import Dither from '../Dither';
// import GridDistortion from '../GridDistortion';
 import Squares from '../Squares';
 import { MdOutlineFileDownload } from "react-icons/md";



export default function Hero() {
  const { t } = useI18n();



  return (
    <section className="px-14 pt-10">
      <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-3 items-center relative">
        <div className="w-full h-full z-30 absolute top-0 left-0 rounded-[30px] overflow-hidden opacity-40">
          <Squares />
        </div>

        <div className="absolute -right-0 !rounded-[40px] overflow-hidden -bottom-64 z-30">
            <img src="src\assets\Design sem nome (37).png" className="w-[450px] !rounded-[40px] grayscale-100" alt="" />
        </div>


        <div className="absolute top-[200px] left-24 z-40 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold whitespace-pre-line leading-tight z-40">
            {t.homeTitle}
          </h1>
          <p className="mt-4 text-slate-200 text-lg max-w-xl">{t.homeSubtitle}</p>
        </div>

        <div className="absolute bottom-[220px] right-[300px] z-50">
          <div className="w-[265px] h-[90px] rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 shadow-2xl"></div>
          <div className="w-[170px] h-[50px] rounded-xl bg-white shadow-2xl -mt-28 ml-6"></div>
        </div>

        <div className="absolute -bottom-16 -left-16 z-40">
          <div className="w-[280px] h-72 bg-transparent z-50 rounded-[60px] border-white dark:border-gray-800 border-[60px] transition-colors duration-300"></div>
        </div>

        <div className="absolute bottom-16 left-24 z-50">
          <div className="flex space-x-4">
            <a
              href="#"
              className="px-12 py-4 font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 text-white inline-flex items-center gap-2 shadow-2xl"
            >
                <MdOutlineFileDownload className="text-2xl"/>

              {t.btnCV}
            </a>
            <a
              href="#"
              className="px-8 py-4 font-semibold rounded-xl text-white inline-flex items-center gap-2 border border-white bg-white/10"
            >
                <MdOutlineFileDownload className="text-2xl"/>
              {t.btnPortfolio}
            </a>
          </div>
        </div>

        <div className="absolute right-60 bottom-0 rounded-full bg-white dark:bg-gray-800 h-[90px] w-96 z-40 rotate-[45deg] transition-colors duration-300"></div>
        <div className="absolute -right-60 top-60 rounded-full bg-white dark:bg-gray-800 h-[90px] w-96 z-40 rotate-[45deg] transition-colors duration-300"></div>

        <div className="relative col-span-3">
          <div className="bg-gradient-to-br from-neutral-500 to-neutral-900 rounded-[30px] p-12 hero-shape w-full h-[90vh]"></div>
        </div>
      </div>
    </section>
    
  );
}
