// src/components/commun/WhyHireMe.tsx


import { useI18n } from "../../lib/i18n";
import Subtract from "../../assets/Subtract (1).svg";


export default function WhyHireMe() {
  const { t } = useI18n();

  return (
    <section className="w-full h-[400px]  px-14 mt-20 mb-20 grid grid-cols-3 grid-rows-5 gap-4">
        <div className="w-full h-full bg-red-200 row-span-5 rounded-[24px]">
             <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-500 row-span-5 rounded-[24px] flex justify-center items-center overflow-hidden">
        <div className="w-full h-full relative">
            <img src="http://www.baltana.com/files/wallpapers-10/Yellow-Abstract-Background-Wallpaper-28584.jpg" className="absolute h-full w-full z-0  opacity-100" alt="" />
       <img
  src={Subtract}
  className="w-full object-cover object-center z-20 absolute"
  style={{ fill: "#ffffff" }}
  alt=""
/>
        </div>
      </div>

        </div>
         <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-500 row-span-5 rounded-[24px] relative flex justify-end p-4">
            <div className="w-24 h-24 flex justify-center items-center z-40 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">

            </div>
            <img src="src\assets\text.svg" className="absolute right-0 top-0 h-48" alt="" />
        </div>
        <div className="w-full h-full row-span-5 space-y-4">

         <div className="w-full h-[234px] bg-neutral-200 rounded-[24px]">

        </div>
             <div className="w-full h-[150px] bg-neutral-600 rounded-[24px]">
                <img src="https://static.vecteezy.com/system/resources/previews/012/833/282/original/modern-black-texture-background-free-vector.jpg" className="w-full h-full rounded-[24px] grayscale-100 opacity-40 object-cover object-center" alt="" />

        </div>
        </div>
    </section>
  );
}
