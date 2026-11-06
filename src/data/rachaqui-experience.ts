import { copy, type CaseCopy, type CaseScreen } from "./case-study";
import screen90 from "../assets/projects/rachaqui/experience-source/screen-90.png";
import screen89 from "../assets/projects/rachaqui/experience-source/screen-89.png";
import screen92 from "../assets/projects/rachaqui/experience-source/screen-92.png";
import screen93 from "../assets/projects/rachaqui/experience-source/screen-93.png";
import screen94 from "../assets/projects/rachaqui/experience-source/screen-94.png";
import screen95 from "../assets/projects/rachaqui/experience-source/screen-95.png";
import screen100 from "../assets/projects/rachaqui/experience-source/screen-100.png";
import screen101 from "../assets/projects/rachaqui/experience-source/screen-101.png";
import screen96 from "../assets/projects/rachaqui/experience-source/screen-96.png";
import screen97 from "../assets/projects/rachaqui/experience-source/screen-97.png";
import screen98 from "../assets/projects/rachaqui/experience-source/screen-98.png";
import screen99 from "../assets/projects/rachaqui/experience-source/screen-99.png";
import screen46 from "../assets/projects/rachaqui/experience-source/screen-46.png";
import screen102 from "../assets/projects/rachaqui/experience-source/screen-102.png";

export type RachaquiExperienceId = 90 | 89 | 92 | 93 | 94 | 95 | 100 | 101 | 96 | 97 | 98 | 99 | 46 | 102;
export type ExperienceHotspot = { target:RachaquiExperienceId; label:CaseCopy; x:number; y:number; width:number; height:number };
export type RachaquiExperienceScreen = CaseScreen & {id:RachaquiExperienceId;group:number;hint:CaseCopy};
export const rachaquiExperienceScreens:RachaquiExperienceScreen[] = [
  {id:90,src:screen90,width:430,height:932,label:{...copy("Início sem atividades","Home without activity"),es:"Inicio sin actividad"},group:0,hint:{pt:"Toque em Criar Nova sala para começar.",en:"Tap Create new room to begin.",es:"Toca Crear nueva sala para empezar."}},
  {id:89,src:screen89,width:430,height:932,label:{...copy("Atividades recentes","Recent activity"),es:"Actividad reciente"},group:0,hint:{pt:"Abra uma atividade recente ou crie outra sala.",en:"Open a recent activity or create another room.",es:"Abre una actividad reciente o crea otra sala."}},
  {id:92,src:screen92,width:430,height:932,label:{...copy("Criar sala: formulário vazio","Create room: empty form"),es:"Crear sala: formulario vacío"},group:1,hint:{pt:"Toque em um campo para usar os dados do exemplo.",en:"Tap a field to use the example details.",es:"Toca un campo para usar los datos del ejemplo."}},
  {id:93,src:screen93,width:430,height:932,label:{...copy("Criar sala: dados preenchidos","Create room: completed form"),es:"Crear sala: datos completos"},group:1,hint:{pt:"Toque em Comece Agora para abrir a mesa.",en:"Tap Start now to open the table.",es:"Toca Empezar ahora para abrir la mesa."}},
  {id:94,src:screen94,width:430,height:932,label:{...copy("Mesa vazia","Empty table"),es:"Mesa vacía"},group:2,hint:{pt:"Use o botão + para abrir a inclusão de um item.",en:"Use the + button to open the add-item screen.",es:"Usa el botón + para abrir la pantalla de añadir producto."}},
  {id:95,src:screen95,width:430,height:932,label:{...copy("Mesa com participantes","Table with participants"),es:"Mesa con participantes"},group:2,hint:{pt:"Explore a mesa com o grupo ou adicione um pedido.",en:"Explore the table with the group or add an order.",es:"Explora la mesa con el grupo o añade un pedido."}},
  {id:100,src:screen100,width:430,height:932,label:{...copy("Adicionar item: formulário vazio","Add item: empty form"),es:"Añadir producto: formulario vacío"},group:3,hint:{pt:"Toque no nome ou valor para usar o pedido do exemplo.",en:"Tap the name or price to use the example order.",es:"Toca el nombre o el precio para usar el pedido del ejemplo."}},
  {id:101,src:screen101,width:430,height:932,label:{...copy("Adicionar item: Batata Frita","Add item: fries"),es:"Añadir producto: patatas fritas"},group:3,hint:{pt:"O exemplo já seleciona Júlia. Toque em Adicionar.",en:"The example selects Júlia. Tap Add.",es:"El ejemplo selecciona a Júlia. Toca Añadir."}},
  {id:96,src:screen96,width:430,height:932,label:{...copy("Total da mesa","Table total"),es:"Total de la mesa"},group:4,hint:{pt:"Alterne a visão individual, toque em Júlia ou confira a comanda.",en:"Switch to the individual view, tap Júlia or review the bill.",es:"Cambia a la vista individual, toca a Júlia o revisa la cuenta."}},
  {id:97,src:screen97,width:430,height:932,label:{...copy("Consumo de Raphael","Raphael’s consumption"),es:"Consumo de Raphael"},group:4,hint:{pt:"Toque em Total da mesa para voltar à visão do grupo.",en:"Tap Table total to return to the group view.",es:"Toca Total de la mesa para volver a la vista del grupo."}},
  {id:98,src:screen98,width:430,height:932,label:{...copy("Consumo de Júlia","Júlia’s consumption"),es:"Consumo de Júlia"},group:4,hint:{pt:"Confira a visão individual de Júlia ou abra os pedidos recentes.",en:"Explore Júlia’s individual view or open recent orders.",es:"Explora la vista individual de Júlia o abre los pedidos recientes."}},
  {id:99,src:screen99,width:430,height:932,label:{...copy("Pedidos recentes","Recent orders"),es:"Pedidos recientes"},group:4,hint:{pt:"Toque em + para incluir um item ou no ícone da comanda para conferir.",en:"Tap + to add an item or the bill icon to review.",es:"Toca + para añadir un producto o el icono de la cuenta para revisar."}},
  {id:46,src:screen46,width:430,height:932,label:{...copy("Comanda","Bill"),es:"Cuenta"},group:5,hint:{pt:"Toque em Finalizar para abrir a confirmação de encerramento.",en:"Tap Finish to open the closing confirmation.",es:"Toca Finalizar para abrir la confirmación de cierre."}},
  {id:102,src:screen102,width:430,height:932,label:{...copy("Confirmação de encerramento","Closing confirmation"),es:"Confirmación de cierre"},group:5,hint:{pt:"Continue pedindo ou encerre e volte ao início.",en:"Continue ordering or close and return home.",es:"Sigue pidiendo o cierra y vuelve al inicio."}},
];
export const rachaquiExperienceGroups:CaseCopy[] = [
 {pt:"Início",en:"Home",es:"Inicio"},{pt:"Criar sala",en:"Create room",es:"Crear sala"},{pt:"A mesa",en:"The table",es:"La mesa"},{pt:"Adicionar pedido",en:"Add an order",es:"Añadir pedido"},{pt:"Consumo",en:"Consumption",es:"Consumo"},{pt:"Comanda",en:"Bill",es:"Cuenta"},
];
const hot=(target:RachaquiExperienceId,pt:string,en:string,x:number,y:number,width:number,height:number):ExperienceHotspot=>({target,label:copy(pt,en),x,y,width,height});
const create=hot(92,"Criar Nova sala","Create new room",230,266,158,52);
const add=hot(100,"Adicionar item","Add item",164,797,100,104);
const bill=hot(46,"Conferir comanda","Review bill",46,853,75,70);
const total=hot(96,"Ver total da mesa","View table total",28,151,402,80);
const individual=hot(97,"Ver consumo de Raphael","View Raphael's consumption",28,151,402,80);
const julia=hot(98,"Ver consumo de Júlia","View Júlia's consumption",27,527,376,73);
const orders=hot(99,"Ver pedidos recentes","View recent orders",10,769,150,45);
export const rachaquiExperienceHotspots:Record<RachaquiExperienceId,ExperienceHotspot[]> = {
  90:[create],
  89:[create,hot(96,"Abrir Happy Hour","Open Happy Hour",309,496,121,238)],
  92:[hot(90,"Voltar ao início","Back to home",19,503,51,52),hot(93,"Usar nome da sala do exemplo","Use example room name",28,623,375,55),hot(93,"Usar tipo da sala do exemplo","Use example room type",28,749,375,56),hot(93,"Usar dados do exemplo","Use example details",28,840,375,56)],
  93:[hot(92,"Voltar ao formulário vazio","Back to empty form",19,503,51,52),hot(94,"Comece Agora","Start now",28,840,375,56)],
  94:[hot(90,"Voltar ao início","Back to home",16,50,49,51),add,bill],
  95:[hot(90,"Voltar ao início","Back to home",16,50,49,51),add,bill],
  100:[hot(99,"Voltar aos pedidos","Back to orders",18,232,52,54),hot(101,"Usar item Batata Frita do exemplo","Use example fries item",28,339,375,55),hot(101,"Usar valor do exemplo","Use example price",28,466,375,54),hot(101,"Selecionar Júlia no exemplo","Select Júlia in the example",28,597,376,64)],
  101:[hot(100,"Voltar ao formulário vazio","Back to empty form",18,238,52,52),hot(96,"Adicionar","Add",28,845,375,53)],
  96:[hot(89,"Voltar ao início","Back to home",16,50,49,51),individual,julia,orders,add,bill],
  97:[hot(89,"Voltar ao início","Back to home",16,50,49,51),total,julia,orders,add,bill],
  98:[hot(89,"Voltar ao início","Back to home",16,50,49,51),total,orders,add,bill],
  99:[hot(98,"Voltar à visão individual","Back to individual view",29,41,400,80),add,bill],
  46:[hot(96,"Voltar à mesa","Back to table",16,50,49,51),hot(102,"Finalizar","Finish",28,842,375,56)],
  102:[hot(99,"Continuar Pedindo","Continue ordering",65,515,304,62),hot(89,"Encerrar","Close table",65,606,304,62)],
};
