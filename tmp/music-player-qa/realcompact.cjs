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
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).click();
  await page.waitForFunction(()=>document.querySelector('.music-play-button') && !document.querySelector('.music-play-button').disabled,{},{timeout:30000});
  await page.waitForTimeout(2000);
  const play=page.getByRole('button',{name:'Reproduzir m\u00fasica',exact:true});if(await play.count())await play.click();
  await page.waitForFunction(()=>document.querySelector('.sketch-music-player').classList.contains('is-playing'),{},{timeout:25000});
  await page.waitForTimeout(2000);
  const frame=page.frames().find(frame=>frame.url().includes('youtube.com/embed/'));
  const before=await frame.locator('video').evaluate(video=>video.currentTime);
  await page.getByRole('button',{name:'Recolher player',exact:true}).click();
  await page.waitForTimeout(2000);
  const after=await frame.locator('video').evaluate(video=>({time:video.currentTime,paused:video.paused}));
  assert(!after.paused && after.time>before+.5);
  assert.equal(await page.locator('.music-player-panel').count(),0);
  console.log(JSON.stringify({actualYouTubePlayback:true,collapsedStillPlaying:true,timeBefore:before,timeAfter:after.time,runtimeErrors:errors}));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
