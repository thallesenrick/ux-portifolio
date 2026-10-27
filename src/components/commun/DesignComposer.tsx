import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./DesignComposer.css";

const layouts = [
  [[25,35,64,78],[104,35,89,29],[104,73,89,17],[104,100,89,18]],
  [[136,35,57,78],[27,35,93,31],[27,78,93,16],[27,105,78,16]],
  [[28,36,58,56],[101,36,90,28],[28,102,58,17],[101,84,90,33]],
  [[30,66,70,49],[30,28,160,25],[112,67,76,16],[112,96,76,20]],
  [[24,31,104,57],[138,31,57,44],[24,102,104,18],[138,88,57,32]],
  [[92,29,101,70],[26,30,54,37],[27,83,52,30],[92,106,101,17]],
];
function SketchBorder() {
  return <svg className="composer-sketch-border" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M3 4L98 2L97 97L2 98Z" vectorEffect="non-scaling-stroke" /><path d="M1 7L1 96L94 99" vectorEffect="non-scaling-stroke" opacity=".2" /></svg>;
}
export default function DesignComposer({ active, filled = false }: { active: boolean; filled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(1);
  useEffect(() => {
    if (!active || !visible || reduce) return;
    const timer = window.setInterval(() => setPhase((value) => (value + 1) % layouts.length), 2000);
    return () => window.clearInterval(timer);
  }, [active, visible, reduce]);
  const layout = layouts[active ? phase : 0];
  const camera = [[10,-18],[-16,18],[18,8],[-8,-20],[12,22],[-14,-12]][phase];
  const placement = (index: number) => ({
    animate: { x: layout[index][0], y: layout[index][1], width: layout[index][2], height: layout[index][3], rotate: active ? [0,-3,2,-2][index] : 0, rotateX: active && !reduce ? camera[0] + index * 2 : 0, rotateY: active && !reduce ? camera[1] - index * 3 : 0, z: active && !reduce ? [12,24,38,18][index] : 0, skewX: active && !reduce ? [-2,3,-3,2][index] : 0 },
    transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 19, delay: index * .06 },
  });
  return <div ref={ref} className={`design-composer ${filled ? "design-composer--filled" : ""}`}>
    <div className="composer-frame"><SketchBorder /><span className="composer-frame-title">wireframe / exploration</span><i /><i /><i /><i /></div>
    <motion.div className="composer-tile composer-image" {...placement(0)}><SketchBorder /><svg className="composer-placeholder" viewBox="0 0 60 70" preserveAspectRatio="none"><path d="M5 5L55 65M55 5L5 65" /><circle cx="44" cy="17" r="5" /></svg></motion.div>
    <motion.div className="composer-tile composer-type" {...placement(1)}><SketchBorder /><strong>Aa</strong><span><i /><i /><i /></span></motion.div>
    <motion.div className="composer-tile composer-swatches" {...placement(2)}><SketchBorder /><span /><span /><span /><span /></motion.div>
    <motion.div className="composer-tile composer-cta" {...placement(3)}><SketchBorder /><span /><svg viewBox="0 0 20 12"><path d="M2 6L17 5M12 1L17 5L12 10" /></svg></motion.div>
  </div>;
}
