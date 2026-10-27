import { useEffect, useId, useRef, useState, type RefObject } from "react";
import watercolorMap from "../../assets/brazil-ceara-watercolor.svg";
import sketchMap from "../../assets/brazil-ceara-sketch.svg";
import { useTheme } from "../../lib/theme-context";

function MapTone({id,color,lightInk=false}:{id:string;color:string;lightInk?:boolean}) {
  return <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
    <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="graySource" />
    <feComponentTransfer in="graySource" result="grayMap">
      <feFuncR type="linear" slope={lightInk ? -.78 : 1} intercept={lightInk ? .96 : 0} />
      <feFuncG type="linear" slope={lightInk ? -.78 : 1} intercept={lightInk ? .96 : 0} />
      <feFuncB type="linear" slope={lightInk ? -.78 : 1} intercept={lightInk ? .96 : 0} />
    </feComponentTransfer>
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -4 8 -4 0 0" result="paintMask" />
    <feComposite in="paintMask" in2="SourceAlpha" operator="in" result="region" />
    <feFlood floodColor={color} result="selectedColor" />
    <feComposite in="selectedColor" in2="region" operator="in" result="paint" />
    <feBlend in="paint" in2="grayMap" mode="color" />
  </filter>;
}

export default function BrazilWatercolor({color,boundary,heroRef}:{color:string;boundary:number|null;heroRef:RefObject<HTMLElement|null>}) {
  const ref=useRef<HTMLDivElement>(null);
  const {theme}=useTheme();
  const filterId="brazil-tone-"+useId().replace(/[^a-zA-Z0-9_-]/g,"");
  const [geometry,setGeometry]=useState({left:0,width:0});
  useEffect(()=>{
    const element=ref.current,hero=heroRef.current;
    if(!element || !hero)return;
    const measure=()=>{const box=element.getBoundingClientRect();setGeometry({left:box.left-hero.getBoundingClientRect().left,width:box.width});};
    const observer=new ResizeObserver(measure);observer.observe(element);observer.observe(hero);measure();window.addEventListener("resize",measure);
    return()=>{observer.disconnect();window.removeEventListener("resize",measure);};
  },[heroRef]);
  useEffect(()=>{
    const map=ref.current,hero=heroRef.current;
    if(!map || !hero)return;
    const motionPreference=window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointer:{x:number;y:number}|null=null,frame=0;
    const update=()=>{
      frame=0;
      if(!pointer){map.classList.remove("is-map-hovered");return;}
      const box=map.getBoundingClientRect(),x=pointer.x-box.left,y=pointer.y-box.top;
      const inside=x>=0 && x<=box.width && y>=0 && y<=box.height;
      map.style.setProperty("--map-pointer-x",x+"px");
      map.style.setProperty("--map-pointer-y",y+"px");
      map.classList.toggle("is-map-hovered",inside);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const leave=()=>{pointer=null;map.classList.remove("is-map-hovered");};
    const preferenceChanged=()=>{if(motionPreference.matches)leave();};
    const move=(event:PointerEvent)=>{
      if(event.pointerType!=="mouse" || motionPreference.matches){leave();return;}
      pointer={x:event.clientX,y:event.clientY};schedule();
    };
    hero.addEventListener("pointermove",move,{passive:true});
    hero.addEventListener("pointerleave",leave);
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    window.addEventListener("blur",leave);
    motionPreference.addEventListener("change",preferenceChanged);
    return()=>{
      cancelAnimationFrame(frame);leave();
      hero.removeEventListener("pointermove",move);hero.removeEventListener("pointerleave",leave);
      window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);window.removeEventListener("blur",leave);
      motionPreference.removeEventListener("change",preferenceChanged);
    };
  },[heroRef]);
  const split=boundary===null || geometry.width===0 ? 53 : Math.max(0,Math.min(100,(boundary-geometry.left)/geometry.width*100));
  const sketchFilter={filter:`url(#${filterId}-sketch)`};
  const watercolorFilter={filter:`url(#${filterId}-watercolor)`};
  // Load the supplied SVG files as HTML images: their embedded PNG textures
  // must not be nested inside another SVG image resource.
  return <div ref={ref} className="sketch-brazil-map" aria-hidden="true">
    <svg className="sketch-brazil-filters" width="0" height="0" focusable="false"><defs>
      <MapTone id={filterId+"-sketch"} color={color} lightInk={theme==="dark"} />
      <MapTone id={filterId+"-watercolor"} color={color} />
    </defs></svg>
    {/* The base stays still. Both animated copies share the same cursor mask
        and transforms, with the portrait divider clipped outside the lens. */}
    <div className="brazil-map-side brazil-map-side--sketch" data-map-side="sketch" style={{clipPath:`inset(0 ${100-split}% 0 0)`}}>
      <img className="sketch-brazil-layer brazil-map-base" src={sketchMap} alt="" draggable={false} style={sketchFilter} />
      <div className="brazil-hover-lens"><div className="brazil-map-motion">
        <img className="sketch-brazil-layer brazil-map-echo" src={sketchMap} alt="" draggable={false} style={{filter:sketchFilter.filter+" contrast(1.45)"}} />
        <img className="sketch-brazil-layer brazil-ink-pass" src={sketchMap} alt="" draggable={false} style={sketchFilter} />
      </div>
      </div>
    </div>
    <div className="brazil-map-side brazil-map-side--real" data-map-side="real" style={{clipPath:`inset(0 0 0 ${split}%)`}}>
      <img className="sketch-brazil-layer brazil-map-base" src={watercolorMap} alt="" draggable={false} style={watercolorFilter} />
      <div className="brazil-hover-lens"><div className="brazil-map-motion">
        <img className="sketch-brazil-layer brazil-map-echo" src={watercolorMap} alt="" draggable={false} style={{filter:watercolorFilter.filter+" contrast(1.2) saturate(1.3)"}} />
        <img className="sketch-brazil-layer brazil-wet-pass" src={watercolorMap} alt="" draggable={false} style={watercolorFilter} />
      </div>
      </div>
    </div>
  </div>;
}
