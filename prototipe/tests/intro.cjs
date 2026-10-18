const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const url=pathToFileURL(path.resolve(__dirname,'../index.html')).href;
  await page.goto(url);
  assert.equal(await page.locator('.intro').count(),1);
  await page.getByRole('link',{name:'Kenali Tandur'}).click();
  await page.waitForFunction(()=>location.hash==='#/beranda');
  assert.equal(await page.locator('.intro').count(),0);
  await page.goto(url+'#/intro');
  await page.getByRole('link',{name:'Lewati intro'}).click();
  await page.waitForFunction(()=>location.hash==='#/beranda');
  await page.goto(url+'#/petugas/beranda');
  assert.equal(await page.locator('.intro').count(),0);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(url+'#/intro');
  assert.equal(await page.locator('.intro-copy').evaluate(el=>getComputedStyle(el).animationName),'none');
  for(const width of [1440,1280,390]){
   await page.setViewportSize({width,height:900});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), 'Overflow '+width);
  }
  console.log('PASS: intro default, CTA, skip, direct routes, reduced motion, desktop and small screen overflow.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
