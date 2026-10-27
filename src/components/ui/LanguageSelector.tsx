import { useI18n, type Lang } from "../../lib/i18n-context";

export default function LanguageSelector() {
  const { lang, setLang } = useI18n();
  return <select className="nav-language" value={lang} onChange={(event) => setLang(event.target.value as Lang)} aria-label={lang === "pt" ? "Idioma" : "Language"}><option value="pt">PT</option><option value="en">EN</option></select>;
}
