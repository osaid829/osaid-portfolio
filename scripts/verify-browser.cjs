const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright' : 'playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
fs.mkdirSync('qa',{recursive:true});
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','3100','-H','127.0.0.1'],{stdio:['ignore','pipe','pipe']});
server.stdout.on('data',d=>process.stdout.write(d));server.stderr.on('data',d=>process.stderr.write(d));
let browser;
try{
 for(let i=0;i<80;i++){try{if((await fetch('http://127.0.0.1:3100')).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const results=[];
 for(const width of [375,768,1440]){
  await page.setViewportSize({width,height:width===1440?1000:900});
  await page.goto('http://127.0.0.1:3100',{waitUntil:'networkidle'});
   await page.locator('[data-renderer]').waitFor({timeout:20000});
  const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert.ok(overflow.scroll<=width,`Overflow at ${width}: ${JSON.stringify(overflow)}`);
  await page.screenshot({path:`qa/viewport-${width}.png`});
  await page.screenshot({path:`qa/full-${width}.png`,fullPage:true});
   await page.getByRole('button',{name:'Network',exact:true}).click();
   assert.equal(await page.locator('.core-stage').getAttribute('data-mode'),'network');
   const pause=page.getByRole('button',{name:'Pause idle rotation',exact:true});
   if(await pause.count() && !(await pause.isDisabled())) {
    await pause.click();
    assert.equal(await page.getByRole('button',{name:'Resume idle rotation',exact:true}).getAttribute('aria-pressed'),'true');
   }
   const view2d=page.getByRole('button',{name:'Switch to 2D study',exact:true});
   if(await view2d.count()) {
    await view2d.click();
    assert.equal(await page.locator('.core-stage').getAttribute('data-renderer'),'static');
    await page.getByRole('button',{name:'Switch to 3D study',exact:true}).click();
    await page.locator('[data-renderer="webgl"]').waitFor();
   }
  const missing=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
  assert.equal(missing.length,0);
   results.push({width,overflow:false,webgl:await page.locator('[data-renderer="webgl"]').count()>0,modes:true,pause:await pause.count()>0,staticToggle:await view2d.count()>0,images:true});
 }
 await page.goto('http://127.0.0.1:3100');await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Skip to content');
 await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>location.hash),'#main');
 const links=await page.locator('a[target="_blank"]').evaluateAll(els=>els.map(e=>({href:e.href,rel:e.rel})));
 assert.ok(links.every(x=>x.rel.includes('noopener')&&x.rel.includes('noreferrer')));
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});
  const reducedPause=page.getByRole('button',{name:'Pause idle rotation'});
  if(await reducedPause.count()) assert.equal(await reducedPause.isDisabled(),true);
 assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 await page.screenshot({path:'qa/reduced-motion.png'});
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});
 const staticPage=await nojs.newPage();await staticPage.goto('http://127.0.0.1:3100');
 assert.ok(await staticPage.getByRole('heading',{level:1}).isVisible());
  assert.equal(await staticPage.locator('.project-accordion-item').count(),3);
 await staticPage.screenshot({path:'qa/no-js.png'});
 const code=(await page.goto('http://127.0.0.1:3100/does-not-exist')).status();assert.equal(code,404);
 assert.deepEqual(errors,[]);
 fs.writeFileSync('qa/results.json',JSON.stringify({results,keyboard:true,reducedMotion:true,noJavaScript:true,notFound:true,errors,links},null,2));
 console.log('BROWSER CHECKS PASSED',JSON.stringify(results));
}finally{if(browser)await browser.close();server.kill('SIGTERM');}
})().catch(e=>{console.error(e);process.exitCode=1;});
