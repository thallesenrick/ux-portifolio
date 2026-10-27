const {chromium}=require('../playhub-qa/node_modules/playwright-core');
const assert=require('node:assert/strict'),fs=require('node:fs');
const real=process.argv.includes('--real');
(async()=>{
  fs.mkdirSync('tmp/music-player-qa/screenshots',{recursive:true});
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  if(!real)await page.route('**/*',route=>{
    const url=route.request().url();
    if(url.startsWith('http://127.0.0.1:4176'))return route.continue();
    if(url==='https://www.youtube.com/iframe_api')return route.fulfill({contentType:'application/javascript',body:`
      window.__ytCalls=[];window.__ytPlayers=[];
      window.YT={Player:class {
        constructor(iframe,options){this.iframe=iframe;this.events=options.events;window.__ytPlayers.push(this);window.__ytCalls.push(['create']);setTimeout(()=>this.events.onReady({target:this}),20);}
        playVideo(){window.__ytCalls.push(['play']);this.events.onStateChange({target:this,data:1});}
        pauseVideo(){window.__ytCalls.push(['pause']);this.events.onStateChange({target:this,data:2});}
        setVolume(value){window.__ytCalls.push(['volume',value]);}
        unMute(){window.__ytCalls.push(['unmute']);}
        getCurrentTime(){return 42;}
        destroy(){this.iframe.remove();window.__ytCalls.push(['destroy']);}
      }};window.onYouTubeIframeAPIReady();`});
    if(url.startsWith('https://www.youtube.com/embed/'))return route.fulfill({contentType:'text/html',body:'<html style="background:#151515;color:white;font:14px sans-serif"><body>Video player test fixture</body></html>'});
    return route.abort();
  });
  await page.goto('http://127.0.0.1:4176/',{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).waitFor();
  assert.equal(await page.locator('.music-video-mount iframe').count(),0,'No YouTube loaded before user interaction');
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).click();
  await page.locator('.music-video-mount iframe').waitFor();
  if(real){
    await page.waitForFunction(()=>!document.querySelector('.music-loading-icon'),{},{timeout:30000});
    await page.waitForFunction(()=>/Tocando agora|Uma pausa|Não foi possível/.test(document.querySelector('.music-player-status').innerText),{},{timeout:35000}).catch(()=>{});
    const play=page.getByRole('button',{name:'Reproduzir m\u00fasica',exact:true});
    if(await play.count()){await play.click();await page.waitForFunction(()=>/Tocando agora|Não foi possível/.test(document.querySelector('.music-player-status').innerText),{},{timeout:25000}).catch(()=>{});}
    await page.waitForTimeout(2500);
    const result=await page.evaluate(()=>({status:document.querySelector('.music-player-status').innerText,iframe:document.querySelector('.music-video-mount iframe').src}));
    result.frames=[];
    for(const frame of page.frames().filter(frame=>frame.url().includes('youtube.com/embed/'))){try{result.frames.push({text:(await frame.locator('body').innerText()).slice(0,1800),videos:await frame.locator('video').evaluateAll(videos=>videos.map(video=>({paused:video.paused,muted:video.muted,volume:video.volume,currentTime:video.currentTime,readyState:video.readyState,error:video.error?.message})))});}catch{}}
    await page.screenshot({path:'tmp/music-player-qa/screenshots/real-light.png'});
    console.log(JSON.stringify({realPlayback:result,runtimeErrors:errors}));
    await browser.close();return;
  }
  await page.getByRole('button',{name:'Pausar m\u00fasica',exact:true}).waitFor();
  assert.match(await page.locator('.music-video-mount iframe').getAttribute('src'),/start=19/);
  const video=await page.locator('.music-video-mount iframe').boundingBox();assert(video.width>=200 && video.height>=200);
  const volume=page.getByRole('slider',{name:/Volume da m\u00fasica/});
  await volume.focus();await volume.press('End');assert.equal(await volume.inputValue(),'100');
  await volume.press('Home');assert.equal(await volume.inputValue(),'0');
  await volume.press('ArrowRight');assert.equal(await volume.inputValue(),'1');
  assert(await page.evaluate(()=>window.__ytCalls.some(call=>call[0]==='volume' && call[1]===100)));
  await page.getByRole('button',{name:'Pausar m\u00fasica',exact:true}).click();
  await page.getByRole('button',{name:'Reproduzir m\u00fasica',exact:true}).click();
  await page.locator('.music-video-mount iframe').evaluate(element=>element.dataset.persistent='yes');
  await page.getByRole('link',{name:'Sobre',exact:true}).first().click();
  assert.equal(await page.locator('.music-video-mount iframe').getAttribute('data-persistent'),'yes');
  assert.equal(await page.evaluate(()=>window.__ytPlayers.length),1);
  await page.getByRole('button',{name:'Alternar tema'}).click();await page.waitForTimeout(700);
  assert.equal(await page.locator('.sketch-music-player').evaluate(element=>getComputedStyle(element).getPropertyValue('--mp-paper').trim()),'#242426');
  await page.screenshot({path:'tmp/music-player-qa/screenshots/dark.png'});
  await page.getByRole('button',{name:'Recolher e pausar m\u00fasica'}).click();
  assert.equal(await page.locator('.music-video-mount iframe').count(),0);
  assert.equal(await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).evaluate(element=>document.activeElement===element),true);
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).click();
  await page.getByRole('button',{name:'Pausar m\u00fasica',exact:true}).waitFor();
  assert.match(await page.locator('.music-video-mount iframe').getAttribute('src'),/start=42/);
  assert(await page.evaluate(()=>window.__ytCalls.some(call=>call[0]==='destroy')));
  await page.evaluate(()=>window.__ytPlayers.at(-1).events.onError({target:window.__ytPlayers.at(-1),data:101}));
  await page.getByRole('button',{name:'Tentar carregar m\u00fasica novamente'}).click();
  await page.getByRole('button',{name:'Pausar m\u00fasica',exact:true}).waitFor();
  await page.evaluate(()=>window.__ytPlayers.at(-1).events.onAutoplayBlocked());
  await page.getByRole('button',{name:'Reproduzir m\u00fasica',exact:true}).waitFor();
  await page.setViewportSize({width:320,height:740});await page.waitForTimeout(300);
  const box=await page.locator('.sketch-music-player').boundingBox();
  assert(box.x>=0 && box.x+box.width<=320 && box.y>=0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const mobileVideo=await page.locator('.music-video-mount iframe').boundingBox();assert(mobileVideo.width>=200 && mobileVideo.height>=200);
  await page.screenshot({path:'tmp/music-player-qa/screenshots/mobile.png'});
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({userInitiated:true,playPause:true,volumeKeyboard:true,persistentAcrossRoutes:true,closePausesAndRemovesVideo:true,resumesPosition:true,errorRetry:true,autoplayFallback:true,darkMode:true,mobile320:true,runtimeErrors:errors}));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
