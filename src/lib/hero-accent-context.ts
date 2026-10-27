import { createContext, useContext } from "react";

export type RGB = { r:number; g:number; b:number };
export type RGBChannel = keyof RGB;
export function rgbLuminance(rgb:RGB) {
  const channels=[rgb.r,rgb.g,rgb.b].map(value=>{const s=value/255;return s<=.04045 ? s/12.92 : ((s+.055)/1.055)**2.4;});
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
}
export function rgbHex(rgb:RGB) { return "#"+[rgb.r,rgb.g,rgb.b].map(value=>value.toString(16).padStart(2,"0")).join(""); }
export const HeroAccentContext=createContext<{rgb:RGB;setChannel:(channel:RGBChannel,value:number)=>void;setColor:(rgb:RGB)=>void}|null>(null);
export function useHeroAccent() {
  const value=useContext(HeroAccentContext);
  if(!value)throw new Error("useHeroAccent requires HeroAccentProvider");
  return {...value,selected:{color:rgbHex(value.rgb),ink:rgbLuminance(value.rgb)>.179 ? "#000000" : "#ffffff"}};
}
