import { spanish } from "../../lib/spanish";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, PenLine } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import "./NotebookSections.css";

const experience=[
  {company:"Oryon System",start:"2025-03",end:null,periodPt:"mar. 2025 - atual",periodEn:"Mar 2025 - present",ptTitle:"Tech Lead",enTitle:"Tech Lead",ptText:"Liderança técnica de equipes de design e desenvolvimento, conectando estratégia de UX/UI, sistemas de design e arquitetura de interfaces. Colaboração com produto e stakeholders, com foco em acessibilidade, usabilidade e melhoria contínua.",enText:"Technical leadership across design and development, connecting UX/UI strategy, design systems and interface architecture. Collaboration with product teams and stakeholders, focusing on accessibility, usability and continuous improvement.",skills:["Design systems","UX Research","Figma","Agile/Scrum"]},
  {company:"Oryon System",start:"2024-08",end:null,periodPt:"ago. 2024 - atual",periodEn:"Aug 2024 - present",ptTitle:"UX/UI Designer Pleno",enTitle:"Mid-level UX/UI Designer",ptText:"Condução de projetos de interface e experiência do usuário, com uma abordagem centrada nas pessoas. Criação de soluções intuitivas e visualmente atraentes e melhoria contínua da interação dos usuários com os produtos.",enText:"Leading interface and user experience design projects through a human-centered approach. Creating intuitive, visually engaging solutions and continuously improving how people interact with products.",skills:["UX/UI","Design centrado no usuário|User-centered design","Interfaces|Interfaces"]},
  {company:"IntGest - Inteligência e Gestão Tecnológica",start:"2022-09",end:"2024-08",periodPt:"set. 2022 - ago. 2024",periodEn:"Sep 2022 - Aug 2024",ptTitle:"Desenvolvedor de Front-end",enTitle:"Front-end Developer",ptText:"Desenvolvimento web com JavaScript, Tailwind CSS, Python e Django. Criação de wireframes e protótipos interativos com Figma, Sketch e Adobe XD para validar conceitos, em colaboração com a equipe de desenvolvimento.",enText:"Web development using JavaScript, Tailwind CSS, Python and Django. Creating wireframes and interactive prototypes with Figma, Sketch and Adobe XD to validate concepts, collaborating with the development team.",skills:["JavaScript","Tailwind CSS","Python/Django","Prototipagem|Prototyping"]},
];
function ExperienceEntry({item,index,active}:{item:typeof experience[number];index:number;active:boolean}) {
  const {lang}=useI18n(),pt=lang==="pt",reduce=useReducedMotion();
  return <motion.div className="experience-entry-shell" initial={reduce ? false : {opacity:0,x:55}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.25}} transition={{duration:reduce ? 0 : .65,ease:[.22,1,.36,1]}}><motion.article className={"experience-entry"+(active ? " is-current" : "")} aria-current={active ? "step" : undefined} style={{transformPerspective:900}} animate={{scale:active && !reduce ? 1.025 : 1,rotateY:active && !reduce ? -2 : 0,rotateX:active && !reduce ? 1 : 0}} transition={{duration:reduce ? 0 : .45}}><svg className="experience-sketch-border" viewBox="0 0 600 300" preserveAspectRatio="none" fill="none" aria-hidden="true"><path vectorEffect="non-scaling-stroke" d="M6 7Q293 2 594 6L597 148L593 294Q295 299 6 293L3 153Z" /><path vectorEffect="non-scaling-stroke" d="M1 34L2 2L70 1M530 299L599 298L598 268" /></svg><div className="experience-side"><span className="experience-company">{item.company}</span><span className="experience-period"><time dateTime={item.start}>{(pt ? item.periodPt : (lang === "es" ? spanish(item.periodEn) : item.periodEn)).split(" - ")[0]}</time>{" \u2014 "}{item.end ? <time dateTime={item.end}>{(pt ? item.periodPt : (lang === "es" ? spanish(item.periodEn) : item.periodEn)).split(" - ")[1]}</time> : <span>{pt ? "atual" : (lang === "es" ? spanish("present") : "present")}</span>}</span><ArrowDownRight size={24} strokeWidth={1} aria-hidden="true" /></div><div className="experience-content"><h3>{pt ? item.ptTitle : (lang === "es" ? spanish(item.enTitle) : item.enTitle)}</h3><p>{pt ? item.ptText : (lang === "es" ? spanish(item.enText) : item.enText)}</p><ul aria-label={pt ? "Áreas e ferramentas" : (lang === "es" ? spanish("Areas and tools") : "Areas and tools")}>{item.skills.map(skill=><li key={skill}>{skill.includes("|") ? (lang === "es" ? spanish(skill.split("|")[1]) : skill.split("|")[pt ? 0 : 1]) : (lang === "es" ? spanish(skill) : skill)}</li>)}</ul></div><span className="experience-mark" aria-hidden="true">0{index+1}</span></motion.article></motion.div>;
}

type TimelineMetrics={height:number;ends:number[]};
function activeExperience(progress:number,metrics:TimelineMetrics) {
  const point=10+progress*Math.max(0,metrics.height-20);
  const index=metrics.ends.findIndex(end=>point<end);
  return index<0 ? experience.length-1 : index;
}

export default function Experience() {
  const {lang}=useI18n();const pt=lang==="pt";
  const timelineRef=useRef<HTMLDivElement>(null);
  const metrics=useRef<TimelineMetrics>({height:1,ends:[]});
  const [active,setActive]=useState(0);
  const {scrollYProgress}=useScroll({target:timelineRef,offset:["start 65%","end 65%"]});
  const top=useTransform(scrollYProgress,[0,1],["0%","100%"]);
  const y=useTransform(scrollYProgress,[0,1],["0%","-100%"]);
  useMotionValueEvent(scrollYProgress,"change",value=>setActive(activeExperience(value,metrics.current)));
  useEffect(()=>{
    const timeline=timelineRef.current;if(!timeline)return;
    const measure=()=>{metrics.current={height:timeline.clientHeight,ends:Array.from(timeline.querySelectorAll<HTMLElement>(".experience-entry-shell"),entry=>entry.offsetTop+entry.offsetHeight)};setActive(activeExperience(scrollYProgress.get(),metrics.current));};
    const observer=new ResizeObserver(measure);observer.observe(timeline);measure();return()=>observer.disconnect();
  },[scrollYProgress]);
  return <section id="experience" className="notebook-section experience-section" aria-labelledby="experience-heading">
    <div className="notebook-heading"><span className="notebook-eyebrow"><PenLine size={15} aria-hidden="true" />{pt ? "TRAJETÓRIA PROFISSIONAL" : (lang === "es" ? spanish("PROFESSIONAL EXPERIENCE") : "PROFESSIONAL EXPERIENCE")}</span><h2 id="experience-heading">{pt ? "Experiências que viram" : (lang === "es" ? spanish("Experience that becomes") : "Experience that becomes")}<br /><em>{pt ? "novas possibilidades." : (lang === "es" ? spanish("new possibilities.") : "new possibilities.")}</em></h2><p>{pt ? "Da implementação front-end à liderança de UX/UI: uma trajetória que conecta pessoas, design e tecnologia." : (lang === "es" ? spanish("From front-end implementation to UX/UI leadership: a path connecting people, design and technology.") : "From front-end implementation to UX/UI leadership: a path connecting people, design and technology.")}</p></div>
    <div ref={timelineRef} className="experience-timeline"><div className="experience-rail" aria-hidden="true"><motion.span className="experience-track-fill" style={{scaleY:scrollYProgress}} /><motion.span className="experience-pin" style={{top,y}} /></div>{experience.map((item,index)=><ExperienceEntry item={item} index={index} active={active===index} key={item.company+item.start} />)}</div>
  </section>;
}
