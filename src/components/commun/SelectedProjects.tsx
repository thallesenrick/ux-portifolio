import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { useI18n } from "../../lib/i18n-context";
import { useTheme } from "../../lib/theme-context";
import SpotlightCard from "../react-bits/SpotlightCard";
import { useHeroAccent } from "../../lib/hero-accent-context";
import "./SelectedProjects.css";

const PHOTO_DURATION = 4000;

function ProjectSketchFrame() {
  return <svg className="project-sketch-frame" viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none" aria-hidden="true"><path vectorEffect="non-scaling-stroke" d="M8 9Q248 4 499 8T991 8L994 345L990 691Q750 696 500 692T8 694L6 351Z" /><path className="project-sketch-frame-echo" vectorEffect="non-scaling-stroke" d="M3 47L4 6L178 3M826 697L996 696L997 650" /></svg>;
}

function ProjectTags({ category }: { category: string }) {
  return <div className="project-tags">
    {category.split(" / ").map((tag, index) => <span key={tag} className={`project-tag project-tag--${index}`}><i aria-hidden="true" />{tag}</span>)}
  </div>;
}


export default function SelectedProjects() {
  const { lang } = useI18n();
  const { theme } = useTheme();
  const { selected:accent } = useHeroAccent();
  const pt = lang === "pt";
  const reduce = useReducedMotion();
  const layoutId = useId();
  const softTransition = { type: "spring" as const, duration: reduce ? 0 : .85, bounce: 0 };
  const [slide, setSlide] = useState({ project: 0, photo: 0, revision: 0 });
  const [queueOffset, setQueueOffset] = useState(0);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [announcement, setAnnouncement] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLAnchorElement>(null);
  const visible = useInView(carouselRef, { amount: .15 });
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const shouldPlay = playing ?? !reduce;
  const paused = !shouldPlay || hovered || focused || hidden || !visible;
  const project = projects[slide.project];
  const photos = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const visibleQueueSize = 3;
  const queueSize = Math.min(visibleQueueSize + 1, projects.length - 1);
  const secondaryCount = projects.length - 1;
  const queue = Array.from({ length: queueSize }, (_, index) => (slide.project + 1 + (queueOffset + index) % secondaryCount) % projects.length);
  const scrollQueue = (direction: number) => setQueueOffset((offset) => (offset + direction + secondaryCount) % secondaryCount);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    const previous = elapsed.current;
    let frame = 0;
    const tick = (now: number) => {
      elapsed.current = Math.min(PHOTO_DURATION, previous + now - start);
      progress.set(elapsed.current / PHOTO_DURATION);
      if (elapsed.current >= PHOTO_DURATION) {
        elapsed.current = 0;
        progress.set(0);
        setSlide((current) => {
          const count = projects[current.project].gallery?.length || 1;
          return current.photo + 1 < count
            ? { ...current, photo: current.photo + 1 }
            : { project: (current.project + 1) % projects.length, photo: 0, revision: current.revision + 1 };
        });
      } else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, slide.project, slide.photo, slide.revision, progress]);

  const selectProject = (index: number) => {
    const keyboardSelection = document.activeElement?.matches(":focus-visible");
    setFocused(false);
    elapsed.current = 0; progress.set(0);
    setSlide((current) => ({ project: (index + projects.length) % projects.length, photo: 0, revision: current.revision + 1 }));
    setAnnouncement((pt ? "Em destaque: " : "Now featured: ") + projects[(index + projects.length) % projects.length].title);
    if (keyboardSelection) requestAnimationFrame(() => detailsRef.current?.focus({ preventScroll: true }));
  };
  const selectPhoto = (photo: number) => {
    elapsed.current = 0; progress.set(0);
    setSlide((current) => ({ ...current, photo, revision: current.revision + 1 }));
  };

  return (
    <section className="selected-projects selected-projects--sketch" aria-labelledby="selected-projects-title" style={{"--work-accent":accent.color} as CSSProperties}>
      <svg className="projects-margin-doodle" viewBox="0 0 150 180" fill="none" aria-hidden="true"><path d="M30 6L35 32L57 19L45 44L75 51L45 57L55 81L34 66L22 93L20 62L2 67L17 48L1 35L22 36Z" /><path d="M77 88Q140 103 120 151Q111 166 87 157M87 157L104 150M87 157L100 169" /></svg>
      <div className="selected-projects-heading"><div><span className="selected-projects-eyebrow"><span /> {pt ? "CADERNO DE PROJETOS" : "PROJECT SKETCHBOOK"} / 01—{String(projects.length).padStart(2, "0")}</span><h2 id="selected-projects-title">{pt ? "Projetos que merecem" : "Projects worth"}<br /><span>{pt ? "um olhar mais perto." : "a closer look."}</span></h2></div><Link to="/projects" className="selected-projects-all">{pt ? "Todos os projetos" : "All projects"}<ArrowUpRight size={16} /></Link></div>
      <LayoutGroup id={layoutId}>
      <div ref={carouselRef} className="project-carousel" role="region" aria-roledescription={pt ? "carrossel" : "carousel"} aria-label={pt ? "Projetos em destaque" : "Featured projects"}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} onPointerCancel={() => setHovered(false)}
        onFocus={(event) => { if (event.target.matches(":focus-visible")) setFocused(true); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); selectProject(slide.project + 1); } if (event.key === "ArrowLeft") { event.preventDefault(); selectProject(slide.project - 1); } }}>
        <motion.div key={project.id} layoutId={reduce ? undefined : `project-card-${project.id}`} transition={softTransition} className="project-feature-slot" style={{ borderRadius: 8 }}>
        <SpotlightCard className="project-feature" theme={theme} spotlightColor={accent.color} intensity={.1}>
          <div className={`project-feature-art project-tone--${project.tone}`}>
            <div className="project-feature-top"><span><span className="project-live-dot" />{pt ? "EM DESTAQUE" : "IN THE SPOTLIGHT"}</span><span>0{slide.project + 1} / 0{projects.length}</span></div>
            <div className="project-feature-photo-stage">
            <AnimatePresence initial={false}>
              <motion.img key={project.id + slide.photo} src={photos[slide.photo]} alt={`${project.title} - ${pt ? "previa conceitual" : "concept preview"} ${slide.photo + 1}`}
                className="project-feature-image" initial={{ opacity: 0, scale: reduce ? 1 : 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduce ? 1 : .985 }} transition={{ duration: reduce ? 0 : .7, ease: [.22, 1, .36, 1] }} />
            </AnimatePresence>
            </div>
            <span className="project-feature-concept">{pt ? "PRÉVIAS CONCEITUAIS" : "CONCEPT PREVIEWS"}</span>
            <div className="project-photo-controls"><span>{String(slide.photo + 1).padStart(2,"0")} / {String(photos.length).padStart(2,"0")}</span><div>{photos.map((_,index) => <button key={index} type="button" aria-label={`${pt ? "Ver imagem" : "View image"} ${index + 1}`} aria-pressed={slide.photo === index} onClick={() => selectPhoto(index)}><span className={index === slide.photo ? "is-active" : ""} /></button>)}</div></div>
          </div>
          <div className="project-feature-timeline" aria-hidden="true">{photos.map((_, index) => <div key={index}><motion.span style={index === slide.photo ? { scaleX: progress } : { scaleX: index < slide.photo ? 1 : 0 }} /></div>)}</div>
          <div className="project-feature-copy"><div><ProjectTags category={project.category} /><h3>{project.title}</h3><p>{pt ? project.description : project.descriptionEn}</p></div><Link ref={detailsRef} to={project.detailPath || `/projects#${project.id}`}>{pt ? "Ver detalhes" : "View details"}<ArrowUpRight size={17} /></Link></div>
          <ProjectSketchFrame />
        </SpotlightCard>
        </motion.div>
        <div className="project-queue" aria-label={pt ? "Lista de projetos" : "Project list"}>
          <button type="button" className="project-queue-nav" onClick={() => scrollQueue(-1)} aria-label={pt ? "Ver projetos anteriores na lista" : "Show previous projects in list"}><ChevronUp size={16} /></button>
          <div className="project-queue-viewport"><div className="project-queue-track">
          {queue.map((index) => {
            const item = projects[index];
            return <motion.button initial={false} animate={{ opacity: 1 }} layout layoutId={reduce ? undefined : `project-card-${item.id}`} style={{ borderRadius: 8 }} key={item.id} className="project-queue-card" title={item.title} type="button" onClick={() => selectProject(index)} aria-label={`${pt ? "Colocar em destaque" : "Feature"}: ${item.title}`} transition={{ layout: softTransition, opacity: { duration: reduce ? 0 : .4 }, y: { duration: reduce ? 0 : .45, ease: [.22, 1, .36, 1] } }}>
              <div className={`project-queue-image project-tone--${item.tone}`}><img src={item.gallery?.[0] || item.image} alt="" loading="lazy" /><span className="project-queue-promote"><ArrowUpRight size={18} /></span></div>
              <ProjectSketchFrame />
              <div className="project-queue-copy"><div><h3>{item.title}</h3></div><ArrowRight size={16} /></div>
            </motion.button>;
          })}
          </div></div>
          <button type="button" className="project-queue-nav" onClick={() => scrollQueue(1)} aria-label={pt ? "Ver proximos projetos na lista" : "Show next projects in list"}><ChevronDown size={16} /></button>
        </div>
      </div>
      </LayoutGroup>
      <div className="project-carousel-footer"><div className="project-playback"><button type="button" onClick={() => setPlaying(!shouldPlay)} aria-label={shouldPlay ? (pt ? "Pausar troca automatica" : "Pause autoplay") : (pt ? "Iniciar troca automatica" : "Start autoplay")}>{shouldPlay ? <Pause size={13} /> : <Play size={13} />}</button><span>{!shouldPlay ? (pt ? "Pausado" : "Paused") : paused ? (pt ? "Em pausa enquanto explora" : "Paused while you explore") : (pt ? "4s por imagem / troca automatica" : "4s per image / autoplay")}</span></div><div className="project-carousel-arrows"><button type="button" onClick={() => selectProject(slide.project - 1)} aria-label={pt ? "Projeto anterior" : "Previous project"}><ChevronLeft size={17} /></button><button type="button" onClick={() => selectProject(slide.project + 1)} aria-label={pt ? "Proximo projeto" : "Next project"}><ChevronRight size={17} /></button></div></div>
      <span className="sr-only" role="status">{announcement}</span>
    </section>
  );
}
