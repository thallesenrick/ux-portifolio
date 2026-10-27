import { copy, type CaseScreen } from "./case-study";
import presence from "../assets/projects/legis/presence.png";
import timeline from "../assets/projects/legis/timeline.png";
import vote from "../assets/projects/legis/vote.png";
import results from "../assets/projects/legis/results.png";
import speakers from "../assets/projects/legis/speakers.png";
import confirmation from "../assets/projects/legis/confirmation.png";

export const legisFigma = "https://www.figma.com/design/gG2FrJuZhYqCayavqOKa54/Oryon-System---Oryon-Legis?node-id=1910-128";
const screen = (src: string, pt: string, en: string): CaseScreen => ({ src, label: copy(pt, en), width: 1440, height: 960 });
export const legisScreens = {
  presence: screen(presence, "Legis · Chamada dos parlamentares", "Legis · Attendance roll call"),
  timeline: screen(timeline, "Legis · Fluxo da sessão", "Legis · Session flow"),
  vote: screen(vote, "Legis · Registro do voto", "Legis · Casting a vote"),
  results: screen(results, "Legis · Acompanhamento da votação", "Legis · Vote overview"),
  speakers: screen(speakers, "Legis · Oradores e tempo de fala", "Legis · Speakers and speaking time"),
  confirmation: screen(confirmation, "Legis · Confirmação de presença", "Legis · Attendance confirmation"),
};
export const legisMoments = [
  { title: copy("Presença", "Attendance"), headline: copy("Quem está presente precisa estar visível.", "Attendance needs to be visible."), body: copy("A chamada reúne parlamentares em cartões e apresenta contagem e categorias ao lado. O estado individual pode ser lido junto à visão do conjunto.", "Roll call groups members in cards and presents counts and categories alongside them. Individual states can be read together with the overall picture."), reason: copy("Foto, nome e texto do estado aproximam identidade e situação. As estatísticas oferecem uma segunda escala de leitura.", "Photo, name and status text connect identity and state. Statistics offer a second reading scale."), screen: legisScreens.presence },
  { title: copy("Roteiro", "Agenda"), headline: copy("A sessão tem um fio condutor.", "The session has a guiding thread."), body: copy("O painel de fluxo agrupa os momentos da sessão, marca etapas e mantém o roteiro próximo dos controles da presidência.", "The flow panel groups the session's moments, marks stages and keeps the agenda close to the chair's controls."), reason: copy("Um roteiro visível ajuda a localizar o momento atual sem depender apenas da memória de quem conduz.", "A visible agenda helps locate the current moment without relying solely on the chair's memory."), screen: legisScreens.timeline },
  { title: copy("Voto", "Vote"), headline: copy("Uma decisão, três opções explícitas.", "One decision, three explicit choices."), body: copy("A matéria em votação dá contexto à ação. Sim, não e abstenção aparecem com rótulos diretos e grandes áreas de interação.", "The item being voted on gives the action context. Yes, no and abstention appear with direct labels and large interaction areas."), reason: copy("A cor reforça a distinção, enquanto o texto mantém o significado de cada escolha legível.", "Color reinforces the distinction, while text keeps each choice's meaning readable."), screen: legisScreens.vote },
  { title: copy("Placar", "Overview"), headline: copy("O individual encontra o coletivo.", "Individual choices meet the collective view."), body: copy("O acompanhamento coloca os estados dos parlamentares junto às estatísticas da votação, com uma composição próxima à usada na chamada.", "The overview places members' states alongside voting statistics, with a composition close to the attendance view."), reason: copy("Reaproveitar a organização visual mantém a leitura familiar quando muda o contexto da sessão.", "Reusing the visual organization keeps reading familiar as the session context changes."), screen: legisScreens.results },
  { title: copy("Oradores", "Speakers"), headline: copy("Dar a palavra também é organizar o tempo.", "Giving the floor also means organizing time."), body: copy("A lista de oradores apresenta ordem e tempo disponível. Ao lado, os controles reúnem iniciar, pausar, encerrar e acrescentar tempo.", "The speaker list presents order and available time. Alongside it, controls gather start, pause, stop and add-time actions."), reason: copy("Fila e orador atual ficam próximos, com o cronômetro em evidência para apoiar a condução.", "The queue and current speaker stay close, with a prominent timer supporting session management."), screen: legisScreens.speakers },
];
