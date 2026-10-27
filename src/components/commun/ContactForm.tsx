import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import "./NotebookSections.css";

const contactEmail=import.meta.env.VITE_CONTACT_EMAIL?.trim() || "thallesenrick9@gmail.com";
export default function ContactForm() {
  const {lang}=useI18n();const pt=lang==="pt",id=useId();
  const [name,setName]=useState(""),[email,setEmail]=useState(""),[message,setMessage]=useState(""),[opened,setOpened]=useState(false);
  const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();if(!contactEmail)return;
    const subject=(pt ? "Contato pelo portfólio: " : "Portfolio enquiry: ")+name.trim();
    const body=[(pt ? "Nome: " : "Name: ")+name.trim(),"E-mail: "+email.trim(),"",message.trim()].join("\n");
    window.location.href="mailto:"+encodeURIComponent(contactEmail)+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);setOpened(true);
  };
  return <form className="notebook-contact-form" onSubmit={handleSubmit}>
    <div className="notebook-form-row"><label htmlFor={id+"-name"}>{pt ? "Seu nome" : "Your name"}<input id={id+"-name"} name="name" autoComplete="name" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder={pt ? "Como posso te chamar?" : "What should I call you?"} /></label><label htmlFor={id+"-email"}>{pt ? "Seu e-mail" : "Your email"}<input id={id+"-email"} name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@exemplo.com" /></label></div>
    <label htmlFor={id+"-message"}>{pt ? "O que vamos criar?" : "What shall we create?"}<textarea id={id+"-message"} name="message" rows={5} required minLength={10} maxLength={1500} value={message} onChange={e=>setMessage(e.target.value)} placeholder={pt ? "Conte um pouco sobre sua ideia..." : "Tell me a little about your idea..."} /></label>
    <div className="notebook-form-footer"><p>{contactEmail ? (pt ? "Abre seu aplicativo de e-mail para revisar e enviar." : "Opens your email app so you can review and send.") : (pt ? "Contato por e-mail em breve." : "Email contact coming soon.")}</p><button type="submit" disabled={!contactEmail}>{pt ? "Preparar e-mail" : "Prepare email"}<ArrowUpRight size={18} strokeWidth={1.4} /></button></div>
    {opened && <p className="notebook-form-status" role="status">{pt ? "Revise a mensagem no seu aplicativo de e-mail e confirme o envio por lá. Se ele não abriu, seu texto continua aqui." : "Review your message in your email app and send it there. If it did not open, your text is still here."}</p>}
  </form>;
}
