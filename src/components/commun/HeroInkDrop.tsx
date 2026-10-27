import { useLayoutEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { HERO_INK_IMPACT } from "../../lib/hero-intro";

type Geometry={width:number;height:number;x:number;y:number};
const splashes=[
  {d:"M-2 -3Q-6 -15 -16 -24",x:-8,y:-9,delay:0,duration:.57},
  {d:"M-3 -2Q-16 -7 -25 -19",x:-15,y:-3,delay:.02,duration:.65},
  {d:"M1 -4Q3 -18 -2 -34",x:-2,y:-13,delay:.01,duration:.7},
  {d:"M3 -3Q10 -18 19 -28",x:8,y:-10,delay:.03,duration:.6},
  {d:"M4 -1Q19 -6 29 -16",x:15,y:-2,delay:.015,duration:.68},
  {d:"M-4 -1L-18 -5",x:-23,y:-4,delay:.065,duration:.5},
  {d:"M2 -3L9 -17",x:16,y:-23,delay:.07,duration:.53},
  {d:"M-2 -3Q-8 -11 -5 -16",x:-14,y:-24,delay:.09,duration:.51},
  {d:"M3 -1L17 -5",x:24,y:-8,delay:.08,duration:.49},
];

// Measure an actual point on the rotated color panel, so the impact stays
// attached to its border across breakpoints, translations and font changes.
export default function HeroInkDrop({heroRef,impactRef}:{
  heroRef:RefObject<HTMLElement|null>;
  impactRef:RefObject<HTMLSpanElement|null>;
}) {
  const [geometry,setGeometry]=useState<Geometry|null>(null);
  const [finished,setFinished]=useState(false);
  useLayoutEffect(()=>{
    const hero=heroRef.current,anchor=impactRef.current;
    if(!hero || !anchor)return;
    const measure=()=>{
      const root=hero.getBoundingClientRect(),point=anchor.getBoundingClientRect();
      setGeometry({width:root.width,height:root.height,x:point.left-root.left,y:point.top-root.top});
    };
    const observer=new ResizeObserver(measure);
    observer.observe(hero);if(anchor.parentElement)observer.observe(anchor.parentElement);
    window.addEventListener("resize",measure);measure();
    return()=>{observer.disconnect();window.removeEventListener("resize",measure);};
  },[heroRef,impactRef]);
  if(!geometry || finished)return null;
  const {width,height,x,y}=geometry;
  const startX=Math.min(width-10,x+Math.max(100,width*.15));
  const fall=Math.min(310,Math.max(170,height*.36)),startY=Math.max(25,y-fall);
  const distance=startX-x;
  // S reflects the previous control point: both curve segments share a
  // tangent, and the final control point lands vertically above the panel.
  const path=(bend:number)=>`M${startX} ${startY}C${startX} ${startY+fall*.28} ${x+distance*.75+bend} ${y-fall*.67} ${x+distance*.4} ${y-fall*.48}S${x} ${y-fall*.17} ${x} ${y}`;
  const erase={duration:1.65,times:[0,HERO_INK_IMPACT/1.65,.72,1],ease:"easeInOut" as const};
  return <motion.svg className="hero-ink-drop" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true" data-impact-x={x} data-impact-y={y} initial={{opacity:1}} animate={{opacity:[1,1,0]}} transition={{duration:1.8,times:[0,.94,1]}} onAnimationComplete={()=>setFinished(true)}>
    <motion.path className="hero-ink-falling-line" d={path(0)} initial={{d:path(0),opacity:1,pathLength:0,pathOffset:0}} animate={{d:[path(0),path(3),path(0)],pathLength:[0,1,1,0],pathOffset:[0,0,0,1],opacity:[1,1,1,0]}} transition={{d:{duration:HERO_INK_IMPACT,times:[0,.55,1],ease:"easeInOut"},pathLength:erase,pathOffset:erase,opacity:erase}} />
    <g className="hero-ink-splash" transform={`translate(${x} ${y})`}>
      {splashes.map((splash,index)=><motion.path key={index} d={splash.d} initial={{opacity:0,x:0,y:0,scale:.3,pathLength:0}} animate={{opacity:[0,1,.85,0],x:splash.x,y:splash.y,scale:[.3,1,1.1],pathLength:[0,1,1]}} transition={{delay:HERO_INK_IMPACT+splash.delay*.75,duration:splash.duration*.72,ease:"easeOut"}} />)}
    </g>
  </motion.svg>;
}
