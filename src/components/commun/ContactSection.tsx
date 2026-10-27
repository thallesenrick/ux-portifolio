import { ArrowDownLeft, Mail } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import ContactForm from "./ContactForm";
import "./NotebookSections.css";

export default function ContactSection() {
  const {lang}=useI18n();const pt=lang==="pt";
  return <section id="contact" className="notebook-section contact-section" aria-labelledby="contact-heading"><div className="notebook-heading"><span className="notebook-eyebrow"><Mail size={15} aria-hidden="true" />{pt ? "VAMOS CONVERSAR" : "LET'S TALK"}</span><h2 id="contact-heading">{pt ? "Uma boa ideia começa" : "A good idea starts"}<br /><em>{pt ? "com uma conversa." : "with a conversation."}</em></h2><p>{pt ? "Tem um projeto em mente ou quer trocar ideias? Me conte um pouco do que você está imaginando." : "Have a project in mind or want to exchange ideas? Tell me a little about what you are imagining."}</p><span className="contact-handnote">{pt ? "seu próximo projeto pode começar aqui" : "your next project can start here"}<ArrowDownLeft size={38} strokeWidth={1} aria-hidden="true" /></span></div><div className="contact-paper"><ContactForm /></div></section>;
}
