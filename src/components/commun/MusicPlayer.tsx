import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, LoaderCircle, Music2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useI18n } from "../../lib/i18n-context";
import { musicTrack } from "../../data/music";
import { loadYouTubeAPI, type YouTubePlayer } from "../../lib/youtube-player";
import "./MusicPlayer.css";

type Status="idle"|"loading"|"playing"|"paused"|"buffering"|"error";
function subscribeToAnchor(update:()=>void) {
  const observer=new MutationObserver(update);
  observer.observe(document.body,{childList:true,subtree:true});
  return()=>observer.disconnect();
}
const getAnchor=()=>document.getElementById("hero-music-anchor");
export default function MusicPlayer() {
  const {lang}=useI18n(),pt=lang==="pt";
  const [open,setOpen]=useState(false),[status,setStatus]=useState<Status>("idle"),[volume,setVolume]=useState(30),[attempt,setAttempt]=useState(0);
  const mountRef=useRef<HTMLDivElement>(null),playerRef=useRef<YouTubePlayer|null>(null),volumeRef=useRef(30),positionRef=useRef(musicTrack.startSeconds),openerRef=useRef<HTMLButtonElement>(null);
  const closeRef=useRef<HTMLButtonElement>(null),rootRef=useRef<HTMLElement>(null);
  const [started,setStarted]=useState(false);
  const anchor=useSyncExternalStore(subscribeToAnchor,getAnchor,()=>null);
  const playing=status==="playing" || status==="buffering";

  useEffect(()=>{
    const mount=mountRef.current;
    if(!started || !mount)return;
    let cancelled=false,instance:YouTubePlayer|null=null;
    const readyTimeout=window.setTimeout(()=>{if(!cancelled)setStatus("error");},20000);
    // React owns the mount; YouTube owns its children and can safely remove
    // the iframe on close without interfering with React's DOM cleanup.
    const iframe=document.createElement("iframe");
    const params=new URLSearchParams({enablejsapi:"1",origin:window.location.origin,playsinline:"1",controls:"1",rel:"0",loop:"1",playlist:musicTrack.videoId,start:String(Math.floor(positionRef.current))});
    iframe.src=`https://www.youtube.com/embed/${musicTrack.videoId}?${params}`;
    iframe.title=musicTrack.fullTitle;
    iframe.width="100%";iframe.height="200";
    iframe.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen=true;
    iframe.referrerPolicy="strict-origin-when-cross-origin";
    mount.replaceChildren(iframe);
    void loadYouTubeAPI().then(api=>{
      if(cancelled)return;
      instance=new api.Player(iframe,{events:{
        onReady:({target})=>{
          if(cancelled)return;
          clearTimeout(readyTimeout);
          playerRef.current=target;
          target.setVolume(volumeRef.current);
          if(document.hidden){setStatus("paused");return;}
          setStatus("paused");target.playVideo();
        },
        onStateChange:({data})=>{
          if(cancelled)return;
          if(data===1)setStatus("playing");
          else if(data===2 || data===0 || data===5)setStatus("paused");
          else if(data===3)setStatus("buffering");
        },
        onError:()=>{clearTimeout(readyTimeout);if(!cancelled)setStatus("error");},
        onAutoplayBlocked:()=>{if(!cancelled)setStatus("paused");},
      }});
    }).catch(()=>{clearTimeout(readyTimeout);if(!cancelled)setStatus("error");});
    const visibility=()=>{if(document.hidden)playerRef.current?.pauseVideo();};
    document.addEventListener("visibilitychange",visibility);
    return()=>{
      cancelled=true;clearTimeout(readyTimeout);document.removeEventListener("visibilitychange",visibility);
      if(instance){
        if(typeof instance.getCurrentTime==="function")positionRef.current=instance.getCurrentTime() || positionRef.current;
        if(typeof instance.pauseVideo==="function")instance.pauseVideo();
        instance.destroy();
      }
      playerRef.current=null;mount.replaceChildren();
    };
  },[started,attempt]);

  useEffect(()=>{
    if(!open)return;
    closeRef.current?.focus();
    const outside=(event:PointerEvent)=>{if(event.target instanceof Node && !rootRef.current?.contains(event.target))setOpen(false);};
    document.addEventListener("pointerdown",outside);
    return()=>document.removeEventListener("pointerdown",outside);
  },[open]);

  const expand=()=>{if(!started){setStatus("loading");setStarted(true);}setOpen(true);};
  const collapse=()=>{setOpen(false);requestAnimationFrame(()=>openerRef.current?.focus());};
  const toggle=()=>{if(playing)playerRef.current?.pauseVideo();else playerRef.current?.playVideo();};
  const changeVolume=(value:number)=>{
    setVolume(value);volumeRef.current=value;
    if(playerRef.current){playerRef.current.setVolume(value);if(value>0)playerRef.current.unMute();}
  };
  const statusText=status==="loading" ? (pt ? "Preparando sua trilha…" : "Preparing your soundtrack…") : status==="buffering" ? (pt ? "Carregando música…" : "Buffering music…") : status==="playing" ? (pt ? "Tocando agora" : "Now playing") : status==="error" ? (pt ? "Não foi possível carregar a música." : "The music could not load.") : (pt ? "Uma pausa para ouvir" : "A moment to listen");

  const controls=<aside ref={rootRef} className={"sketch-music-player "+(anchor ? "in-hero " : "")+(open ? "is-expanded " : "")+(status==="playing" ? "is-playing" : "")} aria-label={pt ? "Player de música" : "Music player"} onKeyDown={event=>{if(open && event.key==="Escape"){event.stopPropagation();collapse();}}}>
    {!open ? <button ref={openerRef} className="music-open-button" type="button" onClick={expand} aria-expanded={false} aria-controls="music-player-panel" aria-label={pt ? "Abrir player e ouvir música" : "Open player and listen"}><span className="music-open-icon"><Music2 size={21} strokeWidth={1.4} /></span><span><strong>{pt ? "Uma trilha para criar" : "A soundtrack for creating"}</strong><small>Brazilian lofi · <span>{playing ? (pt ? "tocando" : "playing") : (pt ? "ouvir" : "listen")}</span></small></span><Play size={15} strokeWidth={1.5} /></button> : <div id="music-player-panel" className="music-player-panel">
      <div className="music-player-heading"><span><Music2 size={15} strokeWidth={1.4} />{pt ? "TRILHA DO CADERNO" : "SKETCHBOOK SOUNDTRACK"}</span><button ref={closeRef} type="button" onClick={collapse} aria-label={pt ? "Recolher player" : "Collapse player"} aria-expanded={true} aria-controls="music-player-panel"><ChevronDown size={18} /></button></div>
      <div className="music-track-info"><div><strong>{musicTrack.title}</strong><span>{musicTrack.artist}</span></div><a href={musicTrack.url} target="_blank" rel="noopener noreferrer" aria-label={pt ? "Abrir música no YouTube" : "Open music on YouTube"}><ArrowUpRight size={15} /></a></div>
      <div className="music-player-controls"><button className="music-play-button" type="button" onClick={status==="error" ? ()=>{setStatus("loading");setAttempt(value=>value+1);} : toggle} disabled={status==="loading"} aria-label={status==="error" ? (pt ? "Tentar carregar música novamente" : "Retry loading music") : playing ? (pt ? "Pausar música" : "Pause music") : (pt ? "Reproduzir música" : "Play music")}>{status==="loading" ? <LoaderCircle size={20} className="music-loading-icon" /> : status==="error" ? <RotateCcw size={19} /> : playing ? <Pause size={20} strokeWidth={1.5} /> : <Play size={20} strokeWidth={1.5} />}</button><label className="music-volume"><span className="sr-only">{pt ? "Volume da música" : "Music volume"}</span>{volume===0 ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}<input type="range" min="0" max="100" step="1" value={volume} onChange={event=>changeVolume(Number(event.target.value))} aria-valuetext={volume+"%"} style={{"--music-volume":volume+"%"} as CSSProperties} /><output>{volume}%</output></label></div>
      <div className="music-player-status"><span className="music-equalizer" aria-hidden="true"><i /><i /><i /></span><span role="status">{statusText}</span></div>
    </div>}
    <svg className="music-sketch-border" viewBox="0 0 320 400" preserveAspectRatio="none" fill="none" aria-hidden="true"><path vectorEffect="non-scaling-stroke" d="M5 7Q159 2 314 6L317 199L313 394Q155 398 6 392L3 201Z" /><path vectorEffect="non-scaling-stroke" d="M1 43L2 2L57 1M269 399L319 398L318 354" /></svg>
  </aside>;
  return <><div ref={mountRef} className="music-audio-backend" aria-hidden="true" inert />{anchor ? createPortal(controls,anchor) : controls}</>;
}
