import { useCallback, useState, type CSSProperties, type ReactNode } from "react";
import { HeroAccentContext, rgbHex, rgbLuminance, type RGB, type RGBChannel } from "./hero-accent-context";
import { useTheme } from "./theme-context";

export function HeroAccentProvider({children}:{children:ReactNode}) {
  const [rgb,setRGB]=useState<RGB>({r:240,g:43,b:53});
  const {theme}=useTheme();
  const setChannel=useCallback((channel:RGBChannel,value:number)=>{if(Number.isFinite(value))setRGB(current=>({...current,[channel]:Math.round(Math.max(0,Math.min(255,value)))}));},[]);
  const setColor=useCallback((color:RGB)=>{
    if(![color.r,color.g,color.b].every(Number.isFinite))return;
    const channel=(value:number)=>Math.round(Math.max(0,Math.min(255,value)));
    setRGB(current=>{const next={r:channel(color.r),g:channel(color.g),b:channel(color.b)};return current.r===next.r && current.g===next.g && current.b===next.b ? current : next;});
  },[]);
  const ink=rgbLuminance(rgb)>.179 ? "#000000" : "#ffffff";
  const background=theme==="dark" ? .009 : 1;
  let readable={...rgb};
  for(let i=0;i<32;i++) {
    const luminance=rgbLuminance(readable);
    if((Math.max(luminance,background)+.05)/(Math.min(luminance,background)+.05)>=4.5)break;
    const target=theme==="dark" ? 255 : 0;
    readable={r:Math.round(readable.r*.9+target*.1),g:Math.round(readable.g*.9+target*.1),b:Math.round(readable.b*.9+target*.1)};
  }
  return <HeroAccentContext.Provider value={{rgb,setChannel,setColor}}><div style={{display:"contents","--site-accent":rgbHex(rgb),"--site-accent-ink":ink,"--site-accent-text":rgbHex(readable)} as CSSProperties}>{children}</div></HeroAccentContext.Provider>;
}
