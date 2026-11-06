import home from "../assets/projects/playhub/originals/screen-38.png";
import details from "../assets/projects/playhub/originals/screen-13.png";
import booking from "../assets/projects/playhub/originals/screen-12.png";
import payment from "../assets/projects/playhub/originals/screen-18.png";
import calendar from "../assets/projects/playhub/originals/screen-39.png";
import admin from "../assets/projects/playhub/originals/screen-17.png";
import wireframe from "../assets/projects/playhub/originals/screen-22.png";
import guide from "../assets/projects/playhub/guide.png";
import typography from "../assets/projects/playhub/type.png";

import { copy } from "./case-study";
export type { CaseCopy } from "./case-study";
export const playhubFigma="https://www.figma.com/design/v8y0LZqC6qd7iCCemVLFnF/Untitled";
export const playhubScreens={
  home:{src:home,label:copy("Descoberta de quadras","Court discovery")},
  details:{src:details,label:copy("Detalhes da arena","Arena details")},
  booking:{src:booking,label:copy("Data, horário e quadra","Date, time and court")},
  payment:{src:payment,label:copy("Revisão e pagamento","Review and payment")},
  calendar:{src:calendar,label:copy("Acompanhamento de reservas","Reservation tracking")},
  admin:{src:admin,label:copy("Visão do administrador","Administrator view")},
  wireframe:{src:wireframe,label:copy("Wireframe de descoberta","Discovery wireframe")},
  guide:{src:guide,label:copy("Guia visual e fluxo original","Visual guide and original user flow")},
  typography:{src:typography,label:copy("Guia de tipografia e espaçamento","Typography and spacing guide")},
};
export type PlayhubScreen=typeof playhubScreens[keyof typeof playhubScreens];
export const playhubProcess=[
  {label:copy("Planejar","Plan"),title:copy("Uma pergunta guia o produto.","One question guides the product."),body:copy("Como conectar quem quer jogar a uma quadra disponível, sem espalhar a decisão entre busca, mensagens e uma agenda separada? Esse é o problema de partida apresentado neste case.","How can someone find an available court without spreading the decision across search, messages and a separate calendar? This is the starting problem framed in this case."),decision:copy("Dois lados, uma jornada: praticantes escolhem e reservam; gestores acompanham a operação.","Two sides, one journey: players choose and book; managers oversee operations."),outputs:[copy("Problema de produto","Product problem"),copy("Perfis de uso","User roles"),copy("Escopo do agendamento","Booking scope")],screen:playhubScreens.home},
  {label:copy("Estruturar","Structure"),title:copy("Organizar antes de decorar.","Structure before decoration."),body:copy("O arquivo documenta entrada, cadastro, recuperação de acesso, pesquisa de lugares, detalhes, pagamento e acompanhamento. A reserva é o eixo que conecta essas rotas.","The file documents onboarding, registration, account recovery, search, details, payment and tracking. Booking is the axis connecting these routes."),decision:copy("Separar descoberta, seleção e revisão para que cada tela responda a uma pergunta.","Separate discovery, selection and review so each screen answers one question."),outputs:[copy("Fluxo de navegação","Navigation flow"),copy("Hierarquia da informação","Information hierarchy")],screen:playhubScreens.guide},
  {label:copy("Desenhar","Wireframe"),title:copy("Dar forma ao essencial.","Give shape to the essentials."),body:copy("Os wireframes organizam busca, destaques, categorias e cards de quadras antes do acabamento visual. O objetivo é priorizar conteúdo e ações, sem depender da identidade gráfica.","Wireframes organize search, featured venues, categories and court cards before visual polish. The aim is to prioritize content and actions without relying on branding."),decision:copy("Uma estrutura que já indica o que procurar, comparar e abrir.","A structure that already indicates what to search, compare and open."),outputs:[copy("Wireframes mobile","Mobile wireframes"),copy("Ações prioritárias","Primary actions")],screen:playhubScreens.wireframe},
  {label:copy("Definir","Design"),title:copy("Uma identidade com energia de jogo.","An identity with the energy of sport."),body:copy("O guia associa o verde à energia, natureza e vitalidade dos espaços esportivos. Montserrat, escalas de cinza e regras de espaçamento organizam a linguagem do produto.","The guide links green to the energy, nature and vitality of sports spaces. Montserrat, neutral tones and spacing rules organize the product language."),decision:copy("Usar a cor para orientar ações e estados, com superfícies neutras para o conteúdo.","Use color to guide actions and states, with neutral surfaces for content."),outputs:[copy("Paleta e tipografia","Palette and typography"),copy("Estados de seleção","Selection states"),copy("Guia visual","Visual guide")],screen:playhubScreens.typography},
  {label:copy("Consolidar","Deliver"),title:copy("Do fluxo à interface documentada.","From flow to documented interface."),body:copy("As telas finais conectam descoberta, disponibilidade, pagamento e agenda. A visão administrativa amplia o sistema para quem recebe solicitações e gerencia as arenas.","The final screens connect discovery, availability, payment and calendar. The administrative view extends the system to those receiving requests and managing venues."),decision:copy("Documentar a experiência para apoiar a prototipagem e a implementação, mantendo as regras visuais consistentes.","Document the experience to support prototyping and implementation while keeping visual rules consistent."),outputs:[copy("Interface de alta fidelidade","High-fidelity UI"),copy("Fluxo do praticante","Player journey"),copy("Visão administrativa","Administrative view")],screen:playhubScreens.admin},
];
