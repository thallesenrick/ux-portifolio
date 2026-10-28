import { ThemeContext, type Theme } from "./theme-context";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { ReactNode } from "react";
import "./theme-transition.css";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const transitioning = useRef(false);
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    let saved: string | null = null;
    try { saved = localStorage.getItem("theme"); } catch { /* Storage may be disabled. */ }
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* Storage may be disabled. */ }
  }, [theme]);

  const toggle = (origin?: HTMLElement) => {
    if (transitioning.current) return;
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      flushSync(() => setThemeState(next));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof document.startViewTransition !== "function") { apply(); return; }
    const box = origin?.getBoundingClientRect();
    const x = box ? box.left + box.width / 2 : window.innerWidth / 2;
    const y = box ? box.top + box.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 64;
    transitioning.current = true;
    root.style.setProperty("--theme-origin-x", `${x}px`);
    root.style.setProperty("--theme-origin-y", `${y}px`);
    root.classList.add("theme-transitioning");
    const transition = document.startViewTransition(apply);
    void transition.ready.then(() => {
      root.animate({ "--theme-radius": ["0px", `${radius}px`], "--theme-wave": ["0px", "14px", "-10px", "5px", "0px"], "--theme-drift": ["0px", "-8px", "9px", "-3px", "0px"] }, { duration: 860, easing: "cubic-bezier(.3,.6,.25,1)", fill: "both", pseudoElement: "::view-transition-new(root)" });
    }).catch(() => { /* The theme still applies if the browser skips its snapshot. */ });
    const finish = () => {
      transitioning.current = false;
      root.classList.remove("theme-transitioning");
      root.style.removeProperty("--theme-origin-x");
      root.style.removeProperty("--theme-origin-y");
    };
    void transition.finished.then(finish, finish);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
