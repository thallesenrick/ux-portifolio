import rachaqui0 from "../assets/projects/rachaqui0.png";
import rachaqui1 from "../assets/projects/rachaqui1.png";
import extra10 from "../assets/projects/design-system-0.svg";
import extra11 from "../assets/projects/design-system-1.svg";
import extra20 from "../assets/projects/booking-0.svg";
import extra21 from "../assets/projects/booking-1.svg";
import portfolio0 from "../assets/projects/portfolio-0.png";
import portfolio1 from "../assets/projects/portfolio-1.svg";
import legis0 from "../assets/projects/legis.png";
import dashboard1 from "../assets/projects/dashboard-1.svg";
import playhub0 from "../assets/projects/playhub0.png";
import playhub1 from "../assets/projects/playhub1.png";

export interface Project {
  id: string;
  title: string;
  category: string;
  tone: "sand" | "lavender" | "mint";
  description: string;
  descriptionEn: string;
  image?: string;
  gallery?: string[];
  detailPath?: string;
}

export const projects: Project[] = [
  { id: "focus-app", detailPath:"/projects/rachaqui", gallery: [rachaqui0, rachaqui1], title: "RachAqui", category: "MOBILE / UX DESIGN", tone: "lavender", description: "Pedidos em grupo, despesas compartilhadas e a parte de cada pessoa em uma só sala.", descriptionEn: "Group orders, shared expenses and each person’s share in one room." },
  { id: "portfolio", gallery: [portfolio0, portfolio1], title: "Ecossistema Oryon System", category: "UI DESIGN / BRANDING", tone: "mint", description: "Uma nova perspectiva para presenças digitais.", descriptionEn: "A fresh perspective on digital presence." },
  { id: "dashboard", gallery: [legis0, dashboard1], title: "Oryon Legis", category: "PRODUCT DESIGN / UX", tone: "mint", description: "Dados complexos. Decisões mais simples.", descriptionEn: "Complex data. Simpler decisions." },
  { id: "commerce", detailPath:"/projects/playhub", gallery: [playhub0, playhub1], title: "PlayHub", category: "MOBILE / PRODUCT DESIGN", tone: "mint", description: "Da descoberta da quadra ao próximo jogo. Uma experiência de agendamento esportivo.", descriptionEn: "From court discovery to the next game. A sports booking experience." },
  { id: "design-system", gallery: [extra10, extra11], title: "Design System", category: "UI / DESIGN SYSTEM", tone: "sand", description: "Componentes que conectam identidade e consistência.", descriptionEn: "Components connecting identity and consistency." },
  { id: "booking", gallery: [extra20, extra21], title: "Booking Experience", category: "PRODUCT DESIGN / WEB", tone: "mint", description: "Uma experiência conceitual para descobrir destinos.", descriptionEn: "A concept experience for discovering destinations." },
];
