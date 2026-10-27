import { useId } from "react";

export default function HeroPortrait({src,width,height,sketch=false,label}:{src:string;width:number;height:number;sketch?:boolean;label?:string}) {
  const id=useId();
  const bottom=id+"-bottom", sides=id+"-sides", bottomMask=id+"-bottom-mask", sideMask=id+"-side-mask";
  return <svg className={"sketch-portrait-render"+(sketch ? " sketch-portrait-render--drawing" : "")} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMin meet" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    <defs>
      <linearGradient id={bottom} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="white" /><stop offset=".58" stopColor="white" />
        <stop offset=".70" stopColor="white" stopOpacity=".94" /><stop offset=".80" stopColor="white" stopOpacity=".72" />
        <stop offset=".90" stopColor="white" stopOpacity=".30" /><stop offset=".97" stopColor="white" stopOpacity=".05" /><stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={sides} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="white" stopOpacity="0" /><stop offset=".04" stopColor="white" stopOpacity=".12" />
        <stop offset=".09" stopColor="white" stopOpacity=".48" /><stop offset=".15" stopColor="white" stopOpacity=".86" />
        <stop offset=".22" stopColor="white" /><stop offset=".78" stopColor="white" />
        <stop offset=".85" stopColor="white" stopOpacity=".86" /><stop offset=".91" stopColor="white" stopOpacity=".48" />
        <stop offset=".96" stopColor="white" stopOpacity=".12" /><stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <mask id={bottomMask} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}><rect width={width} height={height} fill={"url(#"+bottom+")"} /></mask>
      <mask id={sideMask} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}><rect width={width} height={height} fill={"url(#"+sides+")"} /></mask>
    </defs>
    <g mask={"url(#"+sideMask+")"}><image href={src} width={width} height={height} mask={"url(#"+bottomMask+")"} /></g>
  </svg>;
}
