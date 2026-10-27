import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import "./ParticleVortex.css";

const contours = [
  "M5 7C2 11 4 19 10 20C17 23 23 16 19 11C18 6 11 2 7 5Z",
  "M12 3C16 9 22 13 19 18C15 23 5 20 5 14C4 9 9 7 12 3Z",
  "M7 4C13 1 20 5 20 10C20 13 14 12 15 16C17 21 8 23 5 18C1 14 3 7 7 4Z",
  "M4 11C1 5 9 1 13 5C16 9 23 6 21 13C20 20 10 23 6 18C4 16 6 14 4 11Z",
  "M17 3C7 3 2 9 5 16C8 23 17 22 21 15C13 19 7 9 17 3Z",
  "M12 2C13 8 15 10 22 12C15 13 13 16 12 22C10 16 8 14 2 12C8 10 10 8 12 2Z",
  "M5 8C8 2 18 3 20 10C23 16 17 22 10 20C4 19 1 13 5 8ZM8 10C11 6 17 9 16 14C14 18 7 17 8 10Z",
  "M5 4C12 2 20 8 19 15C18 21 8 24 5 18C2 14 7 12 5 4Z",
  "M4 12C8 5 17 5 21 12C17 19 8 20 4 12ZM10 12C10 8 16 9 15 13C14 16 10 15 10 12Z",
];

const particles = Array.from({ length: 32 }, (_, index) => ({
  edge: index % 4,
  position: ((index * .61803398875) % .9) + .05,
  size: 5 + index * 5 % 9,
  widthRatio: [.72, 1, 1.15, .85][index % 4],
  angle: index * 137.5 % 360,
  duration: 1.35 + (index * 11 % 17) * .16,
  delay: (index * .17) % 2.4,
  opacity: .22 + (index * 7 % 10) * .065,
  contour: contours[index % contours.length],
}));

type Bounds = { width: number; height: number; x: number; y: number };

function AttractedParticle({ particle, index, bounds, targetX, targetY }: { particle: (typeof particles)[number]; index: number; bounds: Bounds; targetX: MotionValue<number>; targetY: MotionValue<number> }) {
  const flight = useMotionValue(0);
  const startX = particle.edge === 1 ? bounds.width : particle.edge === 3 ? 0 : bounds.width * particle.position;
  const startY = particle.edge === 0 ? 0 : particle.edge === 2 ? bounds.height : bounds.height * particle.position;
  const x = useTransform(() => startX + (bounds.x + targetX.get() - startX) * flight.get());
  const y = useTransform(() => startY + (bounds.y + targetY.get() - startY) * flight.get());
  const opacity = useTransform(flight, [0, .1, .82, 1], [0, particle.opacity, particle.opacity, 0]);
  const scale = useTransform(flight, [0, .65, .85, 1], [1, 1, .8, 0]);
  useEffect(() => {
    const playback = animate(flight, 1, { duration: particle.duration, delay: particle.delay, repeat: Infinity, repeatDelay: .15, ease: "linear" });
    return () => playback.stop();
  }, [flight, particle]);
  return <motion.span className={`vortex-particle ${index % 9 === 5 ? "vortex-particle--spark" : ""}`} style={{ x, y, opacity, scale, width: particle.size * particle.widthRatio, height: particle.size, marginLeft: -particle.size * particle.widthRatio / 2, marginTop: -particle.size / 2 }}>
    <svg viewBox="0 0 24 24" preserveAspectRatio="none" style={{ rotate: `${particle.angle}deg` }}><path d={particle.contour} vectorEffect="non-scaling-stroke" /></svg>
  </motion.span>;
}

export default function ParticleVortex({ active, targetX, targetY }: { active: boolean; targetX: MotionValue<number>; targetY: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useReducedMotion();
  const [bounds, setBounds] = useState({ width: 0, height: 0, x: 0, y: 0 });

  useEffect(() => {
    const card = ref.current?.parentElement;
    const illustration = card?.querySelector<HTMLElement>(".strength-art");
    if (!card || !illustration) return;
    const measure = () => {
      const next = { width: card.clientWidth, height: card.clientHeight, x: illustration.offsetLeft + illustration.offsetWidth / 2, y: illustration.offsetTop + illustration.offsetHeight / 2 };
      setBounds((previous) => Object.keys(next).every((key) => previous[key as keyof typeof next] === next[key as keyof typeof next]) ? previous : next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    observer.observe(illustration);
    measure();
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`particle-vortex ${active ? "is-running" : ""}`} aria-hidden="true">
    {active && visible && !reduce && bounds.width > 0 && particles.map((particle, index) => <AttractedParticle key={index} particle={particle} index={index} bounds={bounds} targetX={targetX} targetY={targetY} />)}
  </div>;
}
