import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import "./Dropdown.css";

type Option = { value: string; label: string; description?: string; shortLabel?: string };
export default function Dropdown({ value, options, onChange, label, compact = false, modern = false, minimal = false }: { value: string; options: Option[]; onChange: (value: string) => void; label: string; compact?: boolean; modern?: boolean; minimal?: boolean }) {
  const id = useId(), root = useRef<HTMLDivElement>(null), menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false), [active, setActive] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 260 });
  const selected = options.find(option => option.value === value) || options[0];
  useLayoutEffect(() => {
    if (!open || !root.current || !menu.current) return;
    const box = root.current.getBoundingClientRect(), width = Math.min(minimal ? Math.max(200, box.width) : compact ? 220 : 320, window.innerWidth - 24);
    const height = menu.current.offsetHeight;
    setPosition({ width, left: Math.max(12, Math.min(window.innerWidth - width - 12, box.right - width)), top: box.bottom + height + 12 > window.innerHeight ? Math.max(12, box.top - height - 8) : box.bottom + 8 });
  }, [open, compact, minimal]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target) && !menu.current?.contains(event.target)) setOpen(false); };
    const close = (event: Event) => { if (event.target instanceof Node && menu.current?.contains(event.target)) return; setOpen(false); };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("resize", close); window.removeEventListener("scroll", close, true); };
  }, [open]);
  const choose = (index: number) => { onChange(options[index].value); setOpen(false); };
  const keyboard = (event: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " ", "Escape"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); }
    if (event.key === "Escape" || event.key === "Tab") { setOpen(false); return; }
    if (event.key === "Enter" || event.key === " ") { if (open) choose(active); else { setActive(options.findIndex(option => option.value === value)); setOpen(true); } }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") { setActive(index => (index + (event.key === "ArrowDown" ? 1 : options.length - 1)) % options.length); setOpen(true); }
    if (event.key === "Home") setActive(0);
    if (event.key === "End") setActive(options.length - 1);
  };
  return <div ref={root} className={`styled-dropdown ${compact ? "is-compact" : ""} ${modern ? "is-modern" : ""}`}>
    <button type="button" className="dropdown-trigger" role="combobox" aria-label={label} aria-expanded={open} aria-controls={open ? id : undefined} aria-activedescendant={open ? `${id}-${active}` : undefined} aria-haspopup="listbox" onKeyDown={keyboard} onClick={() => { setActive(options.findIndex(option => option.value === value)); setOpen(current => !current); }}><span>{selected.shortLabel || selected.label}</span><ChevronDown size={14} /></button>
    {open && createPortal(<div ref={menu} id={id} role="listbox" aria-label={label} className={`dropdown-menu ${modern ? "is-modern" : ""} ${minimal ? "is-minimal" : ""}`} style={position}>{!minimal && <span className="dropdown-menu-label">{label}</span>}{options.map((option, index) => <div key={option.value} id={`${id}-${index}`} role="option" aria-selected={option.value === value} className={active === index ? "is-active" : ""} onPointerMove={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}><span><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span>{option.value === value && <Check size={15} />}</div>)}</div>, document.body)}
  </div>;
}
