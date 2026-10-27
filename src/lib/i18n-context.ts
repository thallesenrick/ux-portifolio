import { createContext, useContext } from "react";


export type Lang = "pt" | "en";

export const translations = {
  pt: {
    welcome: "Bem-vindo ao meu perfil",
    strengthsLabel: "O que eu trago para o seu projeto",
    processLabel: "PROCESSO",
    designTitle: "Design que come\u00e7a pelo usu\u00e1rio.",
    designText: "Transformo necessidades em interfaces claras e intuitivas, conectando pesquisa, usabilidade e identidade visual.",
    developmentTitle: "Da ideia à experiência digital.",
    developmentText: "Dou vida ao design com interfaces responsivas, atenção aos detalhes e interações que tornam a navegação mais fluida.",
    processTitle: "Entender. Criar. Evoluir.",
    processText: "Meu processo combina escuta, prototipagem e testes para refinar cada solução com propósito.",
    processNote: "Boas experiências nascem da colaboração.",
    processTags: "Pesquisa · Design · Código",
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
    strengthsLabel: "What I bring to your project",
    processLabel: "PROCESS",
    designTitle: "Design that starts with the user.",
    designText: "I turn needs into clear, intuitive interfaces, connecting research, usability and visual identity.",
    developmentTitle: "From idea to digital experience.",
    developmentText: "I bring design to life with responsive interfaces, attention to detail and interactions that make navigation feel seamless.",
    processTitle: "Understand. Create. Evolve.",
    processText: "My process combines listening, prototyping and testing to refine every solution with purpose.",
    processNote: "Great experiences grow through collaboration.",
    processTags: "Research ? Design ? Code",
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

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
