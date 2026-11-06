import { copy } from "./case-study";
import type { CaseScreen } from "./case-study";
import screen7 from "../assets/projects/playhub/originals/screen-7.png";
import screen12 from "../assets/projects/playhub/originals/screen-12.png";
import screen13 from "../assets/projects/playhub/originals/screen-13.png";
import screen16 from "../assets/projects/playhub/originals/screen-16.png";
import screen17 from "../assets/projects/playhub/originals/screen-17.png";
import screen18 from "../assets/projects/playhub/originals/screen-18.png";
import screen19 from "../assets/projects/playhub/originals/screen-19.png";
import screen20 from "../assets/projects/playhub/originals/screen-20.png";
import screen21 from "../assets/projects/playhub/originals/screen-21.png";
import screen22 from "../assets/projects/playhub/originals/screen-22.png";
import screen24 from "../assets/projects/playhub/originals/screen-24.png";
import screen26 from "../assets/projects/playhub/originals/screen-26.png";
import screen28 from "../assets/projects/playhub/originals/screen-28.png";
import screen29 from "../assets/projects/playhub/originals/screen-29.png";
import screen30 from "../assets/projects/playhub/originals/screen-30.png";
import screen31 from "../assets/projects/playhub/originals/screen-31.png";
import screen32 from "../assets/projects/playhub/originals/screen-32.png";
import screen33 from "../assets/projects/playhub/originals/screen-33.png";
import screen34 from "../assets/projects/playhub/originals/screen-34.png";
import screen36 from "../assets/projects/playhub/originals/screen-36.png";
import screen38 from "../assets/projects/playhub/originals/screen-38.png";
import screen39 from "../assets/projects/playhub/originals/screen-39.png";
import screen40 from "../assets/projects/playhub/originals/screen-40.png";
import screen41 from "../assets/projects/playhub/originals/screen-41.png";

export const playhubOriginals: (CaseScreen & { id: number })[] = [
  {id:7,src:screen7,label:copy("Lista de quadras","Court list"),width:786,height:1704},
  {id:12,src:screen12,label:copy("Seleção de data e horário","Date and time selection"),width:393,height:852},
  {id:13,src:screen13,label:copy("Detalhes e disponibilidade","Details and availability"),width:393,height:852},
  {id:16,src:screen16,label:copy("Agenda sem reservas","Empty booking calendar"),width:786,height:1704},
  {id:17,src:screen17,label:copy("Painel da arena","Venue dashboard"),width:393,height:852},
  {id:18,src:screen18,label:copy("Revisão do pagamento","Payment review"),width:393,height:852},
  {id:19,src:screen19,label:copy("Resumo com Pix","Pix summary"),width:393,height:852},
  {id:20,src:screen20,label:copy("Resumo com cartão","Card summary"),width:786,height:1704},
  {id:21,src:screen21,label:copy("Resumo com pagamento no local","Pay at venue summary"),width:786,height:1704},
  {id:22,src:screen22,label:copy("Wireframe de descoberta","Discovery wireframe"),width:393,height:852},
  {id:24,src:screen24,label:copy("Wireframe de detalhes","Details wireframe"),width:393,height:852},
  {id:26,src:screen26,label:copy("Wireframe de agenda","Calendar wireframe"),width:393,height:852},
  {id:28,src:screen28,label:copy("Wireframe administrativo","Admin wireframe"),width:393,height:852},
  {id:29,src:screen29,label:copy("Login","Sign in"),width:393,height:852},
  {id:30,src:screen30,label:copy("Cadastro","Sign up"),width:786,height:1704},
  {id:31,src:screen31,label:copy("Recuperação de senha","Password recovery"),width:786,height:1704},
  {id:32,src:screen32,label:copy("Código de recuperação","Recovery code"),width:393,height:852},
  {id:33,src:screen33,label:copy("Nova senha","New password"),width:786,height:1704},
  {id:34,src:screen34,label:copy("Abertura do aplicativo","App splash"),width:786,height:1704},
  {id:36,src:screen36,label:copy("Como reservar uma quadra","How to book a court"),width:393,height:852},
  {id:38,src:screen38,label:copy("Descoberta de quadras","Court discovery"),width:1179,height:2556},
  {id:39,src:screen39,label:copy("Agenda de reservas","Booking calendar"),width:393,height:852},
  {id:40,src:screen40,label:copy("Boas-vindas: futebol","Welcome: football"),width:393,height:852},
  {id:41,src:screen41,label:copy("Boas-vindas: modalidades","Welcome: sports"),width:393,height:852},
];
export const playhubMotion = {
  onboarding: {video:"/playhub/motion/onboarding.webm",gif:"/playhub/motion/onboarding.gif",screens:[40,41,36,29].map(id=>playhubOriginals.find(screen=>screen.id===id)!)},
  booking: {video:"/playhub/motion/booking.webm",gif:"/playhub/motion/booking.gif",screens:[38,13,12,18,19,39].map(id=>playhubOriginals.find(screen=>screen.id===id)!)},
  payment: {video:"/playhub/motion/payment.webm",gif:"/playhub/motion/payment.gif",screens:[18,19,20,21].map(id=>playhubOriginals.find(screen=>screen.id===id)!)},
};
