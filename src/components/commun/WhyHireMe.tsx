import { Code2, Layers3, ScanLine, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "../../lib/i18n-context";
import "./WhyHireMe.css";

type StrengthCardProps={icon:LucideIcon;label:string;title:string;text:string;art:string;index:number};

function StrengthDrawing({art,active}:{art:string;active:boolean}) {
  const reduce=useReducedMotion();
  return <svg className="strength-drawing" viewBox="0 0 240 150" fill="none" aria-hidden="true">
    <motion.g animate={{y:active && !reduce ? -3 : 0,rotate:active && !reduce ? -2 : 0}} transition={{duration:reduce ? 0 : .45,ease:"easeOut"}} style={{transformOrigin:"120px 75px"}}>
      {art==="design" ? <>
        <path className="strength-drawing-guide" d="M43 38L120 76L197 34M120 76L187 119M120 76L49 117" />
        <circle cx="43" cy="38" r="14" /><circle cx="197" cy="34" r="12" /><circle cx="187" cy="119" r="11" /><circle cx="49" cy="117" r="12" />
        <path d="M37 38H49M43 32V44M191 34H203M43 117H55" />
        <path className="strength-drawing-fill" d="M99 54L141 52L143 96L98 98Z" />
        <circle cx="120" cy="68" r="5" /><path d="M110 85C110 73 130 73 130 85" />
      </> : art==="code" ? <>
        <path d="M39 25L204 22L202 128L37 130ZM39 45L203 43" /><path className="strength-drawing-guide" d="M27 19V139M32 16H215" />
        <circle cx="50" cy="35" r="1.5" /><circle cx="58" cy="35" r="1.5" /><circle cx="66" cy="35" r="1.5" />
        <path className="strength-drawing-fill" d="M52 58L103 57L104 112L52 113Z" /><path d="M53 59L102 111M102 58L53 112M118 60H183M118 71H174M118 82H162" />
        <path className="strength-drawing-fill" d="M118 99H177V112H118Z" /><path d="M155 105H168M165 102L168 105L165 108" />
      </> : <>
        <path className="strength-drawing-guide" d="M65 51C84 16 166 16 183 57M182 99C160 137 82 133 63 98" />
        <path d="M176 49L183 58L187 46M71 107L62 98L57 110" />
        <path className="strength-drawing-fill" d="M118 38L150 72L121 109L89 74Z" />
        <path d="M120 55L125 68L138 72L125 78L120 92L115 78L102 73L115 68Z" />
        <circle cx="57" cy="74" r="8" /><circle cx="188" cy="76" r="7" /><path d="M115 17H125M120 12V22M119 127V138" />
      </>}
    </motion.g>
  </svg>;
}

function StrengthCard({icon:Icon,label,title,text,art,index}:StrengthCardProps) {
  const reduce=useReducedMotion();
  const [hovered,setHovered]=useState(false),[focused,setFocused]=useState(false);
  const active=hovered || focused;
  return <motion.div className="strength-card-reveal" initial={reduce ? false : {opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:reduce ? 0 : .45,delay:reduce ? 0 : index*.07}}>
    <article tabIndex={0} aria-label={title} className={"strength-card"+(active ? " is-active" : "")} onPointerEnter={event=>{if(event.pointerType==="mouse")setHovered(true);}} onPointerLeave={()=>setHovered(false)} onPointerCancel={()=>setHovered(false)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}>
      <svg className="strength-sketch-frame" viewBox="0 0 400 430" preserveAspectRatio="none" fill="none" aria-hidden="true"><path vectorEffect="non-scaling-stroke" d="M5 7Q198 2 395 6L397 211L394 424Q200 429 6 423L3 216Z" /><path vectorEffect="non-scaling-stroke" d="M1 40L2 3L75 1M322 429L399 427L398 390" opacity=".3" /></svg>
      <div className="strength-card-top"><span className="strength-icon"><Icon size={20} strokeWidth={1.4} aria-hidden="true" /></span><span className="strength-label">{label}</span></div>
      <div className="strength-art"><StrengthDrawing art={art} active={active} /></div>
      <div className="strength-card-copy"><h3>{title}</h3><p className="strength-description">{text}</p></div>
    </article>
  </motion.div>;
}

export default function WhyHireMe() {
  const {t}=useI18n();
  const cards=[
    {icon:Layers3,label:"UX / UI DESIGN",title:t.designTitle,text:t.designText,art:"design"},
    {icon:Code2,label:"FRONT-END",title:t.developmentTitle,text:t.developmentText,art:"code"},
    {icon:ScanLine,label:t.processLabel,title:t.processTitle,text:t.processText,art:"process"},
  ];
  return <section aria-labelledby="strengths-heading" className="strengths-section">
    <div className="strengths-heading"><span className="strengths-eyebrow"><Sparkles size={15} strokeWidth={1.4} aria-hidden="true" /> DESIGN & DEVELOPMENT</span><h2 id="strengths-heading">{t.strengthsLabel}</h2><svg className="strengths-heading-line" viewBox="0 0 330 12" fill="none" aria-hidden="true"><path d="M3 8Q150 1 326 6M17 11L253 9" /></svg></div>
    <div className="strengths-grid">{cards.map((card,index)=><StrengthCard key={card.art} {...card} index={index} />)}</div>
    <p className="strengths-note"><span aria-hidden="true" />{t.processNote}</p>
  </section>;
}
