import home from "../assets/projects/rachaqui/home.png";
import create from "../assets/projects/rachaqui/create.png";
import room from "../assets/projects/rachaqui/room.png";
import individual from "../assets/projects/rachaqui/individual.png";
import orders from "../assets/projects/rachaqui/orders.png";
import bill from "../assets/projects/rachaqui/bill.png";
import guide from "../assets/projects/rachaqui/guide.png";
import system from "../assets/projects/rachaqui/system.png";
import loginLight from "../assets/projects/rachaqui/login-light.png";
import loginDark from "../assets/projects/rachaqui/login-dark.png";
import {copy,type CaseScreen} from "./case-study";
export const rachaquiFigma="https://www.figma.com/design/zuvKCtfqxVAK8ycohBEYh9/RachAqui?node-id=1-2";
const phone=(src:string,pt:string,en:string):CaseScreen=>({src,label:copy(pt,en),width:430,height:932});
export const rachaquiScreens={
  home:phone(home,"Início e atividades recentes","Home and recent activity"),
  create:phone(create,"Criação de uma sala","Creating a room"),
  room:phone(room,"Visão do total da mesa","Shared table total"),
  individual:phone(individual,"Visão do consumo individual","Individual consumption view"),
  orders:phone(orders,"Participantes e pedidos recentes","Participants and recent orders"),
  bill:phone(bill,"Revisão da comanda","Bill review"),
  loginLight:phone(loginLight,"Acesso em tema claro","Sign-in in light mode"),
  loginDark:phone(loginDark,"Acesso em tema escuro","Sign-in in dark mode"),
  guide:{src:guide,label:copy("Conceito e regras do produto","Product concept and rules"),width:595,height:713},
  system:{src:system,label:copy("Tipografia, cores e componentes","Typography, colors and components"),width:1858,height:2327},
};
export const rachaquiJourney=[
  {title:copy("Criar sala","Create room"),question:copy("Um lugar para reunir a conta.","One place to bring the bill together."),body:copy("O anfitrião dá nome à sala e escolhe o contexto do encontro. A conta deixa de ser uma conversa solta e passa a ter um espaço compartilhado.","The host names the room and chooses the context of the gathering. The bill moves from scattered conversations to one shared space."),decision:copy("Começar pelo contexto, sem antecipar todos os detalhes do consumo.","Start with context without demanding every consumption detail up front."),screen:rachaquiScreens.create},
  {title:copy("Reunir","Gather"),question:copy("O grupo aparece na interface.","The group becomes visible."),body:copy("A sala apresenta os participantes, o papel de administrador e o total da mesa. A proposta documentada prevê convites por link ou código.","The room presents participants, the administrator role and the table total. The documented proposal includes invitations by link or code."),decision:copy("Tornar visível quem participa e qual é o contexto da divisão.","Make participation and the context of the split visible."),screen:rachaquiScreens.room},
  {title:copy("Adicionar","Add items"),question:copy("Cada pedido tem participantes.","Every order has participants."),body:copy("Os pedidos recentes mostram os itens e as pessoas associadas a eles. Um item pode ser individual ou compartilhado, sem exigir que toda a mesa consuma as mesmas coisas.","Recent orders show items and the people associated with them. An item can be individual or shared without assuming the whole table consumed the same things."),decision:copy("Dividir o item com quem consumiu, em vez de dividir tudo por igual.","Split each item among its consumers rather than splitting everything equally."),screen:rachaquiScreens.orders},
  {title:copy("Conferir","Check"),question:copy("Minha parte, sem perder o todo.","My share, without losing the whole."),body:copy("As visões individual e total da mesa separam duas necessidades: acompanhar o próprio consumo e entender a conta do grupo.","Individual and table-total views separate two needs: following personal consumption and understanding the group's bill."),decision:copy("Alternar a perspectiva sem abandonar a mesma sala.","Switch perspectives without leaving the room."),screen:rachaquiScreens.individual},
  {title:copy("Revisar","Review"),question:copy("Uma comanda para fechar a conversa.","A bill that closes the conversation."),body:copy("A revisão reúne itens, valores e participantes antes de finalizar. A interface oferece um momento de conferência para o anfitrião.","Review brings together items, amounts and participants before finalization. The interface gives the host a checkpoint."),decision:copy("Manter o detalhamento acessível antes de encerrar a sala.","Keep the breakdown accessible before closing the room."),screen:rachaquiScreens.bill},
];
export const rachaquiProcess=[
  {label:copy("Definir a regra","Define the rule"),title:copy("Compartilhar não é consumir igual.","Sharing does not mean equal consumption."),body:copy("O guia parte de uma regra central: cada participante escolhe com quem divide cada item. O anfitrião acompanha o grupo, enquanto cada pessoa enxerga seu total parcial.","The guide starts from one central rule: each participant chooses whom to split each item with. The host oversees the group while each person sees their partial total."),tags:[copy("Anfitrião e participantes","Host and participants"),copy("Divisão por item","Per-item splitting")],screen:rachaquiScreens.guide},
  {label:copy("Organizar a jornada","Structure the journey"),title:copy("Uma sala, diferentes momentos.","One room, different moments."),body:copy("Início, criação de sala, participantes, consumo e comanda compõem a jornada. Estados vazios orientam a primeira ação, e a sala preserva o contexto durante a divisão.","Home, room creation, participants, consumption and bill review form the journey. Empty states guide the first action and the room preserves context throughout the split."),tags:[copy("Criação de sala","Room creation"),copy("Estados vazios","Empty states")],screen:rachaquiScreens.create},
  {label:copy("Sistematizar o visual","Systematize the visual language"),title:copy("Consistência em cada interação.","Consistency in every interaction."),body:copy("O arquivo documenta cores, Montserrat, arredondamentos, espaçamentos e variações de componentes. A identidade combina vermelho e laranja, com especificações para temas claro e escuro.","The file documents colors, Montserrat, corner radii, spacing and component variants. The identity combines red and orange, with specifications for light and dark themes."),tags:[copy("Guia de componentes","Component guide"),copy("Light & dark","Light & dark")],screen:rachaquiScreens.system},
  {label:copy("Consolidar a interface","Consolidate the interface"),title:copy("Do consumo ao resumo final.","From consumption to the final summary."),body:copy("As telas de alta fidelidade dão forma ao acompanhamento individual e coletivo. A revisão da comanda é o ponto de fechamento mostrado no material, antes de evoluir as regras de pagamento.","High-fidelity screens give shape to individual and collective tracking. Bill review is the closing point shown in the material, before evolving payment rules."),tags:[copy("Comanda detalhada","Detailed bill"),copy("Conferência dos totais","Totals review")],screen:rachaquiScreens.bill},
];
