import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { MoveHorizontal } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import { musicTracks } from "../../data/music";
import "./RadioTuner.css";

const spacing = 42;
const clamp = (value: number) => Math.max(0, Math.min(musicTracks.length - 1, value));
const frequency = (index: number) => (88 + index * 4).toFixed(1);

export default function RadioTuner({ value, onChange }: { value: number; onChange: (index: number) => void }) {
  const { lang } = useI18n();
  const [preview, setPreview] = useState<number | null>(null);
  const drag = useRef<{ x: number; value: number; pointer: number } | null>(null);
  const position = preview ?? value;
  const station = Math.round(position);
  const label = { pt: "Arraste para sintonizar a música", en: "Drag to tune the music", es: "Arrastra para sintonizar la música" }[lang];
  const finish = (event: PointerEvent<HTMLDivElement>, commit: boolean) => {
    const start = drag.current;
    if (!start || start.pointer !== event.pointerId) return;
    drag.current = null;
    if (commit) onChange(Math.round(clamp(start.value - (event.clientX - start.x) / spacing)));
    setPreview(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <div className={`music-radio-tuner ${preview !== null ? "is-tuning" : ""}`} role="slider" tabIndex={0} aria-label={label} aria-orientation="horizontal" aria-valuemin={1} aria-valuemax={musicTracks.length} aria-valuenow={station + 1} aria-valuetext={`${musicTracks[station].artist} — ${musicTracks[station].title}`} onPointerDown={event => {
    if (!event.isPrimary || event.button !== 0) return;
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, value, pointer: event.pointerId };
    setPreview(value);
  }} onPointerMove={event => {
    const start = drag.current;
    if (start?.pointer === event.pointerId) setPreview(clamp(start.value - (event.clientX - start.x) / spacing));
  }} onPointerUp={event => finish(event, true)} onPointerCancel={event => finish(event, false)} onLostPointerCapture={() => { drag.current = null; setPreview(null); }} onKeyDown={event => {
    const change = event.key === "ArrowRight" || event.key === "ArrowUp" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 0;
    if (!change && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault(); event.stopPropagation();
    setPreview(null);
    onChange(event.key === "Home" ? 0 : event.key === "End" ? musicTracks.length - 1 : clamp(value + change));
  }}>
    <div className="radio-band" aria-hidden="true"><span>AM / <b>FM</b></span><MoveHorizontal size={13} /><span>{frequency(station)}</span></div>
    <div className="radio-dial-window" aria-hidden="true"><div className="radio-dial-scale" style={{ "--radio-shift": `${-position * spacing}px` } as CSSProperties}>
      {musicTracks.map((track, index) => <span key={track.videoId} className={`radio-station ${index === station ? "is-selected" : ""}`}><span className="radio-ticks"><i /><i /><i /><i /></span><span>{88 + index * 4}</span></span>)}
    </div><span className="radio-dial-needle" /></div>
  </div>;
}
