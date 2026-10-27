import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import type { CaseScreen } from "../../data/case-study";
import "./CaseMedia.css";

type OpenScreen=(screen:CaseScreen)=>void;
export function CaseReveal({children,className=""}:{children:ReactNode;className?:string}) {
  const reduce=useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : {opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduce ? 0 : .6,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
export function CasePhone({screen,onOpen,className="",priority=false}:{screen:CaseScreen;onOpen:OpenScreen;className?:string;priority?:boolean}) {
  const {lang}=useI18n(),reduce=useReducedMotion();
  return <div className={"ph-phone-position "+className}><motion.button type="button" className="ph-phone" onClick={()=>onOpen(screen)} aria-label={(lang==="pt" ? "Ampliar tela: " : "Enlarge screen: ")+screen.label[lang]} whileHover={reduce ? undefined : {y:-7}} transition={{duration:.3}}><img src={screen.src} alt={screen.label[lang]} width={screen.width ?? 393} height={screen.height ?? 852} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} /><span className="ph-phone-notch" aria-hidden="true" /><span className="ph-phone-expand" aria-hidden="true"><Expand size={16} /></span></motion.button></div>;
}
export function CaseScreenViewer({screen,onClose}:{screen:CaseScreen|null;onClose:()=>void}) {
  const ref=useRef<HTMLDialogElement>(null);const {lang}=useI18n();
  useEffect(()=>{const dialog=ref.current;if(!dialog)return;if(screen && !dialog.open)dialog.showModal();else if(!screen && dialog.open)dialog.close();},[screen]);
  return <dialog ref={ref} className="ph-screen-dialog" onCancel={onClose} onClose={onClose} onClick={event=>{if(event.target===event.currentTarget)onClose();}} aria-label={screen?.label[lang]}><div className="ph-screen-dialog-inner">{screen && <><div><span>{screen.label[lang]}</span><button type="button" onClick={onClose} aria-label={lang==="pt" ? "Fechar tela" : "Close screen"}><X size={20} /></button></div><img src={screen.src} alt={screen.label[lang]} /><p>{lang==="pt" ? "Tela original exportada do Figma." : "Original screen exported from Figma."}</p></>}</div></dialog>;
}
