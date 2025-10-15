// src/components/commum/ContactForm.tsx
import React, { useState } from "react";
import { useI18n } from "../../lib/i18n";

export default function ContactForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSent(false);
    }, 1800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto grid gap-4 text-gray-800 dark:text-gray-100 transition-colors"
    >
      <input
        placeholder={t.navContact}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition"
        required
      />
      <input
        placeholder="email@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition"
        required
      />
      <textarea
        placeholder="Sua mensagem"
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-3 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none transition"
        required
      />
      <button
        type="submit"
        className="py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
      >
        Enviar
      </button>

      {sent && (
        <p className="text-green-600 dark:text-green-400 text-center">
          Mensagem enviada (mock)
        </p>
      )}
    </form>
  );
}
