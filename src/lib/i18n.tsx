import { I18nContext, translations, type Lang } from "./i18n-context";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try { const saved = localStorage.getItem("portfolio-language"); return saved === "en" || saved === "es" ? saved : "pt"; } catch { return "pt"; }
  });
  const t = translations[lang];
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    try { localStorage.setItem("portfolio-language", lang); } catch { /* Storage may be disabled. */ }
  }, [lang]);
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}
