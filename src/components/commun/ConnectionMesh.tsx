import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import "./ConnectionMesh.css";

const arrangements = [
  [[40,37],[179,30],[195,103],[49,114],[111,18]],
  [[34,66],[165,28],[189,91],[86,120],[91,26]],
  [[52,25],[188,52],[165,119],[32,96],[126,15]],
];
function ConnectionNode({ position, centerX, centerY, index, active }: { position: number[]; centerX: MotionValue<number>; centerY: MotionValue<number>; index: number; active: boolean }) {
  const reduce = useReducedMotion();
  const x = useSpring(position[0], { stiffness: 90, damping: 19 });
  const y = useSpring(position[1], { stiffness: 90, damping: 19 });
  useEffect(() => { if (reduce) { x.jump(position[0]); y.jump(position[1]); } else { x.set(position[0]); y.set(position[1]); } }, [position, x, y, reduce]);
  const path = useTransform(() => { const nx=x.get(),ny=y.get(),cx=centerX.get(),cy=centerY.get(); return `M${nx} ${ny} Q${(nx+cx)/2 + (index%2 ? 9 : -9)} ${(ny+cy)/2} ${cx} ${cy}`; });
  return <>
    <motion.path className="connection-thread" d={path} animate={{ opacity: active ? .65 : .2, pathLength: active ? 1 : .75 }} transition={{ duration: reduce ? 0 : .55 }} />
    <motion.g style={{ x, y }}>
      <circle className="connection-node-ring" r={index%2 ? 10 : 12} />
      {index%2 ? <path className="connection-node-mark" d="M-3 0H3M0-3V3" /> : <circle className="connection-node-dot" r="3" />}
      {active && !reduce && <motion.circle className="connection-signal" r="12" initial={{ scale: .7, opacity: .5 }} animate={{ scale: [1,1.8], opacity: [.4,0] }} transition={{ duration:2.2,repeat:Infinity,delay:index*.35 }} />}
    </motion.g>
  </>;
}
export default function ConnectionMesh({ active, pointerX, pointerY, extraPoints = [] }: { active: boolean; pointerX: MotionValue<number>; pointerY: MotionValue<number>; extraPoints?: { id: number; x: number; y: number }[] }) {
  const ref=useRef<HTMLDivElement>(null);
  const visible=useInView(ref);
  const reduce=useReducedMotion();
  const [phase,setPhase]=useState(0);
  const centerX=useTransform(() => { const value=pointerX.get(); return 110+(!reduce ? Math.max(-20,Math.min(20,value*.18)) : 0); });
  const centerY=useTransform(() => { const value=pointerY.get(); return 72+(!reduce ? Math.max(-14,Math.min(14,value*.12)) : 0); });
  useEffect(() => { if(!active || !visible || reduce)return; const timer=window.setInterval(()=>setPhase(value=>(value+1)%arrangements.length),2400);return()=>window.clearInterval(timer); },[active,visible,reduce]);
  return <div ref={ref} className={`connection-mesh ${active ? "is-connected" : ""}`}>
    <svg viewBox="0 0 220 145" fill="none">
      {arrangements[active ? phase : 0].map((position,index)=><ConnectionNode key={index} position={position} index={index} active={active} centerX={centerX} centerY={centerY} />)}
      <AnimatePresence>
        {extraPoints.map((point, pointIndex) => {
          const candidates = [...arrangements[active ? phase : 0].map(([x,y]) => ({x,y})), {x:110,y:72}, ...extraPoints.slice(0,pointIndex)];
          const neighbors = candidates.filter((candidate) => Math.hypot(candidate.x-point.x,candidate.y-point.y)>8).sort((a,b) => Math.hypot(a.x-point.x,a.y-point.y)-Math.hypot(b.x-point.x,b.y-point.y)).slice(0,2);
          return <motion.g key={point.id} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:reduce ? 0 : .6 }}>
            {neighbors.map((neighbor,index) => <motion.path key={index} className="connection-thread connection-thread--added" initial={{pathLength:0}} animate={{ d:`M${point.x} ${point.y} Q${(point.x+neighbor.x)/2} ${(point.y+neighbor.y)/2-8} ${neighbor.x} ${neighbor.y}`,pathLength:1 }} exit={{d:`M110 72 Q110 72 110 72`,pathLength:0}} transition={{duration:reduce ? 0 : .65,ease:[.22,1,.36,1]}} />)}
            <motion.circle className="connection-added-node" cx={point.x} cy={point.y} initial={{r:0}} animate={{r:6}} exit={{cx:110,cy:72,r:0}} transition={{duration:reduce ? 0 : .6}} />
          </motion.g>;
        })}
      </AnimatePresence>
      <motion.g style={{ x:centerX,y:centerY }}>
        <motion.circle className="connection-core-halo" r="25" animate={{ scale:active && !reduce ? [1,1.1,1] : 1 }} transition={{ duration:3,repeat:active && !reduce ? Infinity : 0 }} />
        <rect className="connection-core" x="-17" y="-17" width="34" height="34" rx="12" />
        <circle className="connection-user" cy="-4" r="4" /><path className="connection-user" d="M-7 8C-7 0 7 0 7 8" />
      </motion.g>
    </svg>
  </div>;
}
