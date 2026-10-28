import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import type { CaseCopy } from "../../data/case-study";
import background from "../../assets/projects/rachaqui/onboarding/step-1-IPhone14ProMax5711.png";
import secondBackground from "../../assets/projects/rachaqui/onboarding/step-2-IPhone14ProMax581.png";
import thirdBackground from "../../assets/projects/rachaqui/onboarding/step-3-IPhone14ProMax5931.png";
import welcomeArt from "../../assets/projects/rachaqui/onboarding/step-1-Group1.svg";
import welcomeMask from "../../assets/projects/rachaqui/onboarding/step-1-Group.svg";
import ordersArt from "../../assets/projects/rachaqui/onboarding/step-2-Group1.svg";
import ordersMask from "../../assets/projects/rachaqui/onboarding/step-2-Group.svg";
import sharedArt from "../../assets/projects/rachaqui/onboarding/step-3-Frame221.png";
import nextArrow from "../../assets/projects/rachaqui/onboarding/step-1-Group2405.svg";
import statusBar from "../../assets/projects/rachaqui/onboarding/step-2-StatusBar.png";
import battery from "../../assets/projects/rachaqui/onboarding/step-2-Battery.svg";
import wifi from "../../assets/projects/rachaqui/onboarding/step-2-Wifi.svg";
import signal from "../../assets/projects/rachaqui/onboarding/step-2-CellularConnection.svg";
import "./RachaquiOnboarding.css";

const steps: { title: CaseCopy; body: CaseCopy; label: CaseCopy; art: string; mask?: string; node: string }[] = [
  {
    title: { pt: "Seja Bem Vindo(a)!", en: "Welcome!", es: "¡Te damos la bienvenida!" },
    body: { pt: "Com o RachAqui, rachar a conta no rolê com os amigos ficou fácil e sem estresse!", en: "With RachAqui, splitting the bill with friends is easy and stress-free!", es: "¡Con RachAqui, dividir la cuenta con amigos es fácil y sin estrés!" },
    label: { pt: "Um convite para compartilhar", en: "An invitation to share", es: "Una invitación a compartir" },
    art: welcomeArt, mask: welcomeMask, node: "1:3996",
  },
  {
    title: { pt: "Pedidos Coletivo", en: "Group orders", es: "Pedidos en grupo" },
    body: { pt: "Adicione itens e convide seus amigos. Todos podem ver e adicionar seus próprios pratos.", en: "Add items and invite your friends. Everyone can see and add their own dishes.", es: "Añade productos e invita a tus amigos. Todos pueden ver y añadir sus propios platos." },
    label: { pt: "Todo mundo participa", en: "Everyone takes part", es: "Todo el mundo participa" },
    art: ordersArt, mask: ordersMask, node: "1:4494",
  },
  {
    title: { pt: "Divisão Automática", en: "Automatic splitting", es: "División automática" },
    body: { pt: "O app divide a conta automaticamente, e cada um paga pelos itens que escolheu.", en: "The app splits the bill automatically, and everyone pays for the items they chose.", es: "La app divide la cuenta automáticamente y cada persona paga por lo que eligió." },
    label: { pt: "Cada um com a sua parte", en: "Everyone gets their share", es: "Cada persona con su parte" },
    art: sharedArt, node: "1:4812",
  },
];

const copy = {
  pt: { kicker: "PRIMEIRO CONTATO / ONBOARDING", title: "Antes da conta,", accent: "um convite.", body: "A experiência começa com gente reunida. Três telas apresentam a proposta do RachAqui: pedir junto, compartilhar a mesa e entender a parte de cada pessoa.", hint: "Explore pelas setas do celular ou escolha uma etapa.", group: "Etapas do onboarding", phone: "Onboarding interativo do RachAqui. Use as setas para a esquerda e para a direita para navegar.", next: "Próxima tela do onboarding", skip: "Pular", start: "Comece agora", restart: "Recomeçar", original: "Ver desenho no Figma", caption: "DO PRIMEIRO CONVITE À CONTA COMPARTILHADA" },
  en: { kicker: "FIRST CONTACT / ONBOARDING", title: "Before the bill,", accent: "an invitation.", body: "The experience starts with people coming together. Three screens introduce RachAqui: order together, share the table and understand everyone's share.", hint: "Use the phone arrows or choose a step to explore.", group: "Onboarding steps", phone: "Interactive RachAqui onboarding. Use the left and right arrow keys to navigate.", next: "Next onboarding screen", skip: "Skip", start: "Get started", restart: "Start again", original: "View design in Figma", caption: "FROM THE FIRST INVITATION TO A SHARED BILL" },
  es: { kicker: "PRIMER CONTACTO / ONBOARDING", title: "Antes de la cuenta,", accent: "una invitación.", body: "La experiencia comienza reuniendo a las personas. Tres pantallas presentan RachAqui: pedir juntos, compartir la mesa y entender la parte de cada persona.", hint: "Usa las flechas del móvil o elige una etapa para explorar.", group: "Etapas de bienvenida", phone: "Bienvenida interactiva de RachAqui. Usa las flechas izquierda y derecha para navegar.", next: "Siguiente pantalla de bienvenida", skip: "Omitir", start: "Empieza ahora", restart: "Volver a empezar", original: "Ver diseño en Figma", caption: "DE LA PRIMERA INVITACIÓN A LA CUENTA COMPARTIDA" },
};

export default function RachaquiOnboarding() {
  const { lang } = useI18n();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const ui = copy[lang];
  const current = steps[active];

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActive(previous => Math.max(0, Math.min(steps.length - 1, previous + (event.key === "ArrowRight" ? 1 : -1))));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : steps.length - 1);
    }
  }

  return <section className="ph-section rq-onboarding" id="rq-onboarding" aria-labelledby="rq-onboarding-title">
    <div className="rq-onboarding-copy">
      <span className="ph-kicker">{ui.kicker}</span>
      <h2 id="rq-onboarding-title">{ui.title}<br /><em>{ui.accent}</em></h2>
      <p>{ui.body}</p>
      <div className="rq-onboarding-steps" role="group" aria-label={ui.group}>
        {steps.map((step, index) => <button type="button" key={step.node} aria-pressed={active === index} aria-controls="rq-onboarding-preview" onClick={() => setActive(index)}>
          <span>0{index + 1}</span><strong>{step.label[lang]}</strong><ArrowUpRight size={16} aria-hidden="true" />
        </button>)}
      </div>
      <p className="rq-onboarding-hint">{ui.hint}</p>
      <a className="rq-onboarding-source" href="https://www.figma.com/design/zuvKCtfqxVAK8ycohBEYh9/RachAqui?node-id=132-932" target="_blank" rel="noopener noreferrer">{ui.original}<ArrowUpRight size={15} /></a>
    </div>
    <div className="rq-onboarding-stage">
      <div className="rq-onboarding-device" id="rq-onboarding-preview" role="group" aria-label={ui.phone} tabIndex={0} onKeyDown={handleKeys}>
        <div className="rq-onboarding-screen" data-step={active + 1} data-node-id={current.node}>
          {steps.map((step, index) => <motion.div className={"rq-onboarding-art rq-onboarding-art--" + index} key={step.node} initial={false} animate={{ opacity: active === index ? 1 : 0, x: reduce ? 0 : active === index ? 0 : index < active ? -14 : 14 }} transition={{ duration: reduce ? 0 : .28 }} aria-hidden="true">
            <img className="rq-onboarding-background" src={index === 2 ? thirdBackground : background} alt="" loading="lazy" decoding="async" />
            {index === 1 && <img className="rq-onboarding-background rq-onboarding-background--second" src={secondBackground} alt="" loading="lazy" decoding="async" />}
            {index > 0 && <div className="rq-onboarding-status"><img src={statusBar} className="rq-onboarding-status-bg" alt="" /><span>9:27</span><div><img src={signal} alt="" /><img src={wifi} alt="" /><img src={battery} alt="" /></div></div>}
            <div className="rq-onboarding-illustration">
              {step.mask ? <div className="rq-onboarding-illustration-mask" style={{ maskImage: `url("${step.mask}")` }}><img src={step.art} alt="" loading="lazy" decoding="async" /></div> : <img src={step.art} alt="" loading="lazy" decoding="async" />}
            </div>
          </motion.div>)}
          <div className="rq-onboarding-sheet" />
          <div className="rq-onboarding-message" aria-live="polite" aria-atomic="true"><h3>{current.title[lang]}</h3><p>{current.body[lang]}</p></div>
          <div className="rq-onboarding-dots" role="group" aria-label={ui.group}>{steps.map((step, index) => <button key={step.node} type="button" aria-label={step.title[lang]} aria-pressed={active === index} onClick={() => setActive(index)} />)}</div>
          {active < steps.length - 1 ? <><a className="rq-onboarding-skip" href="#rq-split">{ui.skip}</a><button className="rq-onboarding-next" type="button" onClick={() => setActive(previous => Math.min(steps.length - 1, previous + 1))} aria-label={ui.next}><img src={nextArrow} alt="" /></button></> : <a className="rq-onboarding-start" href="#rq-split">{ui.start}</a>}
        </div>
      </div>
      <div className="rq-onboarding-stage-footer"><span>0{active + 1} / 03</span><button type="button" onClick={() => setActive(0)} disabled={active === 0}><RotateCcw size={13} />{ui.restart}</button></div>
      <span className="rq-onboarding-caption">{ui.caption}</span>
    </div>
  </section>;
}
