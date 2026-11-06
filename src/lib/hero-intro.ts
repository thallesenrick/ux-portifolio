import type { RGB } from "./hero-accent-context";

export const HERO_INK_IMPACT=1.05;

export function colorHue(rgb:RGB):number {
  const max=Math.max(rgb.r,rgb.g,rgb.b),min=Math.min(rgb.r,rgb.g,rgb.b),delta=max-min;
  const sector=delta===0 ? 0 : max===rgb.r ? (rgb.g-rgb.b)/delta : max===rgb.g ? (rgb.b-rgb.r)/delta+2 : (rgb.r-rgb.g)/delta+4;
  return ((sector*60)%360+360)%360;
}

export function vividColor(hue:number):RGB {
  const sector=((hue%360)+360)%360/60;
  const chroma=.85*.94,second=chroma*(1-Math.abs(sector%2-1)),base=.94-chroma;
  const values=sector<1 ? [chroma,second,0] : sector<2 ? [second,chroma,0] : sector<3 ? [0,chroma,second] : sector<4 ? [0,second,chroma] : sector<5 ? [second,0,chroma] : [chroma,0,second];
  return {r:Math.round((values[0]+base)*255),g:Math.round((values[1]+base)*255),b:Math.round((values[2]+base)*255)};
}

// Follow the linear hue spectrum without wrapping between the slider ends.
export function sampleHeroIntro(progress:number,colors:readonly RGB[]) {
  const times=[0,.28,.7,1],positions=[53,33,93,53];
  const p=Math.max(0,Math.min(1,progress));
  const index=p<times[1] ? 0 : p<times[2] ? 1 : 2;
  const local=(p-times[index])/(times[index+1]-times[index]),ease=local*local*(3-2*local);
  const mix=(from:number,to:number)=>from+(to-from)*ease;
  return {reveal:mix(positions[index],positions[index+1]),color:vividColor(mix(colorHue(colors[index]),colorHue(colors[index+1])))};
}
