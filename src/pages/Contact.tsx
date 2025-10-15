// src/pages/Contact.tsx
import { useI18n } from "../lib/i18n";
import ContactForm from "../components/commun/ContactForm";

export default function Contact() {
  const { t } = useI18n();
  return (
    <section className="pt-8 container mx-auto px-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">{t.contactTitle}</h1>
      <p className="text-slate-300 mb-6">{t.contactSubtitle}</p>
      <ContactForm />
    </section>
  );
}
