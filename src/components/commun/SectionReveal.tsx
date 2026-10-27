import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionReveal({ children, from = "left" }: { children: ReactNode; from?: "left" | "right" }) {
  const reduce = useReducedMotion();
  return <motion.div
    style={{ display: "flow-root" }}
    initial={reduce ? false : "hidden"}
    animate={reduce ? "visible" : "hidden"}
    whileInView="visible"
    viewport={{ once: false, amount: .12 }}
    variants={{ hidden: { opacity: 0, x: from === "left" ? -65 : 65 }, visible: { opacity: 1, x: 0 } }}
    transition={{ duration: reduce ? 0 : .75, ease: [.22, 1, .36, 1] }}
  >{children}</motion.div>;
}
