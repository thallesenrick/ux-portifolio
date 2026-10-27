import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
interface Props { title:string;description:string;image?:string;detailPath?:string; }
export default function ProjectCard({title,description,image,detailPath}:Props) {
  const {lang}=useI18n();const pt=lang==="pt";
  return <article className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 text-neutral-800 dark:text-neutral-100">
    {image && <img src={image} alt={title} loading="lazy" className="h-44 w-full object-contain rounded-lg bg-neutral-100 dark:bg-white/5 mb-4" />}
    <h3 className="text-lg font-medium">{title}</h3><p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{description}</p>
    {detailPath && <Link to={detailPath} className="mt-5 inline-flex items-center gap-2 text-sm font-medium" style={{color:"var(--site-accent-text)"}}>{pt ? "Explorar case" : "Explore case"}<ArrowUpRight size={16} /></Link>}
  </article>;
}
