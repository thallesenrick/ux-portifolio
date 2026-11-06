import { useId, type CSSProperties, type RefObject } from "react";
import { useHeroAccent } from "../../lib/hero-accent-context";
import { colorHue, vividColor } from "../../lib/hero-intro";
import { useI18n } from "../../lib/i18n-context";

const spectrum=`linear-gradient(to right,${[0,60,120,180,240,300,360].map(value=>{const color=vividColor(value);return `rgb(${color.r} ${color.g} ${color.b})`;}).join(",")})`;

export default function ColorSlider({onInteract,impactRef}:{onInteract?:()=>void;impactRef?:RefObject<HTMLSpanElement|null>}) {
  const {rgb,setColor,selected}=useHeroAccent();
  const {lang}=useI18n();
  const id=useId();
  const hue=Math.min(359,colorHue(rgb));
  const label=lang==="pt" ? "Escolha sua cor" : lang==="es" ? "Elige tu color" : "Choose your color";
  const track={"--channel-track":spectrum,"--selected-color":selected.color} as CSSProperties;
  return <div className="sketch-filter-panel sketch-rgb-panel" onPointerDownCapture={onInteract} onKeyDownCapture={onInteract} onFocusCapture={onInteract}>
    <span ref={impactRef} className="rgb-impact-anchor" aria-hidden="true" />
    <fieldset>
      <legend><label htmlFor={id}>{label}</label></legend>
      <div className="sketch-rgb-row sketch-spectrum-row">
        <input id={id} type="range" min="0" max="359" step="1" value={hue} style={track} aria-label={label} aria-valuetext={selected.color.toUpperCase()} onChange={event=>setColor(vividColor(Number(event.target.value)))} />
      </div>
    </fieldset>
  </div>;
}
