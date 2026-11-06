// Authoring only. Reuses the same local tools as the RachAqui motion exports.
// Uses an isolated local browser document. No application server is required.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('../tmp/playhub-qa/node_modules/playwright-core');
const {GIFEncoder,quantize,applyPalette}=require('../tmp/rq-animation-tools/node_modules/gifenc');
const {PNG}=require('../tmp/rq-animation-tools/node_modules/pngjs');
const source='src/assets/projects/playhub/originals',output='public/playhub/motion';
const flows={onboarding:[40,41,36,29],booking:[38,13,12,18,19,39],payment:[18,19,20,21]};
const width=393,height=852,hold=1800,frames=12,delay=40;
(async()=>{
 fs.mkdirSync(output,{recursive:true});fs.mkdirSync('tmp/playhub-motion-qa',{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const page=await browser.newPage();await page.route('**/playhub-motion-renderer',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html><body></body></html>'}));await page.goto('http://127.0.0.1/playhub-motion-renderer',{waitUntil:'domcontentloaded'});
  await page.addScriptTag({path:require.resolve('../tmp/rq-animation-tools/node_modules/webm-muxer')});
  const manifest={fileKey:'v8y0LZqC6qd7iCCemVLFnF',width,height,hold,transitionDuration:frames*delay,policy:'Only original exported screens. No redrawn UI, added messages, cursors, or invented states.',flows:{}};
  for(const [name,ids] of Object.entries(flows)){
   const originals=ids.map(id=>fs.readFileSync(`${source}/screen-${id}.png`));
   await page.evaluate(async ({images,width,height})=>{
    window.sourceImages=await Promise.all(images.map(async data=>{const image=new Image();image.src='data:image/png;base64,'+data;await image.decode();return image;}));
    window.canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;window.ctx=canvas.getContext('2d',{willReadFrequently:true});
    window.drawFrame=(from,to,progress)=>{const e=progress*progress*(3-2*progress);ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.drawImage(sourceImages[from],0,0,width,height);if(e>0){ctx.globalAlpha=e;ctx.drawImage(sourceImages[to],0,0,width,height);ctx.globalAlpha=1;}return canvas.toDataURL('image/png').split(',')[1];};
   },{images:originals.map(buffer=>buffer.toString('base64')),width,height});
   const holds=[];for(let index=0;index<ids.length;index++)holds.push(PNG.sync.read(Buffer.from(await page.evaluate(index=>drawFrame(index,index,0),index),'base64')));
   const palette=quantize(Buffer.concat(holds.map(p=>p.data)),255),transparentIndex=palette.length,gif=GIFEncoder();let previous=null,count=0;
   const write=(data,duration)=>{const indexed=applyPalette(data,palette),delta=indexed.slice();if(previous)for(let p=0;p<delta.length;p++)if(previous[p]===indexed[p])delta[p]=transparentIndex;gif.writeFrame(delta,width,height,{palette:count===0?[...palette,[0,0,0]]:undefined,delay:duration,repeat:0,transparent:count>0,transparentIndex,dispose:1});previous=indexed;count++;};
   for(let from=0;from<ids.length;from++){
    const to=(from+1)%ids.length;write(holds[from].data,hold);
    for(let frame=1;frame<=frames;frame++){const buffer=Buffer.from(await page.evaluate(([from,to,p])=>drawFrame(from,to,p),[from,to,frame/frames]),'base64');write(PNG.sync.read(buffer).data,delay);if(frame===frames)fs.writeFileSync(`tmp/playhub-motion-qa/${name}-endpoint-${ids[to]}.png`,buffer);}
   }
   gif.finish();fs.writeFileSync(`${output}/${name}.gif`,gif.bytes());
   const webm=await page.evaluate(async ({hold,frames,delay,width,height})=>{
    const target=new WebMMuxer.ArrayBufferTarget(),muxer=new WebMMuxer.Muxer({target,video:{codec:'V_VP9',width,height,frameRate:25}});let failure=null;
    const encoder=new VideoEncoder({output:(chunk,meta)=>muxer.addVideoChunk(chunk,meta),error:e=>failure=e.message});
    encoder.configure({codec:'vp09.00.10.08',width,height,bitrate:6000000,framerate:25,latencyMode:'quality'});let timestamp=0,index=0;
    const encode=async()=>{const f=new VideoFrame(canvas,{timestamp,duration:delay*1000});encoder.encode(f,{keyFrame:index++%100===0});f.close();timestamp+=delay*1000;if(encoder.encodeQueueSize>8)await encoder.flush();if(failure)throw Error(failure);};
    for(let from=0;from<sourceImages.length;from++){
     const to=(from+1)%sourceImages.length;drawFrame(from,to,0);for(let frame=0;frame<hold/delay;frame++)await encode();
     for(let frame=1;frame<=frames;frame++){drawFrame(from,to,frame/frames);await encode();}
    }
    await encoder.flush();encoder.close();muxer.finalize();const bytes=new Uint8Array(target.buffer);let binary='';for(let offset=0;offset<bytes.length;offset+=8192)binary+=String.fromCharCode(...bytes.subarray(offset,offset+8192));return btoa(binary);
   },{hold,frames,delay,width,height});fs.writeFileSync(`${output}/${name}.webm`,Buffer.from(webm,'base64'));
   manifest.flows[name]=ids.map((id,index)=>({id,file:`screen-${id}.png`,sha256:crypto.createHash('sha256').update(originals[index]).digest('hex')}));
   console.log(`${name}: ${ids.length} original screens, ${count} GIF frames, ${(gif.bytes().length/1024/1024).toFixed(2)} MB GIF; ${(Buffer.from(webm,'base64').length/1024).toFixed(0)} KB WebM`);
  }
  fs.writeFileSync(`${source}/motion-manifest.json`,JSON.stringify(manifest,null,2)+'\n');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
