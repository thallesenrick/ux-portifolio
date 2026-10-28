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
      setPops(current => [...current.slice(-9), pop]);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [reduce]);
  if (reduce) return null;
  return <div className="click-pop-layer" aria-hidden="true">{pops.map(pop => <svg key={pop.id} className="click-pop" viewBox="-60 -60 120 120" fill="none" style={{ left: pop.x, top: pop.y, "--pop-rotation": `${pop.rotation}deg` } as CSSProperties} onAnimationEnd={event => { if (event.target === event.currentTarget) setPops(current => current.filter(item => item.id !== pop.id)); }}>
    <circle className="click-pop-ring" r="20" pathLength="100" />
    <path className="click-pop-arc" d="M-24 8A26 25 0 0 1 10 -23M23 -7A26 25 0 0 1 -9 24" pathLength="100" />
    {Array.from({ length: 8 }, (_, index) => <g key={index} transform={`rotate(${index * 45})`}><path className="click-pop-ray" d="M0 -26Q-2 -33 1 -41" style={{ "--ray-delay": `${index % 3 * 18}ms` } as CSSProperties} /></g>)}
    <path className="click-pop-star" d="M0 -6Q0 0 6 0Q0 0 0 6Q0 0 -6 0Q0 0 0 -6Z" />
  </svg>)}</div>;
}
