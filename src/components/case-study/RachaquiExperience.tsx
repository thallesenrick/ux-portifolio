import { useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Expand, MousePointer2, RotateCcw } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import { rachaquiExperienceGroups, rachaquiExperienceHotspots, rachaquiExperienceScreens, type RachaquiExperienceId } from "../../data/rachaqui-experience";
import sharedMealArt from "../../assets/projects/rachaqui/onboarding/step-1-Group1.svg";
import { RachaquiExperienceFeatures } from "./RachaquiReferenceArt";
import "./RachaquiExperience.css";

export default function RachaquiExperience() {
  const {lang}=useI18n();
  const t=(pt:string,en:string,es:string)=>lang==="pt" ? pt : lang==="es" ? es : en;
  const [screenId,setScreenId]=useState<RachaquiExperienceId>(90);
  const [showTouches,setShowTouches]=useState(false);
  const screenRef=useRef<HTMLDivElement>(null);
  const index=rachaquiExperienceScreens.findIndex(screen=>screen.id===screenId);
  const screen=rachaquiExperienceScreens[index];
  const variants=rachaquiExperienceScreens.filter(item=>item.group===screen.group);
  function go(id:RachaquiExperienceId) {
    setScreenId(id);
    requestAnimationFrame(()=>screenRef.current?.focus({preventScroll:true}));
  }
  return <section id="rq-split" className="ph-section rq-split">
    <div className="rq-ref-experience-intro"><img className="rq-ref-friends-art" src={sharedMealArt} width="543" height="470" alt={t("Amigos compartilhando uma mesa em um restaurante.","Friends sharing a restaurant table.","Amigos compartiendo una mesa en un restaurante.")} loading="lazy" /><div className="ph-section-heading"><div><span className="ph-kicker">02 / {t("PROTÓTIPO INTERATIVO","INTERACTIVE PROTOTYPE","PROTOTIPO INTERACTIVO")}</span><h2>{t("Pedir junto não significa","Ordering together does not mean","Pedir juntos no significa")}<br /><em>{t("pagar igual.","paying equally.","pagar lo mismo.")}</em></h2></div><p>{t("Da criação da sala à conferência da comanda: toque nas ações do aplicativo e explore as visões da mesa e de cada participante.","From creating a room to reviewing the bill: tap the app’s actions and explore the table and individual views.","Desde crear la sala hasta revisar la cuenta: toca las acciones de la app y explora las vistas de la mesa y de cada participante.")}</p></div><RachaquiExperienceFeatures /></div>
    <div className="rq-experience-stage">
      <aside className="rq-experience-context"><span className="ph-kicker">RACHAQUI / {t("NA PRÁTICA","IN ACTION","EN ACCIÓN")}</span><h3>{t("Uma mesa.\nSeu próximo toque.","One table.\nYour next tap.","Una mesa.\nTu próximo toque.")}</h3><p>{t("Crie uma sala, acompanhe os pedidos e alterne entre o total da mesa e o consumo individual. Toque no celular ou escolha um momento da experiência abaixo.","Create a room, follow orders and switch between the table total and individual consumption. Tap the phone or choose a moment below.","Crea una sala, sigue los pedidos y alterna entre el total de la mesa y el consumo individual. Toca el móvil o elige un momento abajo.")}</p>
      <nav className="rq-original-stages" aria-label={t("Etapas da experiência","Experience stages","Etapas de la experiencia")}>{rachaquiExperienceGroups.map((group,groupIndex)=><button type="button" key={group.en} aria-pressed={screen.group===groupIndex} onClick={()=>go(rachaquiExperienceScreens.find(item=>item.group===groupIndex)!.id)}><span>0{groupIndex+1}</span>{group[lang]}<ArrowRight size={14} /></button>)}</nav>
      <div className="rq-original-context-actions"><button type="button" aria-pressed={showTouches} onClick={()=>setShowTouches(value=>!value)}><MousePointer2 size={15} />{t("Mostrar pontos de toque","Show tap targets","Mostrar puntos de toque")}</button><button type="button" onClick={()=>go(90)}><RotateCcw size={15} />{t("Recomeçar","Restart","Reiniciar")}</button></div><span className="rq-experience-caption">{t("Explore os dados de exemplo das telas originais do projeto.","Explore the example data in the original project screens.","Explora los datos de ejemplo de las pantallas originales del proyecto.")}</span></aside>
      <div className="rq-original-demo">
        <div className="rq-experience-device" data-rq-phone>
          <div ref={screenRef} className={"rq-experience rq-original-experience "+(showTouches ? "shows-touches" : "")} role="group" tabIndex={-1} aria-label={t("Tela interativa: ","Interactive screen: ","Pantalla interactiva: ")+screen.label[lang]} data-screen-id={screen.id}>
            <img src={screen.src} width="430" height="932" alt={screen.label[lang]} draggable={false} loading="lazy" />
            {rachaquiExperienceHotspots[screenId].map((spot,spotIndex)=><button key={screenId+"-"+spotIndex} type="button" className="rq-original-hotspot" aria-label={spot.label[lang]} title={spot.label[lang]} style={{left:spot.x/430*100+"%",top:spot.y/932*100+"%",width:spot.width/430*100+"%",height:spot.height/932*100+"%"} as CSSProperties} onClick={()=>go(spot.target)} />)}
          </div>
        </div>
        <div className="rq-original-screen-info" aria-live="polite" aria-atomic="true"><strong>{screen.label[lang]}</strong><p>{screen.hint[lang]}</p></div>
        <div className="rq-original-variants" aria-label={t("Estados desta etapa","States of this stage","Estados de esta etapa")}>{variants.map(item=><button type="button" key={item.id} aria-pressed={screenId===item.id} onClick={()=>go(item.id)}>{item.label[lang]}</button>)}</div>
        <div className="rq-original-navigation"><button type="button" disabled={index===0} onClick={()=>go(rachaquiExperienceScreens[index-1].id)} aria-label={t("Tela anterior","Previous screen","Pantalla anterior")}><ArrowLeft size={18} /></button><span>{String(index+1).padStart(2,"0")} / {rachaquiExperienceScreens.length}</span><button type="button" disabled={index===rachaquiExperienceScreens.length-1} onClick={()=>go(rachaquiExperienceScreens[index+1].id)} aria-label={t("Próxima tela","Next screen","Siguiente pantalla")}><ArrowRight size={18} /></button><a href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={t("Abrir tela original","Open original screen","Abrir pantalla original")}><Expand size={17} /></a></div>
      </div>
    </div>
  </section>;
}
