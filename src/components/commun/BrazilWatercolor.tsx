import { useId, useLayoutEffect, useRef, useState, type RefObject } from "react";
import watercolorMap from "../../assets/brazil-ceara-watercolor.svg";
import sketchMap from "../../assets/brazil-ceara-sketch.svg";

export default function BrazilWatercolor({color,boundary,heroRef}:{color:string;boundary:number|null;heroRef:RefObject<HTMLElement|null>}) {
  const ref=useRef<HTMLDivElement>(null);
  const filterId="brazil-tone-"+useId().replace(/[^a-zA-Z0-9_-]/g,"");
  const [geometry,setGeometry]=useState({left:0,width:0});
  useLayoutEffect(()=>{
    const element=ref.current,hero=heroRef.current;
    if(!element || !hero)return;
    const measure=()=>{const box=element.getBoundingClientRect();setGeometry({left:box.left-hero.getBoundingClientRect().left,width:box.width});};
    const observer=new ResizeObserver(measure);observer.observe(element);observer.observe(hero);measure();window.addEventListener("resize",measure);
    return()=>{observer.disconnect();window.removeEventListener("resize",measure);};
  },[heroRef]);
  const split=boundary===null || geometry.width===0 ? 53 : Math.max(0,Math.min(100,(boundary-geometry.left)/geometry.width*100));
  const filter={filter:`url(#${filterId})`};
  // Load the supplied SVG files as HTML images: their embedded PNG textures
  // must not be nested inside another SVG image resource.
  return <div ref={ref} className="sketch-brazil-map" aria-hidden="true">
    <svg className="sketch-brazil-filters" width="0" height="0" focusable="false"><defs>
      <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="grayMap" />
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -4 8 -4 0 0" result="paintMask" />
        <feComposite in="paintMask" in2="SourceAlpha" operator="in" result="region" />
        <feFlood floodColor={color} result="selectedColor" />
        <feComposite in="selectedColor" in2="region" operator="in" result="paint" />
        <feBlend in="paint" in2="grayMap" mode="color" />
      </filter>
    </defs></svg>
    <img className="sketch-brazil-layer" src={sketchMap} alt="" draggable={false} data-map-side="sketch" style={{...filter,clipPath:`inset(0 ${100-split}% 0 0)`}} />
    <img className="sketch-brazil-layer" src={watercolorMap} alt="" draggable={false} data-map-side="real" style={{...filter,clipPath:`inset(0 0 0 ${split}%)`}} />
  </div>;
}
