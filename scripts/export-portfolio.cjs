const {chromium}=require(process.env.PLAYWRIGHT_MODULE || '../tmp/playhub-qa/node_modules/playwright-core');
const fs=require('node:fs');
(async()=>{
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto((process.env.PORTFOLIO_ORIGIN || 'http://127.0.0.1:4176')+'/portfolio?print=1',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.locator('.editorial-sheet img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
fs.mkdirSync('public/portfolio',{recursive:true});fs.mkdirSync('output/pdf',{recursive:true});fs.mkdirSync('tmp/portfolio-qa',{recursive:true});
await page.emulateMedia({media:'print'});
await page.pdf({path:'public/portfolio/thalles-enrick-portfolio.pdf',printBackground:true,preferCSSPageSize:true,tagged:true});
fs.copyFileSync('public/portfolio/thalles-enrick-portfolio.pdf','output/pdf/thalles-enrick-portfolio.pdf');
await page.locator('.editorial-sheet').first().screenshot({path:'public/portfolio/cover.png'});
for(const index of [1,2,8,9])await page.locator('.editorial-sheet').nth(index).screenshot({path:`tmp/portfolio-qa/page-${index+1}.png`});
const overflow=await page.locator('.editorial-sheet-content > div').evaluateAll(nodes=>nodes.map((n,i)=>({page:i+1,height:n.clientHeight,scroll:n.scrollHeight})).filter(n=>n.scroll>n.height+2));
console.log(JSON.stringify({pages:await page.locator('.editorial-sheet').count(),errors,overflow}));
await browser.close();if(errors.length||overflow.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
