import { createContext, useContext } from "react";


export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: (origin?: HTMLElement) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
