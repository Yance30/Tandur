const {chromium}=require('playwright');
const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url='file:///'+path.resolve(__dirname,'../index.html').replaceAll('\\','/');
  await page.goto(url);await page.evaluate(()=>{muatState();wf().petani.persetujuan=true;wf().hasil=snapshotDraf();});
  const routes=await page.evaluate(()=>Object.keys(ROUTES));const findings=[];
  for(const width of [1366,1280]) {
   await page.setViewportSize({width,height:768});
   for(const route of routes) {
    await page.goto(url+'#'+route);await page.waitForTimeout(30);
    await page.waitForFunction(()=>[...document.images].every(img=>img.complete));
    const f=await page.evaluate(()=>({
      overflow:document.documentElement.scrollWidth>innerWidth+2,
      broken:[...document.querySelectorAll('a[href^="#/"]')].filter(a=>!ROUTES[a.hash.slice(1)]).map(a=>({text:a.textContent.trim(),href:a.hash})),
      images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
      spill:[...document.querySelectorAll('.card,.pcard,.stat-lg,.num,table')].filter(el=>el.scrollWidth>el.clientWidth+4).map(el=>el.textContent.slice(0,80)),
      noLabel:[...document.querySelectorAll('input:not([type=hidden]),textarea,select')].filter(el=>!el.labels?.length&&!el.getAttribute('aria-label')&&!el.getAttribute('aria-labelledby')).map(el=>el.id||el.outerHTML.slice(0,80))
    }));
    if(f.overflow||f.broken.length||f.images.length||f.spill.length||f.noLabel.length)findings.push({width,route,...f});
   }
  }
  fs.mkdirSync(path.resolve(__dirname,'../../tmp'),{recursive:true});
  await page.setViewportSize({width:1366,height:768});
  await page.goto(url+'#/admin/undang');await page.screenshot({path:path.resolve(__dirname,'../../tmp/audit-undang.png'),fullPage:true});
  await page.goto(url+'#/masuk/atur-ulang');
  const toggle=page.locator('[data-toggle-password]').first();
  await toggle.click();
  if(await toggle.evaluate(el=>el.parentElement.querySelector('input').type)!=='text') errors.push('Password toggle did not reveal text');
  await toggle.click();
  if(await toggle.evaluate(el=>el.parentElement.querySelector('input').type)!=='password') errors.push('Password toggle did not mask text');
  const graph=await page.evaluate(()=>{
    const box=document.createElement('div');box.innerHTML=larik([{nama:'Uji',nilai:'80',ambang:'100',rasio:.8,st:'gagal'}]);
    return parseFloat(box.querySelector('.bar').style.height);
  });
  if(Math.abs(graph-35.2)>.001) errors.push('Failed graph value not proportional');
  await page.goto(url+'#/petugas/akad');await page.setViewportSize({width:794,height:1123});await page.emulateMedia({media:'print'});
  if(await page.locator('.docbar').isVisible()) errors.push('Print toolbar still visible');
  await page.screenshot({path:path.resolve(__dirname,'../../tmp/audit-print.png'),fullPage:true});
  await page.emulateMedia({media:'screen'});await page.setViewportSize({width:1366,height:768});await page.goto(url+'#/beranda');
  const contrast=await page.locator('.pcta .plarik').evaluate(el=>{
    const luminance=color=>color.match(/[\d.]+/g).slice(0,3).map(Number).map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((a,c,i)=>a+c*[.2126,.7152,.0722][i],0);
    const bg=luminance(getComputedStyle(el).backgroundColor),fg=luminance(getComputedStyle(el.querySelector('.ttl')).color);
    return (Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05);
  });
  if(contrast<4.5)errors.push('Pricing text contrast below 4.5:1');
  await page.locator('.pcta .plarik').screenshot({path:path.resolve(__dirname,'../../tmp/audit-pricing.png')});
  fs.writeFileSync(path.resolve(__dirname,'../../tmp/audit.json'),JSON.stringify({screens:routes.length,errors,findings},null,2));
  console.log(JSON.stringify({screens:routes.length,errors,findings},null,2));
  if(errors.length||findings.length)process.exitCode=1;
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
