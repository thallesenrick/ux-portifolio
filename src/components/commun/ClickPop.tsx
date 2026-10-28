import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import "./ClickPop.css";

type Pop = { id: number; x: number; y: number; rotation: number };

export default function ClickPop() {
  const [pops, setPops] = useState<Pop[]>([]);
  const nextId = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const click = (event: MouseEvent) => {
      if (event.button !== 0 || event.detail === 0) return;
      const pop = { id: nextId.current++, x: event.clientX, y: event.clientY, rotation: Math.random() * 40 - 20 };
      setPops(current => [...current.slice(-5), pop]);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [reduce]);
  if (reduce) return null;
  return <div className="click-pop-layer" aria-hidden="true">{pops.map(pop => <svg key={pop.id} className="click-pop" viewBox="-60 -60 120 120" fill="none" style={{ left: pop.x, top: pop.y, "--pop-rotation": `${pop.rotation}deg` } as CSSProperties} onAnimationEnd={event => { if (event.target === event.currentTarget) setPops(current => current.filter(item => item.id !== pop.id)); }}>
    {Array.from({ length: 8 }, (_, index) => <g key={index} transform={`rotate(${index * 45})`}><path className="click-pop-ray" d="M0 -18Q-1 -24 1 -32" style={{ "--ray-delay": `${index % 3 * 18}ms` } as CSSProperties} /></g>)}
    <path className="click-pop-star" d="M0 -6Q0 0 6 0Q0 0 0 6Q0 0 -6 0Q0 0 0 -6Z" />
  </svg>)}</div>;
}
