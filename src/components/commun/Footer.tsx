// src/components/commum/Footer.tsx
import { useI18n } from "../../lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="container mx-auto px-6 py-8 text-center text-sm text-gray-500 dark:text-slate-400">
        <p>
          {t.siteName} — {t.footerCopyright}
        </p>
      </div>
    </footer>
  );
}
