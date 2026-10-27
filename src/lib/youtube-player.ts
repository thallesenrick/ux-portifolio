export interface YouTubePlayer {
  playVideo:()=>void;
  pauseVideo:()=>void;
  setVolume:(volume:number)=>void;
  unMute:()=>void;
  getCurrentTime:()=>number;
  destroy:()=>void;
}
type PlayerEvent={target:YouTubePlayer};
type PlayerOptions={events:{
  onReady:(event:PlayerEvent)=>void;
  onStateChange:(event:PlayerEvent & {data:number})=>void;
  onError:(event:PlayerEvent & {data:number})=>void;
  onAutoplayBlocked:()=>void;
}};
export interface YouTubeAPI { Player:new (element:HTMLIFrameElement,options:PlayerOptions)=>YouTubePlayer; }
declare global {
  interface Window { YT?:YouTubeAPI;onYouTubeIframeAPIReady?:()=>void; }
}
let pending:Promise<YouTubeAPI>|null=null;

export function loadYouTubeAPI():Promise<YouTubeAPI> {
  if(window.YT?.Player)return Promise.resolve(window.YT);
  if(pending)return pending;
  pending=new Promise((resolve,reject)=>{
    const previous=window.onYouTubeIframeAPIReady;
    const script=document.createElement("script");
    const fail=()=>{
      clearTimeout(timeout);script.remove();pending=null;
      if(window.onYouTubeIframeAPIReady===ready)window.onYouTubeIframeAPIReady=previous;
      reject(new Error("YouTube player could not load"));
    };
    const ready=()=>{
      clearTimeout(timeout);
      previous?.();
      if(window.YT?.Player)resolve(window.YT);else fail();
    };
    const timeout=window.setTimeout(fail,15000);
    window.onYouTubeIframeAPIReady=ready;
    script.src="https://www.youtube.com/iframe_api";
    script.async=true;script.onerror=fail;
    document.head.append(script);
  });
  return pending;
}
