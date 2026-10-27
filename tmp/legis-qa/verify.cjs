const {chromium}=require('../playhub-qa/node_modules/playwright-core');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
  fs.mkdirSync('tmp/legis-qa/screenshots',{recursive:true});
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4176/projects/oryon-legis',{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);
  await page.locator('.ol-hero img').evaluate(img=>img.decode());
  await page.screenshot({path:'tmp/legis-qa/screenshots/desktop-light.png'});
  const moments=page.locator('.ol-session-nav > button');assert.equal(await moments.count(),5);
  for(let i=0;i<5;i++){await moments.nth(i).click();assert.equal(await moments.nth(i).getAttribute('aria-pressed'),'true');await page.locator('.ol-session-visual img').evaluate(img=>img.decode());}
  await page.locator('.ol-session-visual .ol-tablet').click();assert(await page.locator('dialog').isVisible());assert(await page.locator('.ph-screen-original').getAttribute('href'));await page.keyboard.press('Escape');
  await moments.nth(2).click();await page.locator('.ol-explorer').screenshot({path:'tmp/legis-qa/screenshots/explorer-desktop.png'});
  const timer=page.getByRole('timer'),seconds=async()=>{const parts=(await timer.textContent()).split(':').map(Number);return parts[0]*60+parts[1];};
  assert.equal(await seconds(),180);
  await page.getByRole('button',{name:'Iniciar cronômetro',exact:true}).click();await page.waitForTimeout(1300);await page.getByRole('button',{name:'Pausar cronômetro'}).click();
  const paused=await seconds();assert(paused<180&&paused>=175);await page.waitForTimeout(500);assert.equal(await seconds(),paused);
  await page.getByRole('button',{name:'Adicionar um minuto'}).click();assert.equal(await seconds(),paused+60);
  await page.locator('.ol-time').screenshot({path:'tmp/legis-qa/screenshots/timer-desktop.png'});
  await page.getByRole('button',{name:'Reiniciar cronômetro'}).click();assert.equal(await seconds(),180);
  await page.getByRole('button',{name:'Adicionar um minuto'}).click();assert.equal(await seconds(),240);
  await page.getByRole('button',{name:'Iniciar cronômetro',exact:true}).click();await page.waitForTimeout(500);await page.getByRole('button',{name:'Adicionar um minuto'}).click();assert(await seconds()>295);await page.getByRole('button',{name:'Reiniciar cronômetro'}).click();assert.equal(await seconds(),180);await page.waitForTimeout(400);assert.equal(await seconds(),180);
  await page.getByRole('button',{name:'Alternar tema'}).click();await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'tmp/legis-qa/screenshots/desktop-dark.png'});
  for(const width of [390,320]){await page.setViewportSize({width,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`tmp/legis-qa/screenshots/mobile-dark-${width}.png`});await page.locator('.ol-time').screenshot({path:`tmp/legis-qa/screenshots/timer-mobile-${width}.png`});}
  await page.getByRole('button',{name:'Alternar tema'}).click();await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'tmp/legis-qa/screenshots/mobile-light.png'});
  await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:4176/projects',{waitUntil:'networkidle'});await page.locator('a[href="/projects/oryon-legis"]').click();await page.locator('.ol-hero').waitFor();
  await page.locator('.ph-case-footer a[href="/projects/oryon"]').click();await page.locator('.oy-hero').waitFor();await page.locator('.ph-case-footer a[href="/projects/oryon-legis"]').click();await page.locator('.ol-hero').waitFor();
  assert.deepEqual(errors,[]);console.log(JSON.stringify({moments:5,timerStartPauseReset:true,addMinutePausedAndRunning:true,dialogs:true,originalImageLink:true,darkLight:true,mobile:[320,390],horizontalOverflow:false,routing:true,linkedCases:true,runtimeErrors:errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
