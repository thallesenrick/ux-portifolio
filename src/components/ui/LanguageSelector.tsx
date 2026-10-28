import { useI18n, type Lang } from "../../lib/i18n-context";
import Dropdown from "./Dropdown";

export default function LanguageSelector() {
  const { lang, setLang } = useI18n();
  return <Dropdown compact modern value={lang} label={lang === "en" ? "Language" : "Idioma"} onChange={value => setLang(value as Lang)} options={[
    { value: "pt", label: "Português", description: "Brasil", shortLabel: "PT" },
    { value: "en", label: "English", description: "English", shortLabel: "EN" },
    { value: "es", label: "Español", description: "Español", shortLabel: "ES" },
  ]} />;
}
