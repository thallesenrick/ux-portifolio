import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import type { CaseScreen } from "../../data/case-study";

export const PLAYHUB_SCREEN_SECONDS = 2.28;
type Sequence = { video: string; screens: CaseScreen[] };
export default function PlayhubMotionPhone({sequence,playing,onOpen,className="",seek,onStepChange}:{
  sequence:Sequence;playing:boolean;onOpen:(screen:CaseScreen)=>void;className?:string;
  seek?:{index:number;request:number};onStepChange?:(index:number)=>void;
}) {
  const {lang}=useI18n(),reduced=useReducedMotion();
  const root=useRef<HTMLDivElement>(null),video=useRef<HTMLVideoElement>(null);
  const visible=useInView(root,{amount:.1});
  const [hidden,setHidden]=useState(()=>document.hidden);
  const poster=sequence.screens[reduced ? (seek?.index ?? 0) : 0];
  useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener("visibilitychange",update);return()=>document.removeEventListener("visibilitychange",update);},[]);
  useEffect(()=>{
    const element=video.current;if(!element)return;
    if(playing && visible && !hidden && !reduced)void element.play().catch(()=>undefined);
    else element.pause();
  },[playing,visible,hidden,reduced,sequence.video]);
  useEffect(()=>{
    const element=video.current;if(!element || !seek)return;
    const update=()=>{element.currentTime=seek.index*PLAYHUB_SCREEN_SECONDS;};
    if(element.readyState>=1)update();else element.addEventListener("loadedmetadata",update,{once:true});
    return()=>element.removeEventListener("loadedmetadata",update);
  },[seek]);
  const enlarge=()=>{
    const index=Math.min(sequence.screens.length-1,Math.floor((video.current?.currentTime ?? (seek?.index ?? 0)*PLAYHUB_SCREEN_SECONDS)/PLAYHUB_SCREEN_SECONDS));
    onOpen(sequence.screens[index]);
  };
  return <div ref={root} className={"ph-phone-position "+className}>
    <button type="button" className="ph-phone" onClick={enlarge} aria-label={{pt:"Ampliar tela original do Playhub",en:"Enlarge original Playhub screen",es:"Ampliar pantalla original de Playhub"}[lang]}>
      {reduced ? <img src={poster.src} width={poster.width ?? 393} height={poster.height ?? 852} alt={poster.label[lang]} /> : <video ref={video} src={sequence.video} poster={poster.src} width="393" height="852" muted playsInline loop preload="metadata" onTimeUpdate={event=>onStepChange?.(Math.min(sequence.screens.length-1,Math.floor(event.currentTarget.currentTime/PLAYHUB_SCREEN_SECONDS)))} aria-hidden="true" />}
      <span className="ph-phone-expand" aria-hidden="true"><Expand size={16} /></span>
    </button>
  </div>;
}
