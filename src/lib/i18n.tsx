import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Lang = "pt" | "en";

const translations = {
  pt: {
    welcome: "Bem-vindo ao meu perfil",
    siteName: "Thalles Enrick",
    homeTitle: "Eu sou Thalles Enrick\nDesenvolvedor Web & UX Designer",
    homeSubtitle:
      "Sou um profissional especializado em projetos voltados à interação e experiência do usuário, proporcionando soluções inovadoras.",
    btnCV: "Baixar CV",
    btnPortfolio: "Baixar Portfólio",
    aboutTitle: "Sobre mim",
    aboutText:
      "Sou designer UX/UI com experiência em pesquisa de usuário, prototipagem e design systems. Trabalho com Figma, Adobe XD e implementação front-end.",
    projectsTitle: "Meus Projetos",
    contactTitle: "Contato",
    contactSubtitle:
      "Me envie uma mensagem — Estou disponível para projetos e colaborações.",
    footerCopyright: "© Todos os direitos reservados.",
    navHome: "Home",
    navAbout: "Sobre",
    navProjects: "Trabalhos",
    navContact: "Contato",
    toggleDark: "Tema",
  },
  en: {
    welcome: "Welcome to my profile",
    siteName: "Thalles Enrick",
    homeTitle: "I'm Thalles Enrick\nWeb Developer & UX Designer",
    homeSubtitle:
      "I'm a professional focused on interaction and user experience, delivering innovative solutions.",
    btnCV: "Download CV",
    btnPortfolio: "Download Portfolio",
    aboutTitle: "About me",
    aboutText:
      "I'm a UX/UI designer with experience in user research, prototyping and design systems. I work with Figma, Adobe XD and front-end implementation.",
    projectsTitle: "My Projects",
    contactTitle: "Contact",
    contactSubtitle:
      "Send me a message — I'm available for projects and collaborations.",
    footerCopyright: "© All rights reserved.",
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",
    toggleDark: "Theme",
  },
};

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.pt;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const t = translations[lang];
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
