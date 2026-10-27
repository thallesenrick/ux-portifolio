const {chromium}=require('../playhub-qa/node_modules/playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
  fs.mkdirSync('tmp/oryon-qa/screenshots',{recursive:true});
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4176/projects/oryon',{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);
  await page.locator('.oy-hero img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  await page.screenshot({path:'tmp/oryon-qa/screenshots/desktop-light.png'});
  const modules=page.locator('.oy-modules [role=tab]');
  assert.equal(await modules.count(),5);
  for(let index=0;index<5;index++){
    await modules.nth(index).click();
    assert.equal(await modules.nth(index).getAttribute('aria-selected'),'true');
    await page.locator('.oy-module-panel img').evaluate(img=>img.decode());
  }
  await modules.nth(4).press('Home');assert.equal(await modules.nth(0).getAttribute('aria-selected'),'true');
  await modules.nth(0).press('ArrowLeft');assert.equal(await modules.nth(4).getAttribute('aria-selected'),'true');
  await modules.nth(4).press('End');assert.equal(await modules.nth(4).evaluate(el=>document.activeElement===el),true);
  await modules.nth(0).click();
  assert(await page.locator('.oy-modules .case-desktop-viewport').evaluate(el=>el.scrollHeight>el.clientHeight));
  assert(await page.locator('.oy-modules .case-desktop-viewport').evaluate(el=>Math.abs(el.clientWidth-el.parentElement.clientWidth)<2));
  await page.locator('.oy-modules').screenshot({path:'tmp/oryon-qa/screenshots/erp-desktop.png'});
  await page.locator('.oy-modules .case-desktop-toolbar button').click();
  assert(await page.locator('dialog').isVisible());await page.keyboard.press('Escape');assert(!(await page.locator('dialog').isVisible()));
  const journey=page.locator('.oy-flow-chart > button');
  for(let index=0;index<5;index++){
    await journey.nth(index).click();
    assert.equal(await journey.nth(index).getAttribute('aria-pressed'),'true');
    await page.locator('.oy-journey-visual img').evaluate(img=>img.decode());
  }
  await journey.nth(2).click();
  await page.locator('.oy-journey').screenshot({path:'tmp/oryon-qa/screenshots/journey-desktop.png'});
  const roles=page.locator('.oy-apps [role=tab]');assert.equal(await roles.count(),3);
  for(let role=0;role<3;role++){
    await roles.nth(role).click();
    const features=page.locator('.oy-app-features button');
    for(let feature=0;feature<await features.count();feature++){
      await features.nth(feature).click();
      assert.equal(await features.nth(feature).getAttribute('aria-pressed'),'true');
      await page.locator('.oy-app-stage img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
    }
    await page.locator('.oy-apps').screenshot({path:`tmp/oryon-qa/screenshots/app-${role}-desktop.png`});
  }
  const consultant=page.locator('.oy-scroll-phone-content');
  assert(await consultant.evaluate(el=>el.scrollHeight>el.clientHeight*2));
  await consultant.evaluate(el=>el.scrollTop=300);assert(await consultant.evaluate(el=>el.scrollTop>0));
  await page.locator('.oy-perspectives > a').nth(1).click();assert.equal(await roles.nth(1).getAttribute('aria-selected'),'true');
  await page.locator('.oy-perspectives > a').nth(3).click();assert.equal(await roles.nth(2).getAttribute('aria-selected'),'true');
  await page.locator('.oy-component-link').click();assert(await page.locator('dialog').isVisible());await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Alternar tema'}).click();
  await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'tmp/oryon-qa/screenshots/desktop-dark.png'});
  for(const width of [390,320]){
    await page.setViewportSize({width,height:844});
    await page.evaluate(()=>window.scrollTo(0,0));
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.screenshot({path:`tmp/oryon-qa/screenshots/mobile-dark-${width}.png`});
    await modules.nth(2).click();
    assert(await page.locator('.oy-modules .case-desktop-viewport').evaluate(el=>el.scrollWidth>el.clientWidth));
    await roles.nth(1).click();await page.locator('.oy-apps').screenshot({path:`tmp/oryon-qa/screenshots/apps-mobile-${width}.png`});
    await page.locator('.oy-system').screenshot({path:`tmp/oryon-qa/screenshots/system-mobile-${width}.png`});
  }
  await page.getByRole('button',{name:'Alternar tema'}).click();await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:'tmp/oryon-qa/screenshots/mobile-light.png'});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:4176/projects',{waitUntil:'networkidle'});
  await page.locator('a[href="/projects/oryon"]').click();await page.locator('.oy-hero').waitFor();assert(page.url().endsWith('/projects/oryon'));
  await page.getByRole('button',{name:'Reproduzir jornada'}).click();await page.mouse.move(0,0);
  await page.waitForFunction(()=>document.querySelectorAll('.oy-flow-chart > button')[1].getAttribute('aria-pressed')==='true',{},{timeout:12000});
  await page.getByRole('button',{name:'Pausar jornada'}).click();
  const images=await page.locator('.oy-hero img').evaluateAll(images=>images.map(img=>({src:img.currentSrc,naturalWidth:img.naturalWidth,width:img.width,height:img.height,naturalHeight:img.naturalHeight})));
  for(const img of images){assert(img.naturalWidth>0);assert(Math.abs(img.width/img.height-img.naturalWidth/img.naturalHeight)<.02);}
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({modules:5,appRoles:3,appScreens:7,journeySteps:5,keyboardTabs:true,scrollPreviews:true,roleLinks:true,dialogs:true,darkLight:true,mobileWidths:[320,390],horizontalOverflow:false,routing:true,autoplay:true,runtimeErrors:errors}));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
