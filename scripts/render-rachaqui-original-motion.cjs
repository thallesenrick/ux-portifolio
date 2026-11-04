/* Original Figma screens, with native-style transitions and authorized feedback overlays.
 * Tools live in tmp/playhub-qa and tmp/rq-animation-tools. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('../tmp/playhub-qa/node_modules/playwright-core');
const {GIFEncoder,quantize,applyPalette}=require('../tmp/rq-animation-tools/node_modules/gifenc');
const {PNG}=require('../tmp/rq-animation-tools/node_modules/pngjs');
const sourceDir='src/assets/projects/rachaqui/motion-source';
const flows={
  split:[{file:'split-1.png',node:'2:2512'},{file:'split-2.png',node:'2:2617'},{file:'split-4.png',node:'2:2827'}],
  table:[{file:'table-1.png',node:'2:3254'},{file:'table-2.png',node:'2:3356'}],
};
const width=430,height=932,frameDelay=20,transitionFrames=48,holdFrames=65;
async function main(){
 const out=path.resolve('public/rachaqui/motion'),previews=path.resolve('tmp/rq-motion-qa');
 fs.mkdirSync(out,{recursive:true});fs.mkdirSync(previews,{recursive:true});
 const previousManifest=JSON.parse(fs.readFileSync(path.join(sourceDir,'manifest.json'),'utf8'));
 const manifest={fileKey:'wDBg6nWX0nvDxrwz6CsSJH',width,height,frameDelay,transitionFrames,holdFrames,flows:previousManifest.flows};
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width,height}});
 await page.goto(process.env.RACHAQUI_ORIGIN||'http://127.0.0.1:5174');
 try{for(const [mode,sources] of Object.entries(flows)){
  if(process.argv[2]&&process.argv[2]!==mode)continue;
  const buffers=sources.map(source=>fs.readFileSync(path.join(sourceDir,source.file)));
  const originals=buffers.map(buffer=>PNG.sync.read(buffer));
  for(const image of originals)if(image.width!==width||image.height!==height)throw Error('Unexpected original dimensions');
  manifest.flows[mode]=sources.map((source,index)=>({...source,sha256:crypto.createHash('sha256').update(buffers[index]).digest('hex')}));
  await page.evaluate(async ({urls,mode})=>{
   document.body.innerHTML='<canvas width="430" height="932"></canvas>';document.body.style.cssText='margin:0;background:white';
   const images=await Promise.all(urls.map(async url=>{const image=new Image();image.src=url;await image.decode();return image;}));
   for(const weight of [400,700]){const font=new FontFace('RQ',`url(/src/assets/fonts/Montserrat-${weight}.ttf)`,{weight:String(weight)});await font.load();document.fonts.add(font);}
   const canvas=document.querySelector('canvas'),context=canvas.getContext('2d');
   const ease=t=>.5-.5*Math.cos(Math.PI*Math.max(0,Math.min(1,t)));
   function draw(image,alpha=1,y=0){context.globalAlpha=alpha;context.drawImage(image,0,y);context.globalAlpha=1;}
   function round(x,y,w,h,r,fill){context.fillStyle=fill;context.beginPath();context.roundRect(x,y,w,h,r);context.fill();}
   window.originalFrame=(from,to,progress,feedback=null)=>{
    const e=ease(progress);context.clearRect(0,0,430,932);draw(images[from]);
    if(progress>0&&progress<1){
     if(mode==='table'){
      const opening=to===1,amount=opening?e:1-e;
      draw(images[0]);context.fillStyle=`rgba(0,0,0,${.73*amount})`;context.fillRect(0,0,430,932);
      const scale=.94+.06*amount,dy=38*(1-amount);
      context.globalAlpha=amount;
      context.drawImage(images[1],30,205,370,522,215-185*scale,466-261*scale+dy,370*scale,522*scale);
      context.globalAlpha=1;
     }else if(from===0&&to===1){
      context.save();context.beginPath();context.rect(0,148,430,306);context.clip();
      context.fillStyle='#fff';context.fillRect(0,148,430,306);
      context.drawImage(images[from],0,148,430,306,0,148,430,306);
      context.globalAlpha=e;
      context.drawImage(images[to],0,148,430,306,0,148+10*(1-e),430,306);
      context.globalAlpha=1;context.restore();
     }else{
      // A short directional reveal replaces the old full-screen push, which
      // incorrectly stacked two unrelated scroll snapshots into one long page.
      const distance=from===1?430:-430;
      context.save();context.beginPath();context.rect(0,42,430,768);context.clip();
      // These are distinct Figma states, not consecutive scroll captures.
      // Use a native sideways page transition, preserving each complete screen.
      context.fillStyle='#fff';context.fillRect(0,42,430,768);
      context.drawImage(images[from],0,42,430,768,-distance*e,42,430,768);
      context.drawImage(images[to],0,42,430,768,distance*(1-e),42,430,768);
      context.restore();
     }
    }else if(progress>=1)draw(images[to]);
    if(feedback){
     const t=feedback.time;
     // Toasts are temporary feedback; the underlying Figma exports are unchanged.
     const toast=(mode==='split'&&from!==1)?0:Math.min(ease((t-.15)/.22),1-ease((t-.82)/.23));
     if(toast>0){context.save();context.globalAlpha=toast;const y=742+18*(1-toast);
      context.shadowColor='#24100624';context.shadowBlur=18;context.shadowOffsetY=5;
      round(27,y,376,66,18,'#fff');context.shadowColor='transparent';
      round(40,y+16,34,34,17,'#fff0e6');
      context.strokeStyle='#bd2e0a';context.lineWidth=2.5;context.lineCap='round';context.beginPath();context.moveTo(49,y+33);context.lineTo(55,y+39);context.lineTo(65,y+27);context.stroke();
      const titles=mode==='split'?['Total da mesa','Visão individual','Pedidos recentes']:['Comanda da mesa','Confira antes de encerrar'];
      const bodies=mode==='split'?['Acompanhe o consumo do grupo.','Confira sua participação na mesa.','Itens e participantes em uma só visão.']:['Itens e valores reunidos para conferir.','Revise os valores e os participantes.'];
      context.font='700 13px RQ';context.fillStyle='#3a2920';context.fillText(titles[from],87,y+28);
      context.font='400 10px RQ';context.fillStyle='#78645a';context.fillText(bodies[from],87,y+47);context.restore();
     }
     const tap=t-1.0;
     if(tap>=0&&tap<.3){const a=1-tap/.3;
      const point=mode==='table'?(from===0?[215,878]:[215,549]):(from===0?[390,195]:from===1?[368,686]:[365,183]);
      context.save();context.globalAlpha=a;context.strokeStyle='#f17736';context.lineWidth=2.5;
      context.beginPath();context.arc(point[0],point[1],11+tap*65,0,Math.PI*2);context.stroke();
      round(point[0]-6,point[1]-6,12,12,6,'#f17736');context.restore();
     }
    }
    return canvas.toDataURL('image/png').split(',')[1];
   };
  },{urls:sources.map(source=>'/'+sourceDir+'/'+source.file),mode});
  // One stable palette; GIF is limited to 256 colors. Unchanged pixels use delta transparency.
  const palette=quantize(Buffer.concat(originals.map(image=>image.data)),255);
  const transparentIndex=palette.length,outputPalette=[...palette,[0,0,0]],gif=GIFEncoder();
  let previous=null,frames=0;
  const write=(rgba,delay)=>{
   const indexed=applyPalette(rgba,palette),delta=indexed.slice();
   if(previous)for(let pixel=0;pixel<delta.length;pixel++)if(indexed[pixel]===previous[pixel])delta[pixel]=transparentIndex;
   gif.writeFrame(delta,width,height,{palette:frames===0?outputPalette:undefined,delay,repeat:0,transparent:frames>0,transparentIndex,dispose:1});
   previous=indexed;frames++;
  };
  for(let from=0;from<sources.length;from++){
   const to=(from+1)%sources.length;
   for(let frame=0;frame<holdFrames;frame++){
    const encoded=await page.evaluate(([a,b,time])=>window.originalFrame(a,b,0,{time}),[from,to,frame*frameDelay/1000]);
    const buffer=Buffer.from(encoded,'base64');
    if(frame===25)fs.writeFileSync(path.join(previews,`${mode}-toast-${from}.png`),buffer);
    write(PNG.sync.read(buffer).data,frameDelay);
   }
   for(let frame=1;frame<=transitionFrames;frame++){
    const encoded=await page.evaluate(([a,b,t])=>window.originalFrame(a,b,t),[from,to,frame/transitionFrames]);
    const buffer=Buffer.from(encoded,'base64');
    if(frame===transitionFrames)fs.writeFileSync(path.join(previews,`${mode}-original-${to}.png`),buffer);
    if(frame===24)fs.writeFileSync(path.join(previews,`${mode}-transition-${from}.png`),buffer);
    write(PNG.sync.read(buffer).data,frameDelay);
   }
  }
  gif.finish();fs.writeFileSync(path.join(out,`${mode}.gif`),gif.bytes());
  fs.writeFileSync(path.join(out,`${mode}-poster.png`),buffers[0]);
  console.log(`${mode}: ${sources.length} original Figma screens, ${frames} frames, 50 fps transitions, ${(gif.bytes().length/1024/1024).toFixed(2)} MB`);
 }
 fs.writeFileSync(path.join(sourceDir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exit(1);});
