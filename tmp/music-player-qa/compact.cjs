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
  const widget=page.locator('.sketch-music-player');
  await widget.waitFor();await page.waitForTimeout(1000);
  console.log(await widget.evaluate(e=>({box:e.getBoundingClientRect().toJSON(),root:e.parentElement.outerHTML.slice(0,250),style:getComputedStyle(e).cssText})));
  await page.screenshot({path:'tmp/music-player-qa/screenshots/diagnostic.png'});
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).click();
  await page.getByRole('button',{name:'Pausar m\u00fasica',exact:true}).waitFor();
  assert.equal(await widget.locator('iframe,img').count(),0);
  await page.locator('.music-audio-backend iframe').evaluate(e=>e.dataset.persistent='yes');
  const pauseCount=await page.evaluate(()=>window.__ytCalls.filter(c=>c[0]==='pause').length);
  await page.getByRole('button',{name:'Recolher player',exact:true}).click();
  assert.equal(await page.locator('.music-player-panel').count(),0);
  assert.equal(await page.evaluate(()=>window.__ytCalls.filter(c=>c[0]==='pause').length),pauseCount);
  assert.equal(await page.locator('.music-audio-backend iframe').getAttribute('data-persistent'),'yes');
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).click();
  await page.mouse.click(30,300);
  assert.equal(await page.locator('.music-player-panel').count(),0);
  assert.equal(await page.evaluate(()=>window.__ytCalls.filter(c=>c[0]==='pause').length),pauseCount);
  const mixer=await page.locator('.sketch-rgb-panel').boundingBox(),box=await widget.boundingBox();
  assert(box.y>=mixer.y+mixer.height+8);assert(Math.abs(box.x+box.width-mixer.x-mixer.width)<7);
  assert.equal(await page.getByText('IDEIA \u2192 RASCUNHO \u2192 EXPERI\u00caNCIA',{exact:true}).count(),0);
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).click();
  const slider=page.getByRole('slider',{name:/Volume da m\u00fasica/});await slider.focus();await slider.press('End');assert.equal(await slider.inputValue(),'100');
  await page.getByRole('button',{name:'Pausar m\u00fasica',exact:true}).click();await page.getByRole('button',{name:'Reproduzir m\u00fasica',exact:true}).click();
  await page.screenshot({path:'tmp/music-player-qa/screenshots/compact-light.png'});
  await page.getByRole('link',{name:'Sobre',exact:true}).first().click();
  assert.equal(await page.locator('.music-audio-backend iframe').getAttribute('data-persistent'),'yes');
  assert.equal(await page.evaluate(()=>window.__ytPlayers.length),1);
  await page.getByRole('link',{name:'Home',exact:true}).first().click();
  await page.getByRole('button',{name:'Abrir player e ouvir m\u00fasica'}).click();
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(700);await page.locator('#hero-music-anchor > .sketch-music-player').waitFor();await widget.scrollIntoViewIfNeeded();
  const mobile=await widget.boundingBox();assert(mobile.x>=0 && mobile.x+mobile.width<=390);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.getByRole('button',{name:'Alternar tema'}).click();await page.waitForTimeout(500);
  await widget.scrollIntoViewIfNeeded();await page.screenshot({path:'tmp/music-player-qa/screenshots/compact-mobile-dark.png'});
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({hiddenVideo:true,collapseKeepsPlaying:true,outsideClickKeepsPlaying:true,belowMixer:true,persistentAcrossRoutes:true,volumeAndPlayPause:true,mobileDark:true,runtimeErrors:errors}));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
