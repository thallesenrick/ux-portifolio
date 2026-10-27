const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{
  fs.mkdirSync('tmp/playhub-qa/screenshots',{recursive:true});
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await context.route('**/*',route=>{const url=new URL(route.request().url());return url.hostname==='127.0.0.1' || url.protocol==='data:' ? route.continue() : route.abort();});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4176/projects/playhub',{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);assert(await page.title().then(t=>t.includes('Playhub')));
  await page.screenshot({path:'tmp/playhub-qa/screenshots/desktop-light.png'});
  const tabs=page.getByRole('tab');assert.equal(await tabs.count(),5);
  for(let i=0;i<5;i++){await tabs.nth(i).click();await page.getByRole('tabpanel').locator('img').evaluate(img=>img.decode());assert.equal(await tabs.nth(i).getAttribute('aria-selected'),'true');}
  await tabs.first().focus();await page.keyboard.press('End');assert.equal(await tabs.last().getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');assert.equal(await tabs.first().getAttribute('aria-selected'),'true');
  await page.locator('.ph-hero .ph-phone').first().click();assert(await page.locator('dialog').isVisible());await page.keyboard.press('Escape');assert(!(await page.locator('dialog').isVisible()));
  const flow=page.locator('.ph-flow-chart > button');assert.equal(await flow.count(),5);
  for(let i=0;i<5;i++){await flow.nth(i).click();assert.equal(await flow.nth(i).getAttribute('aria-pressed'),'true');await page.locator('.ph-journey-visual img').evaluate(img=>img.decode());}
  await page.locator('.ph-journey').screenshot({path:'tmp/playhub-qa/screenshots/journey-desktop.png'});
  await page.getByRole('button',{name:'Alternar tema'}).click();await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'tmp/playhub-qa/screenshots/desktop-dark.png'});
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'tmp/playhub-qa/screenshots/mobile-dark.png'});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile overflow');
  await page.locator('.ph-journey').screenshot({path:'tmp/playhub-qa/screenshots/journey-mobile.png'});
  await page.getByRole('button',{name:'Alternar tema'}).click();await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'tmp/playhub-qa/screenshots/mobile-light.png'});
  await page.goto('http://127.0.0.1:4176/projects',{waitUntil:'networkidle'});await page.locator('a[href="/projects/playhub"]').click();assert(page.url().endsWith('/projects/playhub'));
  assert.deepEqual(errors,[]);
  await page.locator('.ph-hero img').first().waitFor({state:'visible'});await page.locator('.ph-hero img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  const sizes=await page.locator('.ph-hero img').evaluateAll(images=>images.map(img=>({width:img.naturalWidth,height:img.naturalHeight})));
  assert.equal(sizes.length,3);sizes.forEach(size=>assert(Math.abs(size.width/size.height-393/852)<.01));
  const animated=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const dynamic=await animated.newPage();dynamic.on('pageerror',e=>errors.push(e.message));await dynamic.goto('http://127.0.0.1:4176/projects/playhub',{waitUntil:'networkidle'});await dynamic.locator('.ph-journey').scrollIntoViewIfNeeded();await dynamic.mouse.move(0,0);await dynamic.waitForFunction(()=>document.querySelectorAll('.ph-flow-chart > button')[1].getAttribute('aria-pressed')==='true',{},{timeout:12000});
  assert.deepEqual(errors,[]);console.log(JSON.stringify({tabs:5,flowSteps:5,keyboard:true,dialog:true,routing:true,autoplay:true,mobileOverflow:false,runtimeErrors:errors,sizes}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
