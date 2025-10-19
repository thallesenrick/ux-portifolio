// src/components/commum/Hero.tsx
import { useI18n } from "../../lib/i18n";
import Squares from '../Squares';
import { MdOutlineFileDownload } from "react-icons/md";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa6";

export default function Hero() {
    const { t } = useI18n();

    // Variants para animações
    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    };

    const buttonVariant = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" }
        }
    };

    const imageVariant = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }
    };

    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }
        },
        hover: {
            y: 0,
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section className="px-14 pt-10">
            <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-3 items-center relative">

                {/* Quadrados de fundo */}
                <div className="w-full h-full z-30 absolute top-0 left-0 rounded-[30px] overflow-hidden opacity-40">
                    <Squares />
                </div>

                {/* Imagem principal */}
                <motion.div
                    className="absolute -right-0 !rounded-[40px] overflow-hidden -bottom-64 z-30"
                    variants={imageVariant}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src="src/assets/Design sem nome (37).png"
                        className="w-[450px] !rounded-[40px] grayscale-100"
                        alt=""
                    />
                </motion.div>

                {/* Título e subtítulo */}
                <div className="absolute top-[200px] left-24 z-40 text-white">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold whitespace-pre-line leading-tight z-40"
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        {t.homeTitle}
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-slate-200 text-lg max-w-xl"
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    >
                        {t.homeSubtitle}
                    </motion.p>
                </div>

                {/* Botões */}
                <motion.div
                    className="absolute bottom-16 left-24 z-50 flex space-x-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } },
                        hidden: {}
                    }}
                >
        
                    <motion.a
                        href="#"
                        className="px-12 py-4 font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 text-white inline-flex items-center gap-2 shadow-2xl"
                        variants={buttonVariant}
                    >
                        <MdOutlineFileDownload className="text-2xl" />
                        {t.btnCV}
                    </motion.a>
                               
                    

                    <motion.a
                        href="#"
                        className="px-8 py-4 font-semibold rounded-xl text-white inline-flex items-center gap-2 border border-white bg-white/10"
                        variants={buttonVariant}
                    >
                        <MdOutlineFileDownload className="text-2xl" />
                        {t.btnPortfolio}
                    </motion.a>
                 


                </motion.div>

                {/* Elementos decorativos flutuantes */}
                <motion.div
                    className="absolute right-60 bottom-0 rounded-full bg-white dark:bg-gray-800 h-[90px] w-96 z-40 rotate-[45deg] transition-colors duration-300"
                    variants={floatingVariant}
                    animate="animate"
                    whileHover="hover"
                />
                <motion.div
                    className="absolute -right-60 top-60 rounded-full bg-white dark:bg-gray-800 h-[90px] w-96 z-40 rotate-[45deg] transition-colors duration-300"
                    variants={floatingVariant}
                    animate="animate"
                    whileHover="hover"
                />

                {/* Quadrado inferior esquerdo flutuante */}
                <div className="absolute -bottom-16 -left-16 z-40">
                    <div className="w-[280px] h-72 bg-transparent z-50 rounded-[60px] border-white dark:border-gray-800 border-[60px] transition-colors duration-300" />
                </div>

                {/* Redes sociais e tag flutuantes */}
                <motion.div
                    className="absolute bottom-[220px] right-[300px] z-50"
                    variants={floatingVariant}
                    animate="animate"
                    whileHover="hover"
                >
                    <div className="w-[265px] h-[90px] rounded-xl flex items-center justify-center text-white text-2xl space-x-4 pt-4 bg-gradient-to-r from-amber-500 to-orange-600 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 transition-colors duration-300 shadow-2xl">
                        <FaInstagram />
                        <CiLinkedin />
                        <FaWhatsapp />
                        <RiTelegram2Line />
                        <FaRegEnvelope />
                    </div>
                    <div className="w-[170px] h-[50px] rounded-xl bg-white shadow-2xl -mt-28 ml-6 flex items-center justify-center font-semibold">
                        @thallesenrick
                    </div>
                </motion.div>

                {/* Background gradiente hero */}
                <div className="relative col-span-3">
                    <div className="bg-gradient-to-br from-neutral-500 to-neutral-900 rounded-[30px] p-12 hero-shape w-full h-[90vh]"></div>
                </div>

            </div>
        </section>
    );
}
