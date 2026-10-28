import { spanish } from "../../lib/spanish";
import { useId, type CSSProperties, type RefObject } from "react";
import { useHeroAccent, type RGBChannel } from "../../lib/hero-accent-context";
import { useI18n } from "../../lib/i18n-context";

const channels:{key:RGBChannel;letter:string;pt:string;en:string}[]=[{key:"r",letter:"R",pt:"Vermelho",en:"Red"},{key:"g",letter:"G",pt:"Verde",en:"Green"},{key:"b",letter:"B",pt:"Azul",en:"Blue"}];
export default function RGBControls({onInteract,impactRef}:{onInteract?:()=>void;impactRef?:RefObject<HTMLSpanElement|null>}) {
  const {rgb,setChannel,selected}=useHeroAccent();
  const {lang}=useI18n();const pt=lang==="pt", id=useId();
  return <div className="sketch-filter-panel sketch-rgb-panel" onPointerDownCapture={onInteract} onKeyDownCapture={onInteract} onFocusCapture={onInteract}><span ref={impactRef} className="rgb-impact-anchor" aria-hidden="true" /><fieldset><legend>{pt ? "Misture sua cor" : (lang === "es" ? spanish("Mix your color") : "Mix your color")}</legend><div className="sketch-rgb-sliders">
    {channels.map(channel=>{const start={...rgb,[channel.key]:0},end={...rgb,[channel.key]:255};const css={"--channel-track":`linear-gradient(to right,rgb(${start.r} ${start.g} ${start.b}),rgb(${end.r} ${end.g} ${end.b}))`} as CSSProperties;
      return <label key={channel.key} className="sketch-rgb-row" htmlFor={id+channel.key}><span>{channel.letter}</span><input id={id+channel.key} type="range" min="0" max="255" step="1" value={rgb[channel.key]} style={css} aria-label={pt ? channel.pt : (lang === "es" ? spanish(channel.en) : channel.en)} onChange={event=>setChannel(channel.key,Number(event.target.value))} /><output htmlFor={id+channel.key}>{rgb[channel.key]}</output></label>;
    })}
    </div></fieldset><div className="sketch-rgb-result"><span aria-hidden="true" style={{background:selected.color}} /><output>{selected.color.toUpperCase()}</output></div></div>;
}
