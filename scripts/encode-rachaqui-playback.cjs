// Encode the existing GIF frames and timings into seekable, pausable WebM files.
// This is an offline authoring tool; the temporary encoder is not a site dependency.
const fs=require('node:fs');
const {chromium}=require('../tmp/playhub-qa/node_modules/playwright-core');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage();await page.goto(process.env.RACHAQUI_ORIGIN||'http://localhost:5174');
 await page.addScriptTag({path:require.resolve('../tmp/rq-animation-tools/node_modules/webm-muxer')});
 try{for(const mode of ['split','table']){
  const result=await page.evaluate(async name=>{
   const data=await (await fetch(`/rachaqui/motion/${name}.gif`)).arrayBuffer();
   const decoder=new ImageDecoder({data,type:'image/gif'});await decoder.tracks.ready;await decoder.completed;
   const count=decoder.tracks.selectedTrack.frameCount;
   const target=new WebMMuxer.ArrayBufferTarget();
   const muxer=new WebMMuxer.Muxer({target,video:{codec:'V_VP9',width:430,height:932,frameRate:50}});
   let failure=null;
   const encoder=new VideoEncoder({output:(chunk,meta)=>muxer.addVideoChunk(chunk,meta),error:error=>failure=error.message});
   encoder.configure({codec:'vp09.00.10.08',width:430,height:932,bitrate:4000000,framerate:50,latencyMode:'quality'});
   let timestamp=0;
   for(let index=0;index<count;index++){
    const decoded=await decoder.decode({frameIndex:index});
    const duration=decoded.image.duration||20000;
    const frame=new VideoFrame(decoded.image,{timestamp,duration});
    encoder.encode(frame,{keyFrame:index%100===0});frame.close();decoded.image.close();timestamp+=duration;
    if(encoder.encodeQueueSize>8)await encoder.flush();if(failure)throw Error(failure);
   }
   await encoder.flush();encoder.close();decoder.close();muxer.finalize();
   const bytes=new Uint8Array(target.buffer);let binary='';
   for(let offset=0;offset<bytes.length;offset+=8192)binary+=String.fromCharCode(...bytes.subarray(offset,offset+8192));
   return {base64:btoa(binary),frames:count,duration:timestamp/1000000};
  },mode);
  const file=Buffer.from(result.base64,'base64');fs.writeFileSync(`public/rachaqui/motion/${mode}.webm`,file);
  console.log(`${mode}: ${result.frames} original GIF frames, ${result.duration.toFixed(2)} s, ${Math.round(file.length/1024)} KB WebM`);
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
