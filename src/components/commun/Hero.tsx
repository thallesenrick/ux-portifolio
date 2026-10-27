import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronsLeftRight, Lightbulb, Mouse, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../lib/theme-context";
import ShapeGrid from "../react-bits/ShapeGrid";
import BrazilWatercolor from "./BrazilWatercolor";
import { useI18n } from "../../lib/i18n-context";
import photo from "../../assets/hero-thalles-photo-extended.png";
import drawing from "../../assets/hero-thalles-sketch-extended.png";
import { useHeroAccent } from "../../lib/hero-accent-context";
import HeroPortrait from "./HeroPortrait";
import RGBControls from "./RGBControls";
import "./Hero.css";


function SketchWireframe({ variant = "window" }: { variant?: "window" | "phone" }) {
  return <svg viewBox="0 0 110 105" fill="none" aria-hidden="true">
    <path d={variant === "phone" ? "M19 3L91 5L89 100L18 98Z" : "M3 8L106 5L108 95L4 97Z"} />
    <path d="M25 17L83 18L82 51L25 50ZM25 17L82 51M83 18L25 50M25 62L61 63M25 71L55 71M25 80L49 81M69 62L84 63L83 83L68 82ZM69 62L83 83M84 63L68 82" />
    <path d="M9 3L9 103M1 12L110 12" className="sketch-construction" />
  </svg>;
}

function RevealObject({ variant, boundary, heroRef }: { variant: "envelope" | "wireframe"; boundary: number | null; heroRef: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [geometry,setGeometry] = useState({left:0,width:1});
  useLayoutEffect(() => {
    const element=ref.current, hero=heroRef.current;
    if(!element || !hero)return;
    const measure=()=>{const box=element.getBoundingClientRect();setGeometry({left:box.left-hero.getBoundingClientRect().left,width:box.width});};
    const observer=new ResizeObserver(measure);observer.observe(element);observer.observe(hero);window.addEventListener("resize",measure);measure();
    return()=>{observer.disconnect();window.removeEventListener("resize",measure);};
  },[heroRef]);
  const split=boundary===null ? 100 : Math.max(0,Math.min(100,(boundary-geometry.left)/geometry.width*100));
  return <div ref={ref} className={`sketch-doodle sketch-doodle--${variant} reveal-object`} aria-hidden="true">
    <div className="reveal-object-layer reveal-object-sketch" style={{clipPath:`inset(0 ${100-split}% 0 0)`}}>{variant==="wireframe" ? <SketchWireframe variant="phone" /> : <svg viewBox="0 0 130 70" fill="none"><path d="M4 7L125 4L127 63L3 65ZM4 7L64 39L125 4M3 65L47 29M127 63L82 29" /><path d="M1 3L130 1M7 1L8 70" className="sketch-construction" /></svg>}</div>
    <div className="reveal-object-layer" style={{clipPath:`inset(0 0 0 ${split}%)`}}>{variant==="wireframe" ? <div className="solid-phone"><span className="solid-phone-speaker" /><div className="solid-phone-picture" /><div className="solid-phone-lines"><i /><i /></div><div className="solid-phone-button" /></div> : <div className="solid-envelope"><svg viewBox="0 0 130 70" fill="none"><rect x="4" y="7" width="121" height="57" rx="7" /><path d="M5 11L65 41L124 11M5 62L47 32M124 62L83 32" /></svg><span /></div>}</div>
  </div>;
}

export default function Hero() {
  const { lang } = useI18n();
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageGeometry,setStageGeometry] = useState<{left:number;width:number} | null>(null);
  const pt=lang === "pt";
  const reduce=useReducedMotion();
  const [reveal,setReveal]=useState(53);
  const revealInput = useRef<HTMLInputElement>(null);
  const introAnimation = useRef<{stop:()=>void} | null>(null);
  const introInterrupted = useRef(false);
  const stopIntro = () => { introInterrupted.current=true;introAnimation.current?.stop();introAnimation.current=null; };
  useEffect(()=>{
    if(reduce)return;
    let cancelled=false;
    // Wait for both portrait textures so the demonstration reveals loaded art.
    const ready=[photo,drawing].map(src=>{const image=new Image();image.src=src;return image.decode();});
    void Promise.allSettled(ready).then(()=>{
      if(cancelled || introInterrupted.current)return;
      introAnimation.current=animate(53,[53,33,93,53],{
        duration:3.4,delay:.75,times:[0,.28,.7,1],ease:[.45,0,.2,1],
        onUpdate:value=>setReveal(value),
      });
    });
    return()=>{cancelled=true;introAnimation.current?.stop();introAnimation.current=null;};
  },[reduce]);
  const updateReveal = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setReveal(Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100)));
  };
  const { selected }=useHeroAccent();
  useLayoutEffect(() => {
    const hero=heroRef.current,stage=stageRef.current;
    if(!hero || !stage)return;
    const measure=()=>{const box=stage.getBoundingClientRect();setStageGeometry({left:box.left-hero.getBoundingClientRect().left,width:box.width});};
    const observer=new ResizeObserver(measure);observer.observe(hero);observer.observe(stage);window.addEventListener("resize",measure);measure();
    return()=>{observer.disconnect();window.removeEventListener("resize",measure);};
  },[]);
  const boundary=stageGeometry ? stageGeometry.left+stageGeometry.width*reveal/100 : null;
  const entrance = { initial: reduce ? false as const : {opacity:0,y:18}, animate:{opacity:1,y:0}, transition:{duration:reduce ? 0 : .8} };
  return <section ref={heroRef} className="hero-section sketch-hero" aria-labelledby="sketch-hero-title" style={{"--sketch-accent":selected.color,"--drawing-filter":"grayscale(1) contrast(1.05)","--sketch-boundary":boundary===null ? "65%" : boundary+"px"} as CSSProperties}>
    <div className="sketch-grid-clip" aria-hidden="true"><div className="sketch-paper"><ShapeGrid shape="square" cellSize={19} lineWidth={.65} direction="diagonal" speed={.18} lineColor={theme === "dark" ? "#71717a" : "#b5b5ae"} hoverColor={selected.color} hoverFillColor={selected.color} fillOpacity={.06} glow={0} trail={.25} fade={0} radius={0} clickCascade={false} intro={false} paused={Boolean(reduce)} /></div></div>
    <svg className="sketch-burst" viewBox="0 0 130 110" fill="none" aria-hidden="true"><path d="M15 92L25 53L3 39L42 42L39 5L61 36L76 9L75 44L121 25L93 61L126 84L82 80L80 107L59 82L34 103L41 76Z" /></svg>
    <span className="sketch-margin-note" aria-hidden="true">01 / EXPLORATION<br />THALLES ENRICK</span>
    <div className="sketch-hero-content">
      <motion.div {...entrance} className="sketch-hero-copy">
        <p className="sketch-eyebrow">UX / UI DESIGNER & FRONT-END</p>
        <h1 id="sketch-hero-title">{pt ? "Desenhando" : "Designing"}<br />{pt ? "experiências," : "experiences,"}<em>{pt ? "além de telas." : "beyond screens."}</em></h1>
        <p className="sketch-description">{pt ? "Eu sou Thalles Enrick. Conecto pesquisa, design e código para criar experiências que fazem sentido para quem usa." : "I'm Thalles Enrick. I connect research, design and code to create experiences that make sense to the people using them."}</p>
        <div className="sketch-copy-lines" aria-hidden="true"><span /><span /><span /></div>
        <Link to="/projects" className="sketch-cta">{pt ? "Explore meu mundo" : "Explore my world"}<ArrowUpRight size={21} strokeWidth={1.5} /></Link>
        <div className="sketch-signature"><span>Thalles Enrick</span><small>{pt ? "Entre ideias e interfaces." : "Between ideas and interfaces."}</small></div>
      </motion.div>

      <motion.div {...entrance} className="sketch-hero-art">
        <BrazilWatercolor color={selected.color} boundary={boundary} heroRef={heroRef} />
        <RevealObject variant="envelope" boundary={boundary} heroRef={heroRef} />
        <RevealObject variant="wireframe" boundary={boundary} heroRef={heroRef} />
        <span className="sketch-annotation sketch-annotation--empathy">{pt ? "empatia" : "empathy"}<svg viewBox="0 0 70 30" fill="none" aria-hidden="true"><path d="M2 10Q40 -2 65 25M56 18L65 25L58 27" /></svg></span>
        <span className="sketch-annotation sketch-annotation--research">{pt ? "pesquisa" : "research"}<svg viewBox="0 0 65 25" fill="none" aria-hidden="true"><path d="M2 22L58 5M51 3L58 5L55 12" /></svg></span>
        <span className="sketch-annotation sketch-annotation--strategy"><MoveUpRight size={20} strokeWidth={1.1} />{pt ? "estratégia" : "strategy"}</span>
        <span className="sketch-annotation sketch-annotation--design"><span>←</span> design</span>
        <div className="sketch-idea" aria-hidden="true"><span>{pt ? "ideia!" : "idea!"}</span><Lightbulb size={32} strokeWidth={1.1} /><svg viewBox="0 0 100 35" fill="none"><path d="M4 25Q40 3 92 12M84 5L92 12L84 18" /></svg></div>
        <div ref={stageRef} className="sketch-portrait-stage" onFocusCapture={stopIntro} onKeyDownCapture={stopIntro} onPointerDown={(event) => { if (event.pointerType === "mouse" && event.button !== 0) return; stopIntro(); event.currentTarget.setPointerCapture(event.pointerId); revealInput.current?.focus({ preventScroll: true }); updateReveal(event); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updateReveal(event); }} onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} style={{"--portrait-split":reveal+"%"} as CSSProperties}>
          <div className="sketch-portrait-photo" style={{clipPath:`inset(0 0 0 ${reveal}%)`}}><HeroPortrait src={photo} width={1254} height={1254} label="Thalles Enrick" /></div>
          <div className="sketch-portrait-drawing" style={{clipPath:`inset(0 ${100-reveal}% 0 0)`}}><HeroPortrait src={drawing} width={1254} height={1254} sketch /></div>
          <div className="sketch-reveal-guide" style={{left:reveal+"%"}} aria-hidden="true"><span className="sketch-reveal-label">{pt ? "Arraste para revelar" : "Drag to reveal"}</span><span className="sketch-reveal-handle"><ChevronsLeftRight size={23} strokeWidth={1.5} /></span><i /></div>
          <input ref={revealInput} className="sketch-reveal-input" type="range" min="0" max="100" value={reveal} onChange={(event)=>setReveal(Number(event.target.value))} aria-label={pt ? "Revelar fotografia e esboço" : "Reveal photo and sketch"} aria-valuetext={`${Math.round(reveal)}% ${pt ? "esboço" : "sketch"}`} />
        </div>
        <RGBControls />
      </motion.div>
    </div>
    <div className="sketch-hero-bottom"><a href="#selected-projects-title"><span>{pt ? "Role para" : "Scroll to"}<br />{pt ? "descobrir" : "discover"}</span><Mouse size={25} strokeWidth={1.2} /><ArrowDown size={19} strokeWidth={1.2} /></a><span>IDEIA → RASCUNHO → EXPERIÊNCIA</span></div>
    <svg className="sketch-landscape" viewBox="0 0 1440 130" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M-10 12C32 110 111 85 160 83C219 80 226 90 273 108C324 130 354 75 414 94C461 109 492 92 547 110C617 133 650 99 714 118C760 131 815 106 875 115" /><path d="M-5 123L36 103L53 110L78 92L100 103L127 96L166 112L221 116L260 128L306 124L350 132" /></svg>
  </section>;
}
